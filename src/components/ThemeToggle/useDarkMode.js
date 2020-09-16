import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [theme, setTheme] = useState('light');
  const [hasMounted, sethasMounted] = useState(false);

  const isBrowser = () => typeof window !== 'undefined';

  const oppositeTheme = theme === 'light' ? 'dark' : 'light';

  const setStorageAndTheme = newTheme => {
    if (isBrowser()) {
      window.localStorage.setItem('theme', newTheme);
    }
    setTheme(newTheme);
  };

  const toggleTheme = () => {
    setStorageAndTheme(oppositeTheme);
  };

  useEffect(() => {
    const localTheme = isBrowser() && window.localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme);
    } else {
      setStorageAndTheme('light');
    }
    sethasMounted(true);
  }, []);

  return [theme, oppositeTheme, toggleTheme, hasMounted];
};

export default useDarkMode;
