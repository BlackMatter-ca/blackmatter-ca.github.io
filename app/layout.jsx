import { Barlow, Barlow_Semi_Condensed, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeScript } from './Theme';

const sans = Barlow({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-barlow' });
const display = Barlow_Semi_Condensed({ subsets: ['latin'], weight: ['700'], variable: '--font-barlow-sc' });
const din = localFont({ src: './fonts/alte-din-1451-mittelschrift.ttf', weight: '400', variable: '--font-din' });
const dinEmbossed = localFont({ src: './fonts/alte-din-1451-mittelschrift-gepraegt.ttf', weight: '400', variable: '--font-din-embossed' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400'], variable: '--font-jetbrains' });

export const metadata = {
  title: { default: 'BlackMatter', template: '%s' },
  description: 'A consultancy. Yellowknife, Northwest Territories.',
  icons: { icon: '/icon.svg' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${din.variable} ${dinEmbossed.variable} ${sans.variable} ${display.variable} ${mono.variable}`}>
      <head><ThemeScript /></head>
      <body>{children}</body>
    </html>
  );
}
