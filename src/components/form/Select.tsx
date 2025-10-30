import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  error?: string;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required = true,
}) => {
  const { isRTL } = useApp();

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${isRTL ? 'text-right' : ''}`}
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <AlertCircle size={14} /> {error}
        </p>
      )}
    </div>
  );
};

export default Select;
