import { Barlow, Barlow_Semi_Condensed, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './tokens.css';
import './globals.css';

const sans = Barlow({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-barlow' });
const display = Barlow_Semi_Condensed({ subsets: ['latin'], weight: ['700'], variable: '--font-barlow-sc' });
const din = localFont({ src: './fonts/alte-din-1451-mittelschrift-gepraegt.ttf', weight: '400', variable: '--font-din' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400'], variable: '--font-jetbrains' });

export const metadata = {
  title: 'BlackMatter',
  description: 'Darkest. Deeper surfaces, the same berries at full strength. Blood in bog water.',
  icons: { icon: '/icon.svg' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${din.variable} ${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
