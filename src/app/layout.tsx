import { Providers } from '@/components/providers';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Make It Exist | By AIM Students, For AIM Students',
  description:
    'Make It Exist is a platform built by AIM students, for AIM students. Get free websites, mobile apps, web apps, custom LLM solutions, and more to launch your business and career.',
  keywords: [
    'AIM',
    'students',
    'websites',
    'mobile apps',
    'web apps',
    'LLM',
    'AI',
    'platform',
    'Make It Exist',
  ],
  authors: [{ name: 'AIM Students' }],
  openGraph: {
    title: 'Make It Exist | By AIM Students, For AIM Students',
    description:
      'Empowering AIM students to launch businesses and careers with cutting-edge technology solutions.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFBFC' },
    { media: '(prefers-color-scheme: dark)', color: '#0A1628' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
