import type { Metadata, Viewport } from "next";
import "./fonts.css";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "TEXT/BEHIND — Text Behind Image Studio",
  description:
    "Cut the subject out of any photo and slide bold type behind it. 100% in your browser, no uploads, no accounts, no internet required.",
};

export const viewport: Viewport = {
  themeColor: "#fff8e7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
