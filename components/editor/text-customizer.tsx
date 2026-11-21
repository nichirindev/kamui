'use client'

import React, { useState } from 'react';
import InputField from './input-field';
import SliderField from './slider-field';
import ColorPicker from './color-picker';
import FontFamilyPicker from './font-picker';
import { Button } from '../ui/button';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Move,
  Text,
  Bold,
  RotateCw,
  Palette,
  LightbulbIcon,
  CaseSensitive,
  TypeOutline,
  AlignHorizontalSpaceAround,
  ArrowLeftRight,
  ArrowUpDown,
  Copy,
  Trash2,
} from 'lucide-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from '@/lib/utils';

interface TextCustomizerProps {
    textSet: {
        id: number;
        text: string;
        fontFamily: string;
        top: number;
        left: number;
        color: string;
        fontSize: number;
        fontWeight: number;
        opacity: number;
        rotation: number;
        shadowColor: string;
        shadowSize: number;
        tiltX: number;
        tiltY: number;
        letterSpacing: number;
    };
    handleAttributeChange: (id: number, attribute: string, value: any) => void;
    removeTextSet: (id: number) => void;
    duplicateTextSet: (textSet: any) => void;
}

const TextCustomizer: React.FC<TextCustomizerProps> = ({ textSet, handleAttributeChange, removeTextSet, duplicateTextSet }) => {
    const [activeControl, setActiveControl] = useState<string | null>(null);
    const onChange = (attribute: string, value: any) => handleAttributeChange(textSet.id, attribute, value);

    const controls = [
        { id: 'text', icon: <CaseSensitive size={19} />, label: 'Text' },
        { id: 'fontFamily', icon: <TypeOutline size={19} />, label: 'Font' },
        { id: 'color', icon: <Palette size={19} />, label: 'Color' },
        { id: 'position', icon: <Move size={19} />, label: 'Position' },
        { id: 'fontSize', icon: <Text size={19} />, label: 'Size' },
        { id: 'fontWeight', icon: <Bold size={19} />, label: 'Weight' },
        { id: 'letterSpacing', icon: <AlignHorizontalSpaceAround size={19} />, label: 'Spacing' },
        { id: 'opacity', icon: <LightbulbIcon size={19} />, label: 'Opacity' },
        { id: 'rotation', icon: <RotateCw size={19} />, label: 'Rotate' },
        { id: 'tiltX', icon: <ArrowLeftRight size={19} />, label: 'Tilt X' },
        { id: 'tiltY', icon: <ArrowUpDown size={19} />, label: 'Tilt Y' },
    ];

    return (
        <AccordionItem value={`item-${textSet.id}`}>
            <AccordionTrigger>
                <span className="flex min-w-0 items-center gap-2 text-left">
                    <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-pop-pink" />
                    <span className="truncate">{textSet.text || 'Untitled layer'}</span>
                </span>
            </AccordionTrigger>

            <AccordionContent>
                {/* ---------------------------------------------- mobile */}
                <div className="md:hidden">
                    <ScrollArea className="w-full">
                        <div className="mb-3 flex w-max gap-1.5 py-1">
                            {controls.map((control) => (
                                <button
                                    key={control.id}
                                    type="button"
                                    onClick={() => setActiveControl(activeControl === control.id ? null : control.id)}
                                    className={cn(
                                        'flex h-[4.4rem] min-w-[4rem] flex-col items-center justify-center gap-1 rounded-xl border-2 border-foreground px-2 transition-transform active:translate-y-0.5',
                                        activeControl === control.id
                                            ? 'bg-pop-pink text-[#0b0b0b] shadow-neo-sm'
                                            : 'bg-background text-foreground'
                                    )}
                                >
                                    {control.icon}
                                    <span className="text-[9px] font-bold uppercase tracking-[0.08em]">{control.label}</span>
                                </button>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>

                    <div className="min-h-[4rem]">
                        {activeControl === 'text' && (
                            <InputField
                                attribute="text"
                                label="Text"
                                currentValue={textSet.text}
                                handleAttributeChange={onChange}
                            />
                        )}

                        {activeControl === 'fontFamily' && (
                            <FontFamilyPicker
                                attribute="fontFamily"
                                currentFont={textSet.fontFamily}
                                handleAttributeChange={onChange}
                            />
                        )}

                        {activeControl === 'color' && (
                            <ColorPicker
                                attribute="color"
                                label="Text Color"
                                currentColor={textSet.color}
                                handleAttributeChange={onChange}
                            />
                        )}

                        {activeControl === 'position' && (
                            <div>
                                <SliderField
                                    attribute="left"
                                    label="X Position"
                                    min={-200}
                                    max={200}
                                    step={1}
                                    currentValue={textSet.left}
                                    handleAttributeChange={onChange}
                                />
                                <SliderField
                                    attribute="top"
                                    label="Y Position"
                                    min={-100}
                                    max={100}
                                    step={1}
                                    currentValue={textSet.top}
                                    handleAttributeChange={onChange}
                                />
                            </div>
                        )}

                        {activeControl === 'fontSize' && (
                            <SliderField
                                attribute="fontSize"
                                label="Text Size"
                                min={10}
                                max={800}
                                step={1}
                                currentValue={textSet.fontSize}
                                handleAttributeChange={onChange}
                            />
                        )}

                        {activeControl === 'fontWeight' && (
                            <SliderField
                                attribute="fontWeight"
                                label="Font Weight"
                                min={100}
                                max={900}
                                step={100}
                                currentValue={textSet.fontWeight}
                                handleAttributeChange={onChange}
                            />
                        )}

                        {activeControl === 'letterSpacing' && (
                            <SliderField
                                attribute="letterSpacing"
                                label="Letter Spacing"
                                min={-20}
                                max={100}
                                step={1}
                                currentValue={textSet.letterSpacing}
                                handleAttributeChange={onChange}
                            />
                        )}

                        {activeControl === 'opacity' && (
                            <SliderField
                                attribute="opacity"
                                label="Text Opacity"
                                min={0}
                                max={1}
                                step={0.01}
                                currentValue={textSet.opacity}
                                handleAttributeChange={onChange}
                            />
                        )}

                        {activeControl === 'rotation' && (
                            <SliderField
                                attribute="rotation"
                                label="Rotation"
                                min={-360}
                                max={360}
                                step={1}
                                currentValue={textSet.rotation}
                                handleAttributeChange={onChange}
                            />
                        )}

                        {activeControl === 'tiltX' && (
                            <SliderField
                                attribute="tiltX"
                                label="Horizontal Tilt"
                                min={-45}
                                max={45}
                                step={1}
                                currentValue={textSet.tiltX}
                                handleAttributeChange={onChange}
                            />
                        )}

                        {activeControl === 'tiltY' && (
                            <SliderField
                                attribute="tiltY"
                                label="Vertical Tilt"
                                min={-45}
                                max={45}
                                step={1}
                                currentValue={textSet.tiltY}
                                handleAttributeChange={onChange}
                            />
                        )}
                    </div>
                </div>

                {/* ---------------------------------------------- desktop */}
                <div className="hidden space-y-5 md:block">
                    <InputField
                        attribute="text"
                        label="Text"
                        currentValue={textSet.text}
                        handleAttributeChange={onChange}
                    />

                    <div className="grid grid-cols-2 items-end gap-3">
                        <FontFamilyPicker
                            attribute="fontFamily"
                            currentFont={textSet.fontFamily}
                            handleAttributeChange={onChange}
                        />
                        <ColorPicker
                            attribute="color"
                            label="Text Color"
                            currentColor={textSet.color}
                            handleAttributeChange={onChange}
                        />
                    </div>

                    <div className="rounded-2xl border-2 border-foreground bg-background p-4">
                        <SliderField
                            attribute="left"
                            label="X Position"
                            min={-200}
                            max={200}
                            step={1}
                            currentValue={textSet.left}
                            hasTopPadding={false}
                            handleAttributeChange={onChange}
                        />
                        <SliderField
                            attribute="top"
                            label="Y Position"
                            min={-100}
                            max={100}
                            step={1}
                            currentValue={textSet.top}
                            handleAttributeChange={onChange}
                        />
                        <SliderField
                            attribute="fontSize"
                            label="Text Size"
                            min={10}
                            max={800}
                            step={1}
                            currentValue={textSet.fontSize}
                            handleAttributeChange={onChange}
                        />
                        <SliderField
                            attribute="fontWeight"
                            label="Font Weight"
                            min={100}
                            max={900}
                            step={100}
                            currentValue={textSet.fontWeight}
                            handleAttributeChange={onChange}
                        />
                        <SliderField
                            attribute="letterSpacing"
                            label="Letter Spacing"
                            min={-20}
                            max={100}
                            step={1}
                            currentValue={textSet.letterSpacing}
                            handleAttributeChange={onChange}
                        />
                        <SliderField
                            attribute="opacity"
                            label="Text Opacity"
                            min={0}
                            max={1}
                            step={0.01}
                            currentValue={textSet.opacity}
                            handleAttributeChange={onChange}
                        />
                        <SliderField
                            attribute="rotation"
                            label="Rotation"
                            min={-360}
                            max={360}
                            step={1}
                            currentValue={textSet.rotation}
                            handleAttributeChange={onChange}
                        />
                        <SliderField
                            attribute="tiltX"
                            label="Horizontal Tilt (3D)"
                            min={-45}
                            max={45}
                            step={1}
                            currentValue={textSet.tiltX}
                            handleAttributeChange={onChange}
                        />
                        <SliderField
                            attribute="tiltY"
                            label="Vertical Tilt (3D)"
                            min={-45}
                            max={45}
                            step={1}
                            currentValue={textSet.tiltY}
                            handleAttributeChange={onChange}
                        />
                    </div>
                </div>

                <div className="my-6 flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => duplicateTextSet(textSet)}>
                        <Copy className="h-3.5 w-3.5" />
                        Duplicate Text Set
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => removeTextSet(textSet.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove Text Set
                    </Button>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};

export default TextCustomizer;
