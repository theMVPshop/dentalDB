const pageScraper = require('./pageScraper');
const fs = require('fs');

const scrapeAll = async (browserInstance) => {
  let browser;
  //creates browser instance and calls object method in pagescraper
  try {
    browser = await browserInstance;
    let scrapedData;
    scrapedData = await pageScraper.scraper(browser);
    await browser.close();
    //writes scraped data to json file
    fs.writeFile('101-120.json', JSON.stringify(scrapedData), 'utf8', function (
      err
    ) {
      if (err) {
        return console.log(err);
      }
      console.log(scrapedData);
    });
  } catch (err) {
    console.log('Could not resolve the browser instance => ', err);
  }
};

module.exports = (browserInstance) => scrapeAll(browserInstance);
