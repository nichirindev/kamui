'use client'

import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SliderFieldProps {
  attribute: string;
  label: string;
  min: number;
  max: number;
  step: number;
  currentValue: number;
  hasTopPadding?: boolean;
  disabled?: boolean;
  handleAttributeChange: (attribute: string, value: number) => void;
}

const SliderField: React.FC<SliderFieldProps> = ({
    attribute,
    label,
    min,
    max,
    step,
    currentValue,
    hasTopPadding = true,
    disabled = false,
    handleAttributeChange
  }) => {
    const handleSliderInputFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const value = parseFloat(event.target.value);
      if (Number.isNaN(value)) return;
      handleAttributeChange(attribute, value);
    };

    return (
      <div className={cn('mt-2', hasTopPadding && 'pt-5')}>
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor={attribute}>{label}</Label>
          <Input
            id={`${attribute}-value`}
            type="text"
            value={currentValue}
            onChange={handleSliderInputFieldChange}
            className="h-8 w-16 shrink-0 rounded-lg border-border bg-background px-1 text-center text-xs font-bold tabular shadow-none focus-visible:ring-0"
            disabled={disabled}
          />
        </div>
        <Slider
          id={attribute}
          min={min}
          max={max}
          value={[currentValue]}
          step={step}
          onValueChange={(value) => !disabled && handleAttributeChange(attribute, value[0])}
          className={cn('mt-3', disabled && 'cursor-not-allowed opacity-50')}
          aria-label={label}
          disabled={disabled}
        />
      </div>
    );
};

export default SliderField
