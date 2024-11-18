import { lazy, ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PageNotFound } from './PageNotFound';
import { SuspenseLoadingSpinner } from './SuspenseLoadingSpinner';
import { ErrorBoundary } from '../ErrorBoundary';
import { ROUTE_PARAM } from '../../shared/constants';

const ScalesData = lazy(() =>
  import('../../Scales').then((module) => ({
    default: module.Scales,
  })),
);

const router = createBrowserRouter([
  {
    path: `/:${ROUTE_PARAM.SCALES_ID}?`,
    element: (
      <SuspenseLoadingSpinner>
        <ScalesData />
      </SuspenseLoadingSpinner>
    ),
    errorElement: <ErrorBoundary />,
  },

  {
    path: '*',
    element: <PageNotFound />,
  },
]);

export const AppRoutes = (): ReactNode => {
  return <RouterProvider router={router} />;
};
