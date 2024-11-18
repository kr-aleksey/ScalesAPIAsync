import { z } from 'zod';

export const scalesWeightDTO = z.object({
  weight: z.union([z.string(), z.number()]).nullable(),
  status: z.enum(['stable', 'unstable', 'overload']),
});

export type ScalesWeightDTO = z.infer<typeof scalesWeightDTO>;

export const createScalesWeightDTO = z.object({
  weight: z
    .string({ message: 'Неверный тип данных' })
    .min(1, { message: 'Поле не может быть пустым' }),
  status: z.enum(['stable', 'unstable', 'overload'], {
    message: 'Неверное значение',
  }),
});

export type CreateScalesWeightDTO = z.infer<typeof scalesWeightDTO>;

export const scalesInfoDTO = z.object({
  info: z.string(),
});

export type ScalesInfoDTO = z.infer<typeof scalesInfoDTO>;

export const scalesItem = z.object({
  id: z.string(),
  name: z.string(),
});

export type ScalesItem = z.infer<typeof scalesItem>;

export const scalesListDTO = z.array(scalesItem);

export type ScalesListDTO = z.infer<typeof scalesListDTO>;
