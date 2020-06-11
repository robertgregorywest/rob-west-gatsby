import React from 'react';

const ThemeScriptTag = () => {
  const codeToRunOnClient = `
  (function() { try {
    var mode = localStorage.getItem('theme');
    if (!mode) return
    document.body.classList.add(mode + '-theme');
  } catch (e) {} })();`;
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: codeToRunOnClient }}
    />
  );
};
// eslint-disable-next-line import/prefer-default-export
export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<ThemeScriptTag key="themeScript" />);
};
