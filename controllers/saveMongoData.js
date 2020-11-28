const Paper = require("./../model/paper");
const fs = require("fs");

module.exports = async (mongoose) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  for (let paper of data) {
    const p = new Paper(paper);
    const d = await Paper.find({ paperUrl: paper.paperUrl });
    if (d.length === 0) {
      console.log("Saving", paper);
      await p.save();
    }
  }
};
