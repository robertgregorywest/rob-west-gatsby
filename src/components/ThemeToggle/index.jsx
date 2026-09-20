import React from 'react';
import useDarkMode from './useDarkMode';
import './style.scss';

const ThemeToggle = () => {
  const [, oppositeTheme, toggleTheme] = useDarkMode();

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
