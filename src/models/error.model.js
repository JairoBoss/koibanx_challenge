const mongoose = require("mongoose");

const ErrorSchema = mongoose.Schema(
  {
    noRow: {
      type: Number,
      required: true,
    },
    description: {
      type: Object,
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

module.exports = mongoose.model("errors", ErrorSchema);
