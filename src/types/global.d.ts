declare module '*.scss';
declare module '*.css';
declare module '*.svg';
declare module '*.png';

declare module 'highlightjs-cshtml-razor' {
  const language: import('highlight.js').LanguageFn;
  export default language;
}
