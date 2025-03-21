'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isLight = theme !== 'dark';

  return (
    <button
      className="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-muted dark:hover:bg-accent/20 hover:text-accent-foreground"
      aria-label="Toggle theme"
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
    >
      <Image
        src={isLight ? '/sun2.png' : '/moon.png'}
        alt={isLight ? 'Light mode' : 'Dark mode'}
        width={65}
        height={65}
        priority={true}
      />
    </button>
  );
};
