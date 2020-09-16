import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [theme, setTheme] = useState('light');
  const [hasMounted, sethasMounted] = useState(false);

  const isBrowser = () => typeof window !== 'undefined';

  const oppositeTheme = (theme === 'light') ? 'dark' : 'light';

  const toggleTheme = () => {
    if (isBrowser()) {
      window.localStorage.setItem('theme', oppositeTheme);
    }
    setTheme(oppositeTheme);
  };

  useEffect(() => {
    const localTheme = isBrowser() && window.localStorage.getItem('theme');
    if (localTheme && localTheme !== theme) {
      setTheme(localTheme);
    }
    sethasMounted(true);
  }, []);

  return [theme, oppositeTheme, toggleTheme, hasMounted];
};

export default useDarkMode;
