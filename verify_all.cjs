const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  
  // Wait for preloader to finish
  await new Promise(r => setTimeout(r, 3500));

  // 1. Desktop Hero & Navbar check
  await page.screenshot({ path: 'public/test-screens/desktop_hero_nav.png' });

  // 2. Ingredients Section
  await page.evaluate(() => document.getElementById('ingredients').scrollIntoView());
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'public/test-screens/desktop_ingredients.png' });

  // Click Golden Turmeric
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Golden Turmeric')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'public/test-screens/desktop_ingredients_turmeric.png' });

  // 3. Product Showcase - Pouch
  await page.evaluate(() => document.getElementById('product').scrollIntoView());
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'public/test-screens/desktop_product_pouch.png' });

  // Click Box
  const btnsBox = await page.$$('button');
  for (const b of btnsBox) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Cardboard Box')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/test-screens/desktop_product_box.png' });

  // Click Kraft
  const btnsKraft = await page.$$('button');
  for (const b of btnsKraft) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Eco Kraft Pouch')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/test-screens/desktop_product_kraft.png' });

  // Click View Packaging
  const btnsModal = await page.$$('button');
  for (const b of btnsModal) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('View Packaging')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/test-screens/desktop_modal_view.png' });

  await browser.close();
  console.log('All detailed screenshots captured successfully!');
})();

