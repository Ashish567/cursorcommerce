'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="btn btn-primary position-fixed d-flex align-items-center justify-content-center"
      style={{ bottom: 24, right: 24, zIndex: 1050, width: 48, height: 48, borderRadius: '50%' }}
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 transition-all" style={{ display: theme === 'dark' ? 'none' : 'block' }} />
      <Moon className="h-5 w-5 transition-all" style={{ display: theme === 'dark' ? 'block' : 'none' }} />
    </button>
  );
} 