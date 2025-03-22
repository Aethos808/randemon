'use client';

import { ThemeToggle } from '@/components/themes/ThemeToggle';

export const Header = () => {
  return (
    <header className="flex items-center justify-between w-full bg-background">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-muted rounded-md" />
        <h1 className="text-xl font-bold sm:text-2xl">Randémon</h1>
      </div>
      <ThemeToggle />
    </header>
  );
};
