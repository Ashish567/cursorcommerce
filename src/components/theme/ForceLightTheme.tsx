'use client';

import { useEffect } from "react";

export function ForceLightTheme() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, []);
  return null;
} 