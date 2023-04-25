import { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import NavBar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My blog',
  description: 'Hello world',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} px-8 md:px-36 lg:px-48 xl:px-52`}>
        <NavBar />
        <div className="px-2">
          {children}
        </div>
      </body>
    </html>
  );
}
