import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'theme';
const CHANGE_EVENT = 'themechange';
const DARK_QUERY = '(prefers-color-scheme: dark)';

export type Theme = 'light' | 'dark';

const OPPOSITE_THEME: Record<Theme, Theme> = { light: 'dark', dark: 'light' };
const THEME_CLASS: Record<Theme, string> = {
  light: 'light-theme',
  dark: 'dark-theme',
};

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
  document.body.classList.remove(...Object.values(THEME_CLASS));
  document.body.classList.add(THEME_CLASS[theme]);
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
  const oppositeTheme = OPPOSITE_THEME[theme];

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
