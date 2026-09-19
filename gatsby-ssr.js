import React from 'react';

const ThemeScriptTag = () => {
  const codeToRunOnClient = `
  (function() { try {
    var mode = localStorage.getItem('theme');
    if (!mode) return
    document.body.classList.add(mode + '-theme');
  } catch (e) {} })();`;
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};
export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<ThemeScriptTag key="themeScript" />);
};
