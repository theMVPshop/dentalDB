let scrapedData = [];
let state = 'TX';
const scraperObject = {
  url: `http://www.npino.org/doctor/dental-providers/dentist-122300000X?page=`,

  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);

    //loops through each page of site to be scraped
    for (let i = 101; i <= 120; i++) {
      // const temp = `http://www.npino.org/doctor/dental-providers/dentist-122300000X?page=`;
      const temp = `http://www.npino.org/doctor/dental-providers/general-practice-1223G0001X?state=TX&page=`;
      //changes url on each pass
      scraperObject.url = temp + i;
      console.log(scraperObject.url);
      //navigates to concantnated url
      await page.goto(this.url);
      // Wait for the required DOM to be rendered
      await page.waitForSelector('.npi-record');
      // Get the link to all the required names
      let urls = await page.$$eval('.fullname', (links) => {
        links = links.map((el) => el.querySelector('a').href);
        return links;
      });

      // Loop through each of those links, open a new page instance and get the relevant data from them
      let pagePromise = (link) =>
        new Promise(async (resolve, reject) => {
          let dataObj = {};
          let newPage = await browser.newPage();

          try {
            //{**name**}
            await newPage.goto(link);
            dataObj.name = await newPage.$eval(
              '.col-md-9 > h1',
              (name) => name.textContent
            );
            //{**address**}
            dataObj.street = await newPage.$eval(
              '.address',
              (text) => text.textContent
            );
            dataObj.city = await newPage.$eval('.citystate', (city) => {
              let tag = city.textContent;
              let index = tag.indexOf(`TX`);
              return tag.slice(0, index - 1);
            });
            dataObj.state = state;
            dataObj.zipCode = await newPage.$eval('.citystate', (zip) => {
              let tag = zip.textContent;
              let index = tag.indexOf('TX');
              return tag.slice(index + 3);
            });
            //{**phone}
            dataObj.phone = await newPage.$eval('.phone', (phone) =>
              phone.textContent.slice(7)
            );
            //{**fax}
            dataObj.fax = await newPage.$eval('.fax', (fax) =>
              fax.textContent.slice(5)
            );
            //{**website}
            dataObj.webSite = await newPage.$eval('.website', (site) =>
              site.textContent.slice(9)
            );
          } catch (err) {
            console.log(err);
          }

          resolve(dataObj);
          await newPage.close();
        });

      for (link in urls) {
        let currentPageData = await pagePromise(urls[link]);
        scrapedData.push(currentPageData);
        console.log(currentPageData);
      }
    }
    return scrapedData;
  },
};
module.exports = scraperObject;
