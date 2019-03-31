const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { serverPort, dataBase } = require("../config");
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

app.listen(serverPort, () =>
  console.log(`Server listening on port: ${serverPort}`)
);
