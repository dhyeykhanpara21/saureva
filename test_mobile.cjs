const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2600));

  // Hero
  await page.screenshot({ path: 'public/test-screens/mobile_v2_hero.png' });

  // Scroll hero pinned timeline
  const heroBox = await page.evaluate(() => {
    const el = document.getElementById('hero');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: el.offsetHeight };
  });

  if (heroBox) {
    // Step 1
    await page.evaluate((y) => window.scrollTo(0, y), heroBox.top + heroBox.height * 0.28);
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: 'public/test-screens/mobile_v2_step1.png' });

    // Step 2
    await page.evaluate((y) => window.scrollTo(0, y), heroBox.top + heroBox.height * 0.55);
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: 'public/test-screens/mobile_v2_step2.png' });

    // Step 4
    await page.evaluate((y) => window.scrollTo(0, y), heroBox.top + heroBox.height * 0.92);
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: 'public/test-screens/mobile_v2_step4.png' });
  }

  // Heritage
  await page.evaluate(() => document.getElementById('heritage')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'public/test-screens/mobile_v2_heritage.png' });

  // Ingredients
  await page.evaluate(() => document.getElementById('ingredients')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'public/test-screens/mobile_v2_ingredients.png' });

  // Product
  await page.evaluate(() => document.getElementById('product')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'public/test-screens/mobile_v2_product.png' });

  // Taste
  await page.evaluate(() => document.getElementById('taste')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'public/test-screens/mobile_v2_taste.png' });

  // Mobile drawer
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 500));
  const menuBtn = await page.$('button[aria-label="Toggle navigation menu"]');
  if (menuBtn) {
    await menuBtn.click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: 'public/test-screens/mobile_v2_drawer.png' });
  }

  await browser.close();
  console.log('Mobile verification screenshots captured');
})();

