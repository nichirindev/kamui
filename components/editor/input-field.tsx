'use client'

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface InputFieldProps {
  attribute: string;
  label: string;
  currentValue: string;
  handleAttributeChange: (attribute: string, value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  attribute,
  label,
  currentValue,
  handleAttributeChange
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    handleAttributeChange(attribute, value);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={attribute}>{label}</Label>
      <Input
        id={attribute}
        type="text"
        placeholder="type something loud"
        value={currentValue}
        onChange={handleInputChange}
        className="h-12 text-base font-bold tracking-tight"
      />
    </div>
  );
};

export default InputField;
