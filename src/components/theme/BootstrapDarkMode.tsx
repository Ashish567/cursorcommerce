'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

const DARKLY_CSS = 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.2/dist/darkly/bootstrap.min.css';

export function BootstrapDarkMode() {
  const { theme } = useTheme();

  useEffect(() => {
    let link: HTMLLinkElement | null = document.getElementById('bootswatch-darkly') as HTMLLinkElement;
    if (theme === 'dark') {
      if (!link) {
        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.id = 'bootswatch-darkly';
        link.href = DARKLY_CSS;
        document.head.appendChild(link);
      }
    } else {
      if (link) {
        link.parentNode?.removeChild(link);
      }
    }
  }, [theme]);

  return null;
} 