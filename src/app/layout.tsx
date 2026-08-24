import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  title: 'Hiranbath | Luxury Architectural Bathware & Sanitaryware',
  description:
    'Experience Hiranbath Aura Zero 2.0. Ultra-minimalist precision bathroom mixers, thermostatic wellness showers, monolithic stone bathtubs, and designer sanitaryware.',
  keywords: [
    'Hiranbath',
    'Luxury Bathware',
    'Sanitaryware',
    'Concealed Basin Mixer',
    'Aura Zero 2.0',
    'Rain Showers',
    'Freestanding Bathtubs',
    'Architectural Bath Fittings',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-white text-neutral-900 antialiased overflow-x-hidden"
      >
        {children}
      </body>
    </html>
  );
}
