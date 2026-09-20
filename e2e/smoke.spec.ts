import {
  brokenImages,
  expect,
  expectCleanConsole,
  findArticleWithCode,
  test,
} from './helpers';

test.describe('pages load cleanly', () => {
  const staticPages = [
    { path: '/', heading: /./ },
    { path: '/articles/', heading: /./ },
    { path: '/articles/page/1', heading: /./ },
    { path: '/about/', heading: /./ },
    { path: '/philosophy/', heading: /./ },
  ];

  for (const { path, heading } of staticPages) {
    test(path, async ({ page, consoleProblems }) => {
      await page.goto(path);
      await expect(page.getByRole('heading').first()).toHaveText(heading);
      await expect(page.locator('main, [role=main], body')).toBeVisible();
      expect(await brokenImages(page)).toEqual([]);
      await expectCleanConsole(page, consoleProblems);
    });
  }

  test('an article renders with highlighted code', async ({
    page,
    consoleProblems,
  }) => {
    await page.goto(`/articles/${findArticleWithCode()}/`);
    await expect(page.locator('h1').first()).not.toBeEmpty();
    await expect(page.locator('pre code [class*=hljs-]').first()).toBeVisible();
    expect(await brokenImages(page)).toEqual([]);
    await expectCleanConsole(page, consoleProblems);
  });

  test('a tag page renders, reached from an article', async ({
    page,
    consoleProblems,
  }) => {
    await page.goto(`/articles/${findArticleWithCode()}/`);
    await page.locator('a[href^="/tag/"]').first().click();
    await expect(page).toHaveURL(/\/tag\//);
    await expect(page.locator('h1, h2').first()).toBeVisible();
    await expectCleanConsole(page, consoleProblems);
  });

  test('a missing page shows the 404 page', async ({ page }) => {
    const response = await page.goto('/nonexistent/');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading').first()).toBeVisible();
  });
});

test.describe('navigation', () => {
  test('article list links to articles and paginates', async ({ page }) => {
    await page.goto('/articles/');
    const first = page.locator('.featured-article__title-link').first();
    await expect(first).toBeVisible();
    await first.click();
    await expect(page).toHaveURL(/\/articles\/[^/]+\/$/);

    await page.goto('/articles/');
    await page.locator('a[rel=next]').click();
    await expect(page).toHaveURL(/\/articles\/page\/1\/?$/);
  });
});

test.describe('theme toggle', () => {
  test('switches to dark and persists across reload', async ({
    page,
    consoleProblems,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'Activate dark mode' }).click();

    await expect(page.locator('body')).toHaveClass(/dark-theme/);
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe(
      'dark'
    );

    await page.reload();
    await expect(page.locator('body')).toHaveClass(/dark-theme/);
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe(
      'dark'
    );
    await expect(
      page.getByRole('button', { name: 'Activate light mode' })
    ).toBeVisible();
    await expectCleanConsole(page, consoleProblems);
  });
});
