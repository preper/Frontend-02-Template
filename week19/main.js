const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const page = await browser.newPage();
  await page.goto('https://www.npmjs.com/');
  const img = await page.$$('a')
  console.log(img)
})();
