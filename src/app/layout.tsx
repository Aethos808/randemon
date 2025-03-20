import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en">
      <body className="font-sans bg-background text-foreground">{children}</body>
    </html>
  );
}
