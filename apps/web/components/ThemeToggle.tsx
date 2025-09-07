'use client';
import { useTheme } from 'next-themes';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="ml-auto border px-2 py-1 rounded"
    >
      Toggle {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
};
