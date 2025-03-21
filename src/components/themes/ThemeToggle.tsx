'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isLight = resolvedTheme !== 'dark';

  return (
    <button
      className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted dark:hover:bg-accent/20 hover:text-accent-foreground cursor-pointer"
      aria-label="Toggle theme"
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
    >
      <div className="w-8 h-8">
        <Image
          src={isLight ? '/sun2.png' : '/moon.png'}
          alt={isLight ? 'Light mode' : 'Dark mode'}
          width={65}
          height={65}
          priority={true}
        />
      </div>
    </button>
  );
};
