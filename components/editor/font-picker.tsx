'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { ALL_FONTS } from '@/constants/fonts';

interface FontFamilyPickerProps {
  attribute: string;
  currentFont: string;
  handleAttributeChange: (attribute: string, value: string) => void;
}

const FontFamilyPicker: React.FC<FontFamilyPickerProps> = ({
  attribute,
  currentFont,
  handleAttributeChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={attribute}>Font</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={attribute}
            variant="outline"
            role="combobox"
            size="sm"
            className={cn(
              'h-11 w-full justify-between normal-case tracking-normal sm:h-9',
              !currentFont && 'text-muted-foreground'
            )}
          >
            <span className="truncate text-xs font-bold" style={{ fontFamily: currentFont }}>
              {currentFont || 'Pick a typeface'}
            </span>
            <CaretSortIcon className="ml-2 h-3.5 w-3.5 shrink-0 opacity-60" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[280px] overflow-hidden p-0" align="start">
          <Command>
            <CommandInput placeholder="Search fonts..." />
            <CommandList>
              <CommandEmpty>No font found.</CommandEmpty>
              <CommandGroup heading="Fonts">
                {ALL_FONTS.map((font) => (
                  <CommandItem
                    value={font}
                    key={font}
                    onSelect={() => handleAttributeChange(attribute, font)}
                    className="cursor-pointer"
                    style={{ fontFamily: font }}
                  >
                    {font}
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        font === currentFont ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FontFamilyPicker;
