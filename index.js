require("dotenv").config();
const express = require("express");
const db = require("./src/models");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Conectado a la base de datos!");
  })
  .catch((err) => {
    console.log(
      `Ocurrio un error al tratar de conectarlo a la base de datos! ${err}`
    );
    process.exit();
  });

app.get("/", (req, res) => {
  res.status(200).json({ statusCode: 200, message: "Challenge Koibanx" });
});

const excelRoutes = require("./src/routes/excel.routes.js");
const errorRoutes = require("./src/routes/error.routes.js");
const recordRoutes = require("./src/routes/record.routes.js");

app.use("/excel", excelRoutes);
app.use("/error", errorRoutes);
app.use("/record", recordRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ statusCode: 404, message: "Página no encontrada" });
});

let PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server en el puerto ${PORT}`);
});
