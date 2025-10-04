import React, { useEffect } from 'react';
import useDarkMode from './useDarkMode';
import './style.scss';

const ThemeToggle = () => {
  const [theme, oppositeTheme, toggleTheme, hasMounted] = useDarkMode();

  useEffect(() => {
    if (hasMounted && typeof document !== 'undefined') {
      // eslint-disable-next-line no-undef
      document.body.className = `${theme}-theme`;
    }
  }, [theme, hasMounted]);

  if (!hasMounted) {
    return <div className="toggle" />;
  }

  return (
    <div className="toggle">
      <button
        type="button"
        className="toggle__button"
        onClick={toggleTheme}
        aria-label={`Activate ${oppositeTheme} mode`}
        title={`Activate ${oppositeTheme} mode`}
      >
        <div className={`toggle__icon-${oppositeTheme}`} />
      </button>
    </div>
  );
};

export default ThemeToggle;
