const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const app = express();

// TODO: Remove the duplicates problem, and build the UI, Use pug or handlebars for UI

const dotenv = require("dotenv");
dotenv.config();

app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

app.set("view engine", "hbs");

const saveMongoData = require("./controllers/saveMongoData");
const getPaper = require("./controllers/getPaper");

// Connecting with mongodb
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/views/home.html");
});

app.get("/papers", async (req, res) => {
  const { courseId, papers } = await getPaper(req, res, mongoose);
  res.render("papers", {
    courseId,
    papers,
  });
});

// For saving of exam papers
app.get("/save", async (req, res) => {
  await saveMongoData();
  res.send("Data has been written");
});

app.listen(process.env.PORT || 3000, () => console.log("App is started"));
