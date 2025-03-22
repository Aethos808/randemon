import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/themes/ThemeProvider';

export const metadata: Metadata = {
  title: 'Randémon',
  description: 'A Pokémon Random Team Generator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground min-h-screen">
        <ThemeProvider>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
