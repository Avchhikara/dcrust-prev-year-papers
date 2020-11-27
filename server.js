const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const saveMongoData = require("./controllers/saveMongoData");
const getPaper = require("./controllers/getPaper");

// Connecting with mongodb
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", async (req, res) => {
  res.send("Welcome to homepage");
});

app.get("/paper", async (req, res) => {
  const papers = await getPaper(req, res, mongoose);
  res.send(papers);
});

// For saving of exam papers
app.get("/save", async (req, res) => {
  await saveMongoData();
  res.send("Data has been written");
});

app.listen(process.env.PORT || 3000, () => console.log("App is started"));
