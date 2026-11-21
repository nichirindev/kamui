// app/app/page.tsx — offline editor (no auth, no server, no billing)
'use client'

import React, { useCallback, useRef, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ModeToggle } from '@/components/mode-toggle';
import { Accordion } from '@/components/ui/accordion';
import TextCustomizer from '@/components/editor/text-customizer';
import { toast } from '@/hooks/use-toast';

import {
    AlertTriangle,
    Download,
    ImageUp,
    Layers,
    Loader2,
    Plus,
    ShieldCheck,
    Upload,
    X,
} from 'lucide-react';

import { removeBackground, type Config } from '@imgly/background-removal';

// Model + WASM runtime are served from /public/imgly (downloaded by
// `npm run assets`). No network access is ever needed at runtime.
const MODEL = (process.env.NEXT_PUBLIC_TBI_MODEL as Config['model']) || 'isnet_fp16';

const getImglyConfig = (onProgress?: (pct: number) => void): Config => ({
    // publicPath must be an absolute URL because the library does
    // `new URL("resources.json", config.publicPath)`.
    publicPath: `${window.location.origin}/imgly/`,
    model: MODEL,
    device: 'cpu',
    proxyToWorker: true,
    progress: onProgress
        ? (_key, current, total) => onProgress(Math.round((current / total) * 100))
        : undefined,
});

