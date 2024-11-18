import { FC, ReactNode, Suspense } from 'react';
import { OverlayLoadingSpinner } from '../../shared/components/OverLayLoadingSpinner';

type Props = {
  children: ReactNode;
};

export const SuspenseLoadingSpinner: FC<Props> = ({ children }) => {
  return (
    <Suspense fallback={<OverlayLoadingSpinner isLoading />}>
      {children}
    </Suspense>
  );
};
