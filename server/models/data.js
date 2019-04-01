const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    shortId: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: false }
);

module.exports = mongoose.model("Data", DataSchema);
