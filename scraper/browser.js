const puppeteer = require('puppeteer');

//function that starts the chromium browser
const startBrowser = async () => {
  let browser;
  try {
    console.log('Opening the browser......');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--disable-setuid-sandbox'],
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    console.log('Could not create a browser instance => : ', err);
  }
  return browser;
};

module.exports = {
  startBrowser,
};