const Page = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isImageSetupDone, setIsImageSetupDone] = useState<boolean>(false);
    const [removedBgImageUrl, setRemovedBgImageUrl] = useState<string | null>(null);
    const [progress, setProgress] = useState<number | null>(null);
    const [textSets, setTextSets] = useState<Array<any>>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const previewImgRef = useRef<HTMLImageElement>(null);

    const handleUploadImage = () => {
        fileInputRef.current?.click();
    };

    const setupImage = async (imageUrl: string) => {
        try {
            setProgress(0);
            const imageBlob = await removeBackground(
                imageUrl,
                getImglyConfig((pct) => setProgress(pct)),
            );
            const url = URL.createObjectURL(imageBlob);
            setRemovedBgImageUrl(url);
            setIsImageSetupDone(true);
        } catch (error) {
            console.error(error);
            setError('Background removal failed. The on-device model could not run. Check that /public/imgly is present, then try another image.');
        } finally {
            setProgress(null);
        }
    };

    const processFile = useCallback(async (file: File) => {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        setIsImageSetupDone(false);
        setRemovedBgImageUrl(null);
        setTextSets([]);
        setError(null);
        await setupImage(imageUrl);
    }, []);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            await processFile(file);
        }
        // Allow re-selecting the same file later.
        event.target.value = '';
    };

    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files?.[0];
        if (file) {
            await processFile(file);
        }
    };

    const addNewTextSet = () => {
        const newId = Math.max(...textSets.map(set => set.id), 0) + 1;
        setTextSets(prev => [...prev, {
            id: newId,
            text: 'edit',
            fontFamily: 'Inter',
            top: 0,
            left: 0,
            color: 'white',
            fontSize: 200,
            fontWeight: 800,
            opacity: 1,
            shadowColor: 'rgba(0, 0, 0, 0.8)',
            shadowSize: 4,
            rotation: 0,
            tiltX: 0,
            tiltY: 0,
            letterSpacing: 0
        }]);
    };

    const handleAttributeChange = (id: number, attribute: string, value: any) => {
        setTextSets(prev => prev.map(set =>
            set.id === id ? { ...set, [attribute]: value } : set
        ));
    };

    const duplicateTextSet = (textSet: any) => {
        const newId = Math.max(...textSets.map(set => set.id), 0) + 1;
        setTextSets(prev => [...prev, { ...textSet, id: newId }]);
    };

    const removeTextSet = (id: number) => {
        setTextSets(prev => prev.filter(set => set.id !== id));
    };

    const saveCompositeImage = () => {
        if (!canvasRef.current || !isImageSetupDone) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const bgImg = new window.Image();
        bgImg.crossOrigin = "anonymous";
        bgImg.onload = () => {
            canvas.width = bgImg.width;
            canvas.height = bgImg.height;

            // Text is authored in preview CSS pixels. Scale it by the ratio
            // between the source image and the image as displayed, so the PNG
            // matches the preview at any resolution or window size.
            const previewWidth = previewImgRef.current?.getBoundingClientRect().width ?? 0;
            const ratio = previewWidth > 0 ? canvas.width / previewWidth : 3;
            const exportScale = Math.min(Math.max(ratio, 0.5), 16);

            ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

            textSets.forEach(textSet => {
                ctx.save();

                const fontSize = textSet.fontSize * exportScale;
                const letterSpacing = textSet.letterSpacing * exportScale;

                ctx.font = `${textSet.fontWeight} ${fontSize}px ${textSet.fontFamily}`;
                ctx.fillStyle = textSet.color;
                ctx.globalAlpha = textSet.opacity;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                (ctx as any).letterSpacing = `${letterSpacing}px`;

                const x = canvas.width * (textSet.left + 50) / 100;
                const y = canvas.height * (50 - textSet.top) / 100;

                ctx.translate(x, y);

                const tiltXRad = (-textSet.tiltX * Math.PI) / 180;
                const tiltYRad = (-textSet.tiltY * Math.PI) / 180;

                ctx.transform(
                    Math.cos(tiltYRad),
                    Math.sin(0),
                    -Math.sin(0),
                    Math.cos(tiltXRad),
                    0,
                    0
                );

                ctx.rotate((textSet.rotation * Math.PI) / 180);

                if (textSet.letterSpacing === 0) {
                    ctx.fillText(textSet.text, 0, 0);
                } else {
                    const chars = textSet.text.split('');
                    let currentX = 0;
                    const totalWidth = chars.reduce((width: number, char: string, i: number) => {
                        const charWidth = ctx.measureText(char).width;
                        return width + charWidth + (i < chars.length - 1 ? letterSpacing : 0);
                    }, 0);

                    currentX = -totalWidth / 2;

                    chars.forEach((char: string) => {
                        const charWidth = ctx.measureText(char).width;
                        ctx.fillText(char, currentX + charWidth / 2, 0);
                        currentX += charWidth + letterSpacing;
                    });
                }
                ctx.restore();
            });

            if (removedBgImageUrl) {
                const removedBgImg = new window.Image();
                removedBgImg.crossOrigin = "anonymous";
                removedBgImg.onload = () => {
                    ctx.drawImage(removedBgImg, 0, 0, canvas.width, canvas.height);
                    triggerDownload();
                };
                removedBgImg.src = removedBgImageUrl;
            } else {
                triggerDownload();
            }
        };
        bgImg.src = selectedImage || '';

        function triggerDownload() {
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'text-behind-image.png';
            link.href = dataUrl;
            link.click();
            toast({
                title: 'Image saved',
                description: 'text-behind-image.png is in your downloads.',
                duration: 4000,
            });
        }
    };

    const busy = progress !== null;

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            {/* -------------------------------------------------- header */}
            <header className="sticky top-0 z-40 border-b-2 border-foreground bg-background">
                <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-3 px-4 sm:px-6">
                    <div className="flex min-w-0 items-center gap-2.5">
                        <Link href="/" className="flex items-center gap-2.5" aria-label="Text Behind home">
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border-2 border-[#0b0b0b] bg-pop-pink font-display text-lg leading-none text-[#0b0b0b] shadow-neo-sm">
                                T/
                            </span>
                            <span className="hidden font-display text-xl uppercase leading-none tracking-wide sm:block">
                                Text<span className="text-pop-pink">/</span>Behind
                            </span>
                        </Link>
                        <span className="rounded-full border-2 border-[#0b0b0b] bg-pop-yellow px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0b0b0b]">
                            Studio
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="hidden items-center gap-1.5 rounded-full border-2 border-foreground px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] lg:flex">
                            <ShieldCheck className="h-3 w-3 text-pop-pink" />
                            On-device
                        </span>

                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            accept=".jpg, .jpeg, .png"
                        />

                        <Button onClick={handleUploadImage} disabled={busy} size="sm" variant="outline">
                            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                            <span className="hidden sm:inline">Upload image</span>
                            <span className="sm:hidden">Upload</span>
                        </Button>

                        {selectedImage && (
                            <Button onClick={saveCompositeImage} size="sm" disabled={!isImageSetupDone}>
                                <Download className="h-4 w-4" />
                                Save image
                            </Button>
                        )}

                        <ModeToggle />
                    </div>
                </div>
            </header>

            {/* -------------------------------------------------- body */}
            <main className="flex flex-1 flex-col lg:grid lg:h-[calc(100vh-4rem)] lg:flex-none lg:grid-cols-[minmax(0,1fr)_420px] lg:grid-rows-[minmax(0,1fr)] lg:overflow-hidden">
                {/* stage */}
                <section className="relative flex min-h-[60vh] flex-col overflow-hidden lg:min-h-0">
                    <div aria-hidden className="pointer-events-none absolute inset-0 grid-paper" />

                    {error && (
                        <div
                            role="alert"
                            className="relative z-20 mx-4 mt-4 flex flex-col gap-3 rounded-2xl border-2 border-destructive bg-card p-4 shadow-neo-sm sm:mx-6 sm:flex-row sm:items-center"
                        >
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border-2 border-destructive bg-destructive text-white">
                                <AlertTriangle className="h-4 w-4" />
                            </span>
                            <p className="flex-1 text-sm leading-relaxed">{error}</p>
                            <div className="flex items-center gap-2">
                                <Button onClick={handleUploadImage} size="sm" variant="outline">
                                    Choose another
                                </Button>
                                <Button
                                    onClick={() => setError(null)}
                                    size="icon"
                                    variant="ghost"
                                    aria-label="Dismiss error"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {selectedImage ? (
                        <div className="relative flex min-h-0 flex-1 flex-col p-4 sm:p-6">
                            <div className="mb-3 flex items-center justify-between gap-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-foreground bg-card px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em]">
                                        <span className="h-1.5 w-1.5 rounded-full bg-pop-pink" />
                                        Preview
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/70 tabular">
                                        {textSets.length} {textSets.length === 1 ? 'layer' : 'layers'}
                                    </span>
                                </div>
                                <Button onClick={saveCompositeImage} size="sm" className="md:hidden" disabled={!isImageSetupDone}>
                                    <Download className="h-4 w-4" />
                                    Save image
                                </Button>
                            </div>

                            <div
                                className="checkerboard relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl border-2 border-foreground p-3 sm:p-6"
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleDrop}
                            >
                                {isDragging && (
                                    <div className="absolute inset-0 z-30 grid place-items-center rounded-2xl border-4 border-dashed border-pop-pink bg-background/90">
                                        <span className="text-[11px] font-bold uppercase tracking-[0.18em]">Drop to replace</span>
                                    </div>
                                )}

                                <div className="relative inline-flex max-h-full max-w-full">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        ref={previewImgRef}
                                        src={selectedImage}
                                        alt="Uploaded"
                                        className="block max-h-[calc(100vh-16rem)] w-auto max-w-full rounded-lg border-2 border-foreground object-contain"
                                    />

                                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
                                        {isImageSetupDone && textSets.map(textSet => (
                                            <div
                                                key={textSet.id}
                                                style={{
                                                    position: 'absolute',
                                                    top: `${50 - textSet.top}%`,
                                                    left: `${textSet.left + 50}%`,
                                                    transform: `
                                                        translate(-50%, -50%)
                                                        rotate(${textSet.rotation}deg)
                                                        perspective(1000px)
                                                        rotateX(${textSet.tiltX}deg)
                                                        rotateY(${textSet.tiltY}deg)
                                                    `,
                                                    color: textSet.color,
                                                    textAlign: 'center',
                                                    fontSize: `${textSet.fontSize}px`,
                                                    fontWeight: textSet.fontWeight,
                                                    fontFamily: textSet.fontFamily,
                                                    opacity: textSet.opacity,
                                                    letterSpacing: `${textSet.letterSpacing}px`,
                                                    transformStyle: 'preserve-3d',
                                                    whiteSpace: 'pre',
                                                }}
                                            >
                                                {textSet.text}
                                            </div>
                                        ))}

                                        {removedBgImageUrl && (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={removedBgImageUrl}
                                                alt="Removed bg"
                                                className="absolute inset-0 h-full w-full object-contain"
                                            />
                                        )}
                                    </div>
                                </div>

                                {!isImageSetupDone && !error && (
                                    <div className="absolute inset-0 z-20 grid place-items-center bg-background/85">
                                        <div className="w-[min(320px,80%)] rounded-2xl border-2 border-foreground bg-card p-6 text-center shadow-neo">
                                            <Loader2 className="mx-auto h-7 w-7 animate-spin text-pop-pink" />
                                            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.14em]">
                                                {progress !== null ? `Cutting out ${progress}%` : 'Loading model'}
                                            </p>
                                            <div className="mt-3 h-3 w-full overflow-hidden rounded-full border-2 border-foreground bg-background">
                                                <div
                                                    className="h-full bg-pop-pink transition-[width] duration-200"
                                                    style={{ width: `${progress ?? 0}%` }}
                                                />
                                            </div>
                                            <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.16em] text-foreground/70">
                                                Running locally · no upload
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="relative flex flex-1 items-center justify-center p-5 sm:p-8">
                            <div
                                className="relative w-full max-w-xl rounded-3xl border-2 border-foreground bg-card p-8 text-center shadow-neo-lg sm:p-12"
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleDrop}
                            >
                                {isDragging && (
                                    <div className="absolute inset-0 z-20 grid place-items-center rounded-3xl border-4 border-dashed border-pop-pink bg-background/90">
                                        <span className="text-[11px] font-bold uppercase tracking-[0.18em]">Drop it</span>
                                    </div>
                                )}

                                <div className="relative">
                                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border-2 border-[#0b0b0b] bg-pop-yellow text-[#0b0b0b] shadow-neo-sm">
                                        <ImageUp className="h-6 w-6" strokeWidth={2.4} />
                                    </span>

                                    <h1 className="mt-6 font-display text-[clamp(2.2rem,6vw,3.6rem)] uppercase leading-[0.9] tracking-tight">
                                        Drop a photo.
                                    </h1>
                                    <p className="mx-auto mt-3 max-w-[42ch] text-sm leading-relaxed text-foreground/75">
                                        JPG or PNG. The subject is cut out in your browser, then you can place type behind it.
                                    </p>

                                    <Button onClick={handleUploadImage} size="lg" className="mt-7">
                                        <Upload className="h-4 w-4" />
                                        Choose an image
                                    </Button>

                                    <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.16em] text-foreground/70">
                                        or drag &amp; drop · nothing leaves this device
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* inspector */}
                <aside className="flex min-h-[420px] flex-col border-t-2 border-foreground bg-card lg:min-h-0 lg:border-l-2 lg:border-t-0">
                    <div className="flex items-center justify-between gap-3 border-b-2 border-foreground px-4 py-3">
                        <div className="flex items-center gap-2.5">
                            <span className="grid h-9 w-9 place-items-center rounded-xl border-2 border-[#0b0b0b] bg-pop-pink text-[#0b0b0b]">
                                <Layers className="h-4 w-4" strokeWidth={2.2} />
                            </span>
                            <div>
                                <h2 className="font-display text-base uppercase leading-none tracking-tight">
                                    Text layers
                                </h2>
                                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-foreground/70 tabular">
                                    {textSets.length} {textSets.length === 1 ? 'set' : 'sets'} on canvas
                                </p>
                            </div>
                        </div>
                        <Button onClick={addNewTextSet} size="sm" variant="secondary" disabled={!selectedImage}>
                            <Plus className="h-3.5 w-3.5" />
                            Add New Text Set
                        </Button>
                    </div>

                    <ScrollArea className="min-h-0 flex-1">
                        <div className="p-4">
                            {textSets.length > 0 ? (
                                <Accordion type="single" collapsible className="w-full">
                                    {textSets.map(textSet => (
                                        <TextCustomizer
                                            key={textSet.id}
                                            textSet={textSet}
                                            handleAttributeChange={handleAttributeChange}
                                            removeTextSet={removeTextSet}
                                            duplicateTextSet={duplicateTextSet}
                                        />
                                    ))}
                                </Accordion>
                            ) : (
                                <div className="rounded-2xl border-2 border-dashed border-foreground/30 bg-secondary/50 p-6 text-center">
                                    <p className="font-display text-base uppercase leading-none tracking-tight">
                                        No layers yet
                                    </p>
                                    <p className="mt-2 text-xs leading-relaxed text-foreground/70">
                                        {selectedImage
                                            ? 'Add a text set, then move, scale and tilt it behind the subject.'
                                            : 'Upload an image first. Then add as many text sets as you need.'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    <div className="border-t-2 border-foreground px-4 py-3 text-[9px] font-bold uppercase tracking-[0.14em] text-foreground/70">
                        <span className="inline-flex items-center gap-1.5">
                            <ShieldCheck className="h-3 w-3 text-pop-pink" />
                            100% local · model isnet_fp16
                        </span>
                    </div>
                </aside>
            </main>
        </div>
    );
}

export default Page;
