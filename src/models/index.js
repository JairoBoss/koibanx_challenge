const mongoose = require("mongoose");
const dbConfig = require("../config/db.config.js");

mongoose.Promise = global.Promise;

const db = {
  mongoose: mongoose,
  url: dbConfig.url,
  app: require("./record.model.js")(mongoose),
  app: require("./error.model.js")(mongoose),
  app: require("./file.model.js")(mongoose),
};

module.exports = db;
