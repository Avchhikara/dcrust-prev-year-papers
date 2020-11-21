const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const getWebPage = require("./controllers/getWebPage");
const getExams = require("./controllers/getExamMonths");
const getURLsWithoutPHD = require("./controllers/getURLsWithoutPHD");
const readQPSubNames = require("./controllers/getQPSubName");
const getQPSubName = require("./controllers/getQPSubName");

const url = "https://www.dcrustedp.in/dcrustpqp.php";

(async () => {
  const appendHrefWith = "https://www.dcrustedp.in/";
  const browser = await puppeteer.launch({ headless: true });
  let page = await browser.newPage();
  await page.goto(url);
  const htmlString = await page.content();
  const $ = await cheerio.load(htmlString);
  const nextURLs = await getURLsWithoutPHD($, appendHrefWith);
  for (let { url, text } of nextURLs) {
    await page.goto(url);
    let courseAlphabets = await page.$$("button.mybtns");
    for (let index = 0; index < courseAlphabets.length; index++) {
      courseAlphabet = courseAlphabets[index];
      await Promise.all([courseAlphabet.click(), page.waitForNavigation()]);
      const htmlStr = await page.content();
      const $ = await cheerio.load(htmlStr);
      const qPDetails = await getQPSubName($, appendHrefWith);
      // Now, decide on what to do with these quesion papers
      // Tips: Store in a DB, build UI for better querying etc
      console.log(qPDetails);

      await page.goto(url);
      courseAlphabets = await page.$$("button.mybtns");
    }
    await page.goBack();
  }

  browser.close();
})();
