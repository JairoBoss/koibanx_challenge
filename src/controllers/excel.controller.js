const xlsx = require("xlsx");
const File = require("../models/file.model");
const Error = require("../models/error.model");
const Record = require("../models/record.model");
const mongoose = require("mongoose");

exports.validar = async (req, res) => {
  try {
    const file = req.file;

    if (
      !file ||
      file.mimetype !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return res.status(400).send("Debe subir un archivo de Excel (xlsx)");
    }

    const excel = xlsx.readFile(file.path);

    const hoja1 = excel.Sheets[excel.SheetNames[0]];

    const filas = xlsx.utils.sheet_to_json(hoja1, { header: 1 });
    const noFilas = filas.length;

    if (noFilas > 20000)
      res
        .status(413)
        .json({ statusCode: 413, message: "Excel demasiado grande" });

    const fileExcel = new File({
      name: file.originalname,
      status: "pending",
    });

    await fileExcel.save();

    procesar(filas, fileExcel._id);

    res.status(201).send({
      _id: fileExcel._id,
      name: fileExcel.name,
      status: fileExcel.status,
      statusCode: 201,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ statusCode: 500, message: "Error en el servidor" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "El ID proporcionado no es válido" });
    }

    const excel = await File.findById(req.params.id);

    if (!excel) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "Excel no encontrado" });
    }

    return res.status(200).json({
      statusCode: 200,
      _id: excel._id,
      name: excel.name,
      status: excel.status,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ statusCode: 500, message: "Error en el servidor" });
  }
};

const procesar = (datos, fileId) => {
  datos.map((record, index) => {
    const isLast = index === datos.length - 1;
    const { data, error } = validarDatos(record[0], record[1], record[2]);
    if (error) {
      guardarError(index + 1, error, fileId);
    } else {
      guardarDatos(data, fileId);
    }
    if (isLast) {
      actualizarEstado(fileId);
    }
  });
};

const validarDatos = (nombre, edad, numeros) => {
  const error = {};
  numeros = numeros.split(",");

  if (typeof nombre !== "string") {
    error.name = `Name is not a string`;
  }

  if (typeof edad !== "number") {
    error.age = `Age is not a number`;
  }

  if (numeros.length > 5000) {
    error.nums = "There are more than 5000 numbers.";
  } else {
    for (let i = 0; i < numeros.length; i++) {
      const numero = Number(numeros[i]);

      if (isNaN(numero)) {
        error.nums = `NaN in position ${i + 1}`;
        break;
      }
      numeros[i] = numero;
    }
  }

  if (Object.keys(error).length >= 1) {
    return { data: null, error };
  }

  const data = {
    name: nombre,
    age: edad,
    nums: quickSort(numeros),
  };
  return { data, error: null };
};

const guardarDatos = async (data, fileId) => {
  const recordRow = new Record({
    name: data.name,
    age: data.age,
    nums: data.nums,
    fileId,
  });
  await recordRow.save();
};

const guardarError = async (noRow, error, fileId) => {
  const errorRow = new Error({
    noRow,
    description: error,
    fileId,
  });
  await errorRow.save();
};

const actualizarEstado = async (fileId) => {
  await File.findOneAndUpdate({ _id: fileId }, { status: "done" });
};

const quickSort = (nums) => {
  if (nums.length <= 1) {
    return nums;
  }

  const pivot = nums[Math.floor(nums.length / 2)];
  const left = [];
  const right = [];

  for (let i = 0; i < nums.length; i++) {
    if (i === Math.floor(nums.length / 2)) {
      continue;
    }

    if (nums[i] < pivot) {
      left.push(nums[i]);
    } else {
      right.push(nums[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
};
