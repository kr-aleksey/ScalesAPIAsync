from decimal import Decimal
from enum import IntEnum

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel, field_validator
from scales_driver_async.drivers import ScalesDriver

from config import settings
from decorators import driver_handler

scales: dict[str, ScalesDriver] = settings.scales


class ScalesStatus(IntEnum):
    stable = ScalesDriver.STATUS_STABLE
    unstable = ScalesDriver.STATUS_UNSTABLE
    overload = ScalesDriver.STATUS_OVERLOAD

    @classmethod
    def names(cls) -> list[str]:
        return [i.name for i in cls]


class ScaleModel(BaseModel):
    id: str
    name: str


class InfoModel(BaseModel):
    info: str


class WeightModel(BaseModel):
    weight: Decimal = Decimal('0')
    status: str = 'unknown'

    @field_validator('status')
    @classmethod
    def status_validate(cls, value):
        if value not in ScalesStatus.names():
            raise ValueError(f'Status must be one of {ScalesStatus.names()}.')
        return value


class ErrMessage(BaseModel):
    detail: str


err_responses = {
    404: {
        'model': ErrMessage, 'description': 'Not found'
    },
    500: {
        'model': ErrMessage,
        'description': 'Internal Server Error.'
    },
    503: {
        'model': ErrMessage,
        'description': 'No response from device or device error'
    },
}

app = FastAPI(title='ScalesAPIAsync',
              debug=settings.DEBUG,
              docs_url='/api/docs',
              redoc_url='/api/redoc',
              redirect_slashes=True)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/api/scales')
async def get_scales_list() -> list[ScaleModel]:
    return [ScaleModel(id=s_id, name=s.name) for s_id, s in scales.items()]


@app.get(
    '/api/scales/{scale_id}/weight',
    responses=err_responses
)
@driver_handler
async def get_weight(scale_id: str) -> WeightModel:
    weight, status = await (scales[scale_id]
                            .get_weight(ScalesDriver.UNIT_KG))
    return WeightModel(weight=str(weight),
                       status=ScalesStatus(status).name)


@app.post('/api/scales/{scale_id}/weight',
          responses=err_responses)
@driver_handler
async def set_weight(scale_id: str, readings: WeightModel) -> WeightModel:
    await scales[scale_id].set_weight(readings.weight,
                                      ScalesDriver.UNIT_KG,
                                      ScalesStatus[readings.status].value)
    weight, status = await (scales[scale_id].get_weight(ScalesDriver.UNIT_KG))
    return WeightModel(weight=weight, status=ScalesStatus(status).name)


@app.get(
    '/api/scales/{scale_id}/info',
    responses=err_responses
)
@driver_handler
async def get_info(scale_id: str) -> InfoModel:
    return InfoModel(info=await scales[scale_id].get_info())
