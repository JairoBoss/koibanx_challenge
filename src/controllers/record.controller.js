const File = require("../models/file.model");
const Record = require("../models/record.model");
const mongoose = require("mongoose");

exports.paginationRecord = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.params;
    const { fileId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(fileId) || !fileId) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "El ID proporcionado no es válido" });
    }

    const fileFound = await File.findById(fileId);
    if (!fileFound) {
      return res.status(404).json({
        statusCode: 404,
        message: "El archivo no existe",
      });
    }

    if (fileFound.status !== "done") {
      return res.status(503).json({
        statusCode: 503,
        message: "El archivo aun se esta procesando",
      });
    }

    const data = await Record.find({ fileId })
      .sort({ createdAt: "desc" })
      .skip(parseInt(offset))
      .limit(parseInt(limit));

    const total = await Record.countDocuments({ fileId });

    return res.status(200).send({ data, total });
  } catch (error) {
    console.log(error);
    res.status(500).send({ statusCode: 500, message: "Error en el servidor" });
  }
};
