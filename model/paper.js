const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
  },
  paperUrl: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Paper", paperSchema);
