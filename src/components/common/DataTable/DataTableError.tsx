import React from 'react';

interface DataTableErrorProps {
  error?: Error | string;
  onRetry?: () => void;
}

export const DataTableError: React.FC<DataTableErrorProps> = ({
  error,
  onRetry,
}) => {
  const errorMessage = typeof error === 'string' ? error : error?.message || 'An error occurred';

  return (
    <div className="flex flex-col items-center justify-center py-12 bg-red-50 rounded-lg">
      <svg
        className="w-12 h-12 text-red-600 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-red-700 font-medium mb-2">{errorMessage}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default DataTableError;
