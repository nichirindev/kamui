'use client'

import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ChromePicker } from 'react-color';
import { Check } from 'lucide-react';
import { colors } from '@/constants/colors';

interface ColorPickerProps {
  attribute: string;
  label: string;
  currentColor: string;
  handleAttributeChange: (attribute: string, value: any) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  attribute,
  label,
  currentColor,
  handleAttributeChange,
}) => {
  const isHex = currentColor?.startsWith?.('#');

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={attribute}>{label}</Label>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            id={attribute}
            variant="outline"
            size="sm"
            className="h-11 w-fit justify-start gap-2 px-2.5 normal-case tracking-normal sm:h-9"
          >
            <span
              style={{ background: currentColor }}
              className="h-5 w-5 shrink-0 rounded-[5px] border-2 border-foreground"
            />
            <span className="font-bold text-[11px] uppercase tracking-[0.08em]">
              {isHex ? currentColor.toUpperCase() : currentColor}
            </span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-[256px] p-2"
          side="left"
          sideOffset={8}
          align="start"
        >
          <Tabs defaultValue="colorPicker">
            <TabsList className="grid h-9 w-full grid-cols-2">
              <TabsTrigger value="colorPicker" className="text-xs uppercase tracking-wide">
                Wheel
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="text-xs uppercase tracking-wide">
                Presets
              </TabsTrigger>
            </TabsList>

            <TabsContent value="colorPicker">
              <div className="overflow-hidden rounded-xl border-2 border-foreground">
                <ChromePicker
                  color={currentColor}
                  onChange={(color) => handleAttributeChange(attribute, color.hex)}
                  styles={{
                    default: {
                      picker: { boxShadow: 'none', borderRadius: 0, width: '100%', background: 'transparent' },
                    },
                  }}
                />
              </div>
            </TabsContent>

            <TabsContent value="suggestions">
              <div className="grid grid-cols-6 gap-1.5 pt-1">
                {colors.map((color) => {
                  const active = color.toLowerCase() === `${currentColor}`.toLowerCase();
                  return (
                    <button
                      key={color}
                      type="button"
                      aria-label={color}
                      style={{ background: color }}
                      onClick={() => handleAttributeChange(attribute, color)}
                      className="relative grid min-h-[44px] aspect-square place-items-center rounded-md border-2 border-foreground transition-transform duration-150 ease-neo hov:hover:scale-110"
                    >
                      {active && (
                        <Check
                          className="h-3.5 w-3.5"
                          style={{ color: color === '#FFFFFF' || color === '#FFE600' || color === '#B6FF3B' ? '#0b0b0b' : '#ffffff' }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ColorPicker;
