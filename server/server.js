const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Data = require("./data");
const { serverPort, dataBase } = require("./config");
const app = express();

const log = require("morgan");

mongoose.connect(dataBase, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Database connection error:"));
db.once("open", () => console.log("Successfully connected to the Database."));

app.use(cors());
app.use(log("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/create", (req, res) => {
  const shortId = Math.random()
    .toString(36)
    .substring(2, 8);

  const data = new Data({
    shortId: shortId,
    url: req.body.url
  });

  data
    .save()
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));

  res.status(201).json({
    body: data
  });
});

app.get("/:shortId", (req, res) => {
  Data.findOne({ shortId: req.params.shortId })
    .then(doc => {
      console.log(doc);
      res.status(200).redirect(doc.url);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

app.listen(serverPort, () =>
  console.log(`Server listening on port: ${serverPort}`)
);
