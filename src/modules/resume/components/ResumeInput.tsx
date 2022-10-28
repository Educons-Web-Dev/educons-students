import React, { ChangeEvent } from 'react';

interface IResumeInputProps {
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ResumeInput = ({ value, onChange, disabled = false, placeholder = '' }: IResumeInputProps) => {
  return (
    <input
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      className="bg-[#eff2f9] w-[300px] py-2 px-4 rounded-sm border-b-2 border-transparent focus:border-blue-500 transition-colors"
    />
  );
};
