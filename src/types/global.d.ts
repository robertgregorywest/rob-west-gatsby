declare module '*.scss';
declare module '*.css';
declare module '*.svg';
declare module '*.png';

declare module 'highlightjs-cshtml-razor' {
  import type { LanguageFn } from 'highlight.js';
  const language: LanguageFn;
  export default language;
}
