import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import './style.scss'

const ThemeToggle = () => {
  const defaultThemeState = (typeof window !== 'undefined' && window.localStorage.getItem('theme')) ||  'light';
  const [theme, setTheme] = useState(defaultThemeState);
  const oppositeTheme = theme === 'light' ? 'dark' : 'light';

  const setMode = mode => {
    typeof window !== 'undefined' && window.localStorage.setItem('theme', mode)
    setTheme(mode)
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark')
    } else {
      setMode('light')
    }
  };

  return (
    <>
      <Helmet>
        <body className={`${theme}-theme`}/>
      </Helmet>
      <div className="toggle">
        <button onClick={toggleTheme} aria-label={`Activate ${oppositeTheme} mode`} title={`Activate ${oppositeTheme} mode`} className={`toggle__button-${oppositeTheme}`}>
          <div className={`toggle__icon-${oppositeTheme}`}></div>
        </button>
      </div>
    </>
  )
}

export default ThemeToggle