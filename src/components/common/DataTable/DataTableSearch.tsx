import React, { useCallback,useState } from 'react';

interface DataTableSearchProps {
  onSearchChange: (query: string) => void;
  placeholder?: string;
  debounceDelay?: number;
}

export const DataTableSearch: React.FC<DataTableSearchProps> = ({
  onSearchChange,
  placeholder = 'Search...',
  debounceDelay = 300,
}) => {
  const [value, setValue] = useState('');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      // Clear previous timeout
      if (timeoutId) clearTimeout(timeoutId);

      // Set new timeout for debounced search
      const id = setTimeout(() => {
        onSearchChange(newValue);
      }, debounceDelay);

      setTimeoutId(id);
    },
    [debounceDelay, onSearchChange, timeoutId]
  );

  const handleClear = useCallback(() => {
    setValue('');
    if (timeoutId) clearTimeout(timeoutId);
    onSearchChange('');
  }, [timeoutId, onSearchChange]);

  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default DataTableSearch;
