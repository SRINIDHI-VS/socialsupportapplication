import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = true,
}) => {
  const { isRTL } = useApp();

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${isRTL ? 'text-right' : ''}`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <AlertCircle size={14} /> {error}
        </p>
      )}
    </div>
  );
};

export default Input;
