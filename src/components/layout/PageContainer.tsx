import clsx from 'clsx';
import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainer = ({ children, className}: PageContainerProps) => {
  return (
    <div
      className={clsx(
        'w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8',
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageContainer;