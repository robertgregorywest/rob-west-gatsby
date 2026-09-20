import fs from 'node:fs';
import path from 'node:path';
import { test as base, expect, type Page } from '@playwright/test';

const articlesDir = path.join(__dirname, '..', 'public', 'articles');

/** Slug of a built article page that contains highlighted code. */
export const findArticleWithCode = (): string => {
  const slug = fs
    .readdirSync(articlesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== 'page')
    .map((entry) => entry.name)
    .find((name) =>
      fs
        .readFileSync(path.join(articlesDir, name, 'index.html'), 'utf8')
        .includes('<span class="hljs-')
    );
  if (!slug) throw new Error('No built article contains a code block');
  return slug;
};

/**
 * `test` with a `consoleProblems` fixture that collects console errors,
 * console warnings and uncaught page errors. Third-party analytics requests
 * are stubbed with an empty response so the run is hermetic.
 */
export const test = base.extend<{ consoleProblems: string[] }>({
  consoleProblems: async ({ page }, provide) => {
    const problems: string[] = [];
    await page.route(/google(tagmanager|-analytics)\.com/, (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/javascript',
        body: '',
      })
    );
    page.on('console', (message) => {
      if (message.type() === 'error' || message.type() === 'warning') {
        problems.push(`[${message.type()}] ${message.text()}`);
      }
    });
    page.on('pageerror', (error) =>
      problems.push(`[pageerror] ${error.message}`)
    );
    await provide(problems);
  },
});

export { expect };

/** Waits for hydration, then asserts nothing was logged to the console. */
export const expectCleanConsole = async (page: Page, problems: string[]) => {
  await page.waitForLoadState('networkidle');
  expect(problems).toEqual([]);
};

export const brokenImages = (page: Page) =>
  page.evaluate(() =>
    [...document.images]
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.src)
  );
