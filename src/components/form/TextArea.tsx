import React from 'react';
import { AlertCircle, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onHelp: (field: string) => void;
  error?: string;
  required?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  value,
  onChange,
  onHelp,
  error,
  required = true,
}) => {
  const { t, isRTL } = useApp();

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <button
          type="button"
          onClick={() => onHelp(name)}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-[#021936] text-white rounded-lg hover:bg-[#03204a]"
        >
          <Sparkles size={14} />
          {t.helpWrite}
        </button>
      </div>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
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

export default TextArea;
