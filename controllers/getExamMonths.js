// This will parse the exam months from this page: https://www.dcrustedp.in/dcrustpqp.php

module.exports = ($, appendHrefWith) => {
  const out = [];
  $("td a")
    .toArray()
    .forEach((element, index) => {
      out.push({
        url: appendHrefWith + $(element).attr("href"),
        text: $(element).text(),
      });
    });
  return out;
};
