import { FC } from 'react';
import { CssBaseline } from '@mui/material';
import { AppTheme } from './theme/AppTheme';
import { AppRoutes } from './AppRoutes/AppRoutes';
import { QueryAppProvider } from './QueryAppProvider';
import { ToasterProvider } from '../contexts/ToasterContext';
import { Toaster } from './Toaster';

export const App: FC = () => {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ToasterProvider>
        <QueryAppProvider>
          <AppRoutes />
          <Toaster />
        </QueryAppProvider>
      </ToasterProvider>
    </AppTheme>
  );
};
