const mongoose = require("mongoose");

const RecordSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    nums: {
      type: [Number],
      required: true,
    },
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "files",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("records", RecordSchema);
