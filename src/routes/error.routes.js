const express = require("express");
const { paginationError } = require("../controllers/error.controller");
const { verifyUserToken } = require("../middleware/auth");
const router = express.Router();

router.get("/:limit/:offset", verifyUserToken, paginationError);

router.get("/", verifyUserToken, paginationError);

module.exports = router;
