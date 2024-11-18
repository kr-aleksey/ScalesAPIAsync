import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useReducer,
} from 'react';

type TToasterContext = {
  errorCode: string;
  message: string;
  disableAutoHide?: boolean;
} | null;

type ToasterAction = {
  type: 'open' | 'close';
  payload?: TToasterContext;
};

const toasterReducer = (
  _: TToasterContext,
  action: ToasterAction,
): TToasterContext => {
  switch (action.type) {
    case 'open':
      return action.payload || null;
    case 'close':
      return null;
    default:
      throw new Error(`Неизвестный action type: ${action.type}`);
  }
};

const ToasterContext = createContext<TToasterContext>(null);

const ToasterDispatchContext = createContext<Dispatch<ToasterAction>>(() => {});

export const useToaster = (): TToasterContext => useContext(ToasterContext);
export const useToasterDispatch = (): Dispatch<ToasterAction> =>
  useContext(ToasterDispatchContext);

export const ToasterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [toaster, dispatch] = useReducer(toasterReducer, null);

  return (
    <ToasterContext.Provider value={toaster}>
      <ToasterDispatchContext.Provider value={dispatch}>
        {children}
      </ToasterDispatchContext.Provider>
    </ToasterContext.Provider>
  );
};
