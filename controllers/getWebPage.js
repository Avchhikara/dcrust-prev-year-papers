module.exports = async (page, url) => {
  const htmlString = await page.content();
  const out = await cheerio.load(htmlString);
  return out;
};
