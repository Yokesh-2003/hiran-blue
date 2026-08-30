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
  metadataBase: new URL('https://hiranbath.com'),
  title: {
    default: 'Hiran Bath | Luxury Architectural Bathware, Faucets & Sanitaryware',
    template: '%s | Hiran Bath',
  },
  description:
    'Discover Hiran Bath luxury bathware collections. Explore precision-engineered faucets, designer showers, heavy-duty valves, bath fittings, and download digital product catalogs.',
  keywords: [
    'Hiran Bath',
    'Hiranbath',
    'Luxury Bathware',
    'Architectural Faucets',
    'Sanitaryware India',
    'Basin Mixers',
    'Wall Mixers',
    'Diverters',
    'Bath Seth',
    'Kitchen Sink Taps',
    'Ball Valves',
    'Rain Showers',
    'Bathroom Fittings',
    'Product Catalogue Download',
  ],
  authors: [{ name: 'Hiran Bath' }],
  creator: 'Hiran Bath',
  publisher: 'Hiran Bath',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://hiranbath.com',
  },
  openGraph: {
    title: 'Hiran Bath | Luxury Architectural Bathware, Faucets & Sanitaryware',
    description:
      'Discover Hiran Bath luxury bathware collections. Precision-engineered faucets, designer showers, valves, and bath suites.',
    url: 'https://hiranbath.com',
    siteName: 'Hiran Bath',
    images: [
      {
        url: '/images/hero-banner.png',
        width: 1200,
        height: 630,
        alt: 'Hiran Bath Architectural Luxury',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hiran Bath | Luxury Architectural Bathware & Sanitaryware',
    description:
      'Discover Hiran Bath luxury bathware collections. Precision-engineered faucets, showers, and valves.',
    images: ['/images/hero-banner.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/images/favicon.png?v=3', type: 'image/png' }],
    shortcut: '/images/favicon.png?v=3',
    apple: '/images/favicon.png?v=3',
  },
};

import { CartProvider } from '@/context/CartContext';

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
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
