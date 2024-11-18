import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { OmitTyped } from '../../shared/types';
import { createRequest } from '../createRequest';
import {
  CreateScalesWeightDTO,
  scalesInfoDTO,
  ScalesInfoDTO,
  scalesListDTO,
  ScalesListDTO,
  scalesWeightDTO,
  ScalesWeightDTO,
} from './types';

type UseScalesWeightOptions = OmitTyped<
  UseQueryOptions<ScalesWeightDTO, unknown, ScalesWeightDTO, string[]>,
  'queryKey' | 'queryFn'
>;

export const scalesWeightQueryKey = {
  root: ['scalesWeight'],
  params: (scalesId: string) => [...scalesWeightQueryKey.root, scalesId],
};

export const useScalesWeight = (
  params: { scalesId: string },
  options?: UseScalesWeightOptions,
): UseQueryResult<ScalesWeightDTO, unknown> =>
  useQuery({
    queryKey: scalesWeightQueryKey.params(params.scalesId),
    queryFn: ({ signal }) =>
      createRequest({
        options: {
          url: `/scales/${params.scalesId}/weight/`,
          method: 'GET',
          signal,
        },
        schema: scalesWeightDTO,
      }),

    ...options,
  });

type UseScalesInfoOptions = OmitTyped<
  UseQueryOptions<ScalesInfoDTO, unknown, ScalesInfoDTO, string[]>,
  'queryKey' | 'queryFn'
>;

export const scalesInfoQueryKey = {
  root: ['scalesInfo'],
  params: (scalesId: string) => [...scalesInfoQueryKey.root, scalesId],
};

export const useScalesInfo = (
  params: { scalesId: string },
  options?: UseScalesInfoOptions,
): UseQueryResult<ScalesInfoDTO, unknown> =>
  useQuery({
    queryKey: scalesInfoQueryKey.params(params.scalesId),
    queryFn: ({ signal }) =>
      createRequest({
        options: {
          url: `/scales/${params.scalesId}/info/`,
          method: 'GET',
          signal,
        },
        schema: scalesInfoDTO,
      }),

    ...options,
  });

type UseScalesListOptions = OmitTyped<
  UseQueryOptions<ScalesListDTO, unknown, ScalesListDTO, string[]>,
  'queryKey' | 'queryFn'
>;

export const scalesListQueryKey = {
  root: ['scalesList'],
};

export const useScalesList = (
  options?: UseScalesListOptions,
): UseQueryResult<ScalesListDTO, unknown> =>
  useQuery({
    queryKey: scalesListQueryKey.root,
    queryFn: () =>
      createRequest({
        options: {
          url: '/scales/',
          method: 'GET',
        },
        schema: scalesListDTO,
      }),

    ...options,
  });

type UseCreateWeightOptions = OmitTyped<
  UseMutationOptions<CreateScalesWeightDTO, unknown, CreateScalesWeightDTO>,
  'mutationFn'
>;

export const useCreateWeight = (
  params: { scalesId: string },
  options?: UseCreateWeightOptions,
): UseMutationResult<
  ScalesWeightDTO,
  unknown,
  CreateScalesWeightDTO,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      createRequest({
        options: {
          url: `/scales/${params.scalesId}/weight/`,
          method: 'POST',
          data,
        },
      }),
    ...options,
    onSuccess: (responseData, ...restParams) => {
      queryClient.invalidateQueries({
        queryKey: scalesWeightQueryKey.root,
      });

      options?.onSuccess?.(responseData, ...restParams);
    },
  });
};
