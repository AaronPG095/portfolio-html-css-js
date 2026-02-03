import './globals.css';
import Providers from '@/components/Providers/Providers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NextJS Portfolio - Aaron Paul Greyling | Fullstack Developer',
  description: 'Creative and motivated web developer with experience in frontend and backend development.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
