const mongoose = require("mongoose");

const FileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending", // processing done
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("files", FileSchema);
