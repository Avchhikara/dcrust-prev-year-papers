const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

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
  const out = [];
  for (let { url, text } of nextURLs) {
    // console.log(text);
    await page.goto(url);
    let courseAlphabets = await page.$$("button.mybtns");
    for (let index = 0; index < courseAlphabets.length; index++) {
      let courseAlphabet = courseAlphabets[index];
      await Promise.all([courseAlphabet.click(), page.waitForNavigation()]);
      const htmlStr = await page.content();
      const $ = await cheerio.load(htmlStr);
      const qPDetails = await getQPSubName($, appendHrefWith);
      // Now, decide on what to do with these quesion papers
      // Tips: Store in a DB, build UI for better querying etc
      // console.log(qPDetails);
      console.log("." + index);
      out.push(...qPDetails);
      await page.goto(url);
      courseAlphabets = await page.$$("button.mybtns");
    }
    await page.goBack();
  }

  // Writing QP details into a file
  if (!fs.existsSync("data.json"))
    await fs.writeFile("data.json", JSON.stringify(out), (err) =>
      console.log(err)
    );

  browser.close();
})();
