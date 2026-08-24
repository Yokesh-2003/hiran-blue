import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '600', '700', '800', '900'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  title: 'Hiran - Bath | Luxury Architectural Bathware & Sanitaryware',
  description:
    'Experience Hiran - Bath. Ultra-minimalist precision bathroom mixers, thermostatic wellness showers, monolithic stone bathtubs, and designer sanitaryware.',
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
  icons: {
    icon: [
      { url: '/images/favicon.png?v=3', type: 'image/png' },
    ],
    shortcut: '/images/favicon.png?v=3',
    apple: '/images/favicon.png?v=3',
  },
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
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/images/favicon.png?v=3" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/images/favicon.png?v=3" type="image/png" />
        <link rel="apple-touch-icon" href="/images/favicon.png?v=3" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-white text-neutral-900 antialiased overflow-x-hidden"
      >
        {children}
      </body>
    </html>
  );
}
