const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    shortId: String,
    url: String
  },
  { timestamps: false }
);

module.exports = mongoose.model("Data", DataSchema);
