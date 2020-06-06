import React from 'react';
import { Helmet } from 'react-helmet';
import { useDarkMode } from './useDarkMode';
import './style.scss';

const ThemeToggle = () => {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const oppositeTheme = theme === 'light' ? 'dark' : 'light';

  if (!componentMounted) {
    return <div/>
  };

  return (
    <>
      <Helmet>
        <body className={`${theme}-theme`}/>
      </Helmet>
      <div className="toggle">
        <button className={`toggle__button`} onClick={toggleTheme} aria-label={`Activate ${oppositeTheme} mode`} title={`Activate ${oppositeTheme} mode`}>
          <div className={`toggle__icon-${oppositeTheme}`}></div>
        </button>
      </div>
    </>
  )
}

export default ThemeToggle