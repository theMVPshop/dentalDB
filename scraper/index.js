const browser = require('./browser');
const pageController = require('./pageController');

//Start the browser and create a browser instance
let browserInstance = browser.startBrowser();

// Pass the browser instance to the scraper controller
pageController(browserInstance);
