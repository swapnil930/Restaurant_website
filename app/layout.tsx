import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Swapnil Hub Restaurant | Best Indian Food in Pune',
  description: 'Authentic Indian restaurant in Pune offering dine-in, takeaway, and home delivery. Book your table today! Famous for Paneer Butter Masala, Biryani & more.',
  keywords: 'restaurant pune, indian food, biryani, paneer butter masala, best restaurant pune, food delivery pune, book table online',
  authors: [{ name: 'Spice Hub Restaurant' }],
  openGraph: {
    title: 'Spice Hub Restaurant Pune',
    description: 'Authentic Indian cuisine in Pune',
    url: 'https://restaurant-website-1h73.vercel.app',
    siteName: 'Spice Hub Restaurant',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
