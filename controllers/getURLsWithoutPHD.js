module.exports = async ($, appendHrefWith = "") => {
  //   console.log($);
  const out = [];
  $("td a")
    .toArray()
    .forEach((element, index) => {
      //   console.log($(element).text());
      const text = $(element).text();
      if (!text.includes("Ph.D"))
        out.push({
          url: appendHrefWith + $(element).attr("href"),
          text,
        });
    });
  return out;
};
