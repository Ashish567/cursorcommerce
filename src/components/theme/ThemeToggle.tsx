'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="btn btn-primary position-fixed d-flex align-items-center justify-content-center shadow-lg hover:opacity-90 transition-opacity"
      style={{ 
        bottom: 24, 
        right: 24, 
        zIndex: 1050, 
        width: 48, 
        height: 48, 
        borderRadius: '50%',
        backgroundColor: 'var(--bs-primary)',
        border: 'none'
      }}
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-5 w-5 text-white" />
      ) : (
        <Moon className="h-5 w-5 text-white" />
      )}
    </button>
  );
} 