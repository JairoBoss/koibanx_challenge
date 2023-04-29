const express = require("express");
const router = express.Router();
const multer = require("multer");
const { validar, getOne } = require("../controllers/excel.controller");
const { verifyUserToken } = require("../middleware/auth");

const upload = multer({ dest: "uploads/" });

router.post("/upload", verifyUserToken, upload.single("archivo"), validar);

router.get("/:id", verifyUserToken, getOne);

module.exports = router;
