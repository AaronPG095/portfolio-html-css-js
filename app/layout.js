import './globals.css';
import Providers from '@/components/Providers/Providers';

export const metadata = {
  title: 'NextJS Portfolio - Aaron Paul Greyling | Fullstack Developer',
  description: 'Creative and motivated web developer with experience in frontend and backend development.',
};

export default function RootLayout({ children }) {
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

