import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SmoothScrollProvider } from '@/lib/scroll';
import { PROFILE } from '@/lib/data';

const interTight = localFont({
  src: '../fonts/inter-tight.woff2',
  variable: '--font-inter-tight',
  display: 'swap',
  weight: '100 900',
});

const instrumentSerif = localFont({
  src: [
    {
      path: '../fonts/instrument-serif-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/instrument-serif-italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const jetbrainsMono = localFont({
  src: '../fonts/jetbrains-mono.woff2',
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: '100 800',
});

export const metadata: Metadata = {
  title: `${PROFILE.name} — ${PROFILE.role}`,
  description: PROFILE.resumeSummary,
  authors: [{ name: PROFILE.name }],
  metadataBase: new URL('https://athulsimon.dev'),
  openGraph: {
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description: PROFILE.resumeSummary,
    url: 'https://athulsimon.dev',
    siteName: `${PROFILE.name} Portfolio`,
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: `${PROFILE.name} — ${PROFILE.role}`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description: PROFILE.resumeSummary,
    images: ['/og.jpg'],
  },
  icons: {
    icon: '/portrait-bust.webp',
  },
};

export const viewport: Viewport = {
  themeColor: '#f4f2ee',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[#f4f2ee] text-[#0d0d0d] antialiased selection:bg-[#0d0d0d] selection:text-[#f4f2ee]">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
