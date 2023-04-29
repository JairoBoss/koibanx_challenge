const express = require("express");
const { paginationRecord } = require("../controllers/record.controller");
const { verifyUserToken } = require("../middleware/auth");
const router = express.Router();

router.get("/:limit/:offset", verifyUserToken, paginationRecord);

router.get("/", verifyUserToken, paginationRecord);

module.exports = router;
