import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'theme';
const CHANGE_EVENT = 'themechange';
const DARK_QUERY = '(prefers-color-scheme: dark)';

type Theme = 'light' | 'dark';

const readStoredTheme = (): Theme | null => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'dark' || stored === 'light' ? stored : null;
  } catch {
    return null;
  }
};

const getSnapshot = (): Theme =>
  readStoredTheme() ??
  (window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light');

const getServerSnapshot = (): Theme => 'light';

const applyTheme = () => {
  const theme = getSnapshot();
  document.body.classList.remove('light-theme', 'dark-theme');
  document.body.classList.add(`${theme}-theme`);
};

const subscribe = (callback: () => void) => {
  const mediaQuery = window.matchMedia(DARK_QUERY);
  const onChange = () => {
    applyTheme();
    callback();
  };
  applyTheme();
  window.addEventListener('storage', onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  mediaQuery.addEventListener('change', onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
    mediaQuery.removeEventListener('change', onChange);
  };
};

const useDarkMode = () => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const oppositeTheme: Theme = theme === 'light' ? 'dark' : 'light';

  const toggleTheme = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, oppositeTheme);
    } catch {
      // Storage unavailable; the theme still changes for this session below
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return [theme, oppositeTheme, toggleTheme] as const;
};

export default useDarkMode;
