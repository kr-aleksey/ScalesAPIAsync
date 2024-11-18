import { AxiosError, isAxiosError } from 'axios';
import { FC, ReactNode } from 'react';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useToasterDispatch } from '../contexts/ToasterContext';

type Props = {
  children: ReactNode;
};

export const QueryAppProvider: FC<Props> = ({ children }) => {
  const dispatch = useToasterDispatch();

  const globalHandleError = (error: AxiosError | Error): void => {
    if (isAxiosError(error)) {
      if (isAxiosError(error) && error.code === 'ERR_CANCELED') return;
      if (error.status === 422) return;

      if (error.status === 500 || error.status === 503) {
        dispatch({
          type: 'open',
          payload: {
            errorCode: error.status.toString(),
            message:
              typeof error.response?.data.detail === 'string'
                ? error.response.data.detail
                : 'Ошибка сервера',
          },
        });

        return;
      }

      if (error.status === 404) {
        dispatch({
          type: 'open',
          payload: {
            errorCode: error.status.toString(),
            message:
              typeof error.response?.data.detail === 'string'
                ? error.response.data.detail
                : 'Данные не найдены',
          },
        });

        return;
      }

      if (error.code === 'ERR_NETWORK') {
        dispatch({
          type: 'open',
          payload: {
            errorCode: error.code,
            message: 'Проблемы с подключением к сети',
          },
        });

        return;
      }
    }

    if (error instanceof Error && error.message) {
      dispatch({
        type: 'open',
        payload: {
          errorCode: '',
          message: error.message || 'Обнаружена неизвестная ошибка',
        },
      });

      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: globalHandleError,
    }),
    mutationCache: new MutationCache({
      onError: globalHandleError,
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
