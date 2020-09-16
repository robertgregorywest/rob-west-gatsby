import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [theme, setTheme] = useState('light');
  const [componentMounted, setComponentMounted] = useState(false);

  const isBrowser = () => typeof window !== 'undefined';

  const setMode = mode => {
    if (isBrowser()) {
      window.localStorage.setItem('theme', mode);
    }
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  const oppositeTheme = theme === 'light' ? 'dark' : 'light';

  useEffect(() => {
    const localTheme = isBrowser() && window.localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme);
    } else {
      setMode('light');
    }
    setComponentMounted(true);
  }, []);

  return [theme, oppositeTheme, toggleTheme, componentMounted];
};

export default useDarkMode;
