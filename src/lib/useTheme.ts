import { useState, useEffect } from 'react';

export default function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');   

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return { theme, toggleTheme };
}