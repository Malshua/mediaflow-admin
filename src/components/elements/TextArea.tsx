import React, { TextareaHTMLAttributes } from 'react';
import TooltipExtra from './TooltipExtra';
import { getErrorMessage } from '@/utilities/helpers';

interface TextAreaTypes extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  max?: any;
  error?: any;
  className?: string;
  required?: boolean;
  labelClassName?: string;
  tooltip?: string;
}

const TextArea = React.forwardRef(function TextArea(
  {
    label,
    placeholder,
    disabled,
    max,
    error,
    className,
    required,
    labelClassName,
    tooltip,
    ...props
  }: TextAreaTypes,
  ref: React.LegacyRef<HTMLTextAreaElement> | undefined
) {
  return (
    <div>
      {label && (
        <div className="mb-1.5 flex items-center">
          {label && (
            <div className="flex items-center gap-0.5 text-sm">
              <label
                className={`${labelClassName || 'text-[#2D3748]'} text-left`}
              >
                {label}
              </label>

              {required && <span className="text-red-500">*</span>}
            </div>
          )}
          {tooltip && (
            <TooltipExtra
              content={
                <div className="w-52 py-2 text-xs leading-5">{tooltip}</div>
              }
            />
          )}
        </div>
      )}

      <textarea
        className={`all__trans w-full rounded-md border px-4 py-2.5 text-sm focus:outline-0 ${
          disabled ? 'bg-gray-200' : 'bg-transparent'
        } ${error ? 'border-red-500' : 'border-gray-300 focus:border-primary-default'} ${className || 'h-32'}`}
        ref={ref}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
      />

      {error && (
        <div className="ml-1 mt-2 text-sm text-red-500">
          {getErrorMessage(error)}
        </div>
      )}
    </div>
  );
});

export default TextArea;
