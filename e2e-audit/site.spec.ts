import { test, expect } from '@playwright/test';
const routes = ['/', '/about/', '/services/', '/portfolio/', '/contact/', '/blog/', '/portfolio/edgar-sec-parser/', '/portfolio/financial-data-pipeline/', '/portfolio/mean-reversion-ou/', '/portfolio/moving-average-bot/', '/privacy-policy/', '/terms-of-service/', '/tools/strategy-validation/'];
for (const route of routes) {
  test('route and render ' + route, async ({page}) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    const response = await page.goto(route, {waitUntil:'domcontentloaded'});
    expect(response?.ok()).toBe(true);
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('body')).not.toContainText('Application error:');
    await page.waitForTimeout(800);
    expect(errors).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 5)).toBe(true);
  });
}
test('strategy assessment, reset and download', async ({page}) => {
  await page.goto('/tools/strategy-validation/');
  await expect(page.locator('fieldset')).toHaveCount(14);
  await page.getByRole('button', {name:'View assessment'}).click();
  await expect(page.getByRole('heading', {name:'INSUFFICIENT EVIDENCE'})).toBeVisible();
  for (const radio of await page.locator('input[value="yes"]').all()) await radio.check();
  await page.getByRole('button', {name:'View assessment'}).click();
  await expect(page.getByRole('heading', {name:'DECLARED CONTROLS COMPLETE'})).toBeVisible();
  const download = page.waitForEvent('download');
  await page.getByRole('button', {name:'Download text report'}).click();
  expect((await download).suggestedFilename()).toBe('strategy-validation-report.txt');
  await page.getByRole('button', {name:'Reset', exact:true}).click();
  await expect(page.getByText('0 of 14 answered', {exact:false})).toBeVisible();
});
test('contact transport accepts provider success without sending real email', async ({page}) => {
  await page.route('https://formsubmit.co/ajax/**', route => route.fulfill({status:200,contentType:'application/json',headers:{'access-control-allow-origin':'*'},body:JSON.stringify({success:true})}));
  await page.goto('/contact/');
  await page.locator('#name').fill('Test User');
  await page.locator('#email').fill('test@example.com');
  await page.locator('#subject').fill('Technical test inquiry');
  await page.locator('#message').fill('This is a mocked browser test of the contact transport.');
  await page.locator('form').filter({has:page.locator('#message')}).locator('button[type="submit"]').click();
  await expect(page.getByText('Message sent successfully!', {exact:true})).toBeVisible();
});
test('CV and sitemap are served', async ({request}) => {
  const cv = await request.get('/downloads/quant_cv.pdf');
  expect(cv.ok()).toBe(true);
  expect((await cv.body()).subarray(0,4).toString()).toBe('%PDF');
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain('https://ajtradingsystems.com/tools/strategy-validation/');
});
