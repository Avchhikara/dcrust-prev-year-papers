const mongoose = require("mongoose");

const searchLogSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("SearchLog", searchLogSchema);
