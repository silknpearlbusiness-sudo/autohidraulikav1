const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  await p.setViewportSize({ width: 1440, height: 900 });
  await p.goto('http://localhost:5174', { waitUntil: 'networkidle', timeout: 25000 });
  // Scroll through whole page to trigger all Reveal animations
  for (let y = 0; y < 12000; y += 400) {
    await p.evaluate((yy) => window.scrollTo(0, yy), y);
    await p.waitForTimeout(100);
  }
  await p.waitForTimeout(1200);
  // CTA band
  await p.evaluate(() => window.scrollTo(0, 4900));
  await p.waitForTimeout(600);
  await p.screenshot({ path: 'C:/Users/ilikenyash/Downloads/preview_cta_band.png' });
  // Testimonials
  await p.evaluate(() => window.scrollTo(0, 5600));
  await p.waitForTimeout(600);
  await p.screenshot({ path: 'C:/Users/ilikenyash/Downloads/preview_testimonials.png' });
  // Contact full
  await p.evaluate(() => window.scrollTo(0, 7800));
  await p.waitForTimeout(600);
  await p.screenshot({ path: 'C:/Users/ilikenyash/Downloads/preview_contact_full.png' });
  await b.close();
  console.log('done');
})();
