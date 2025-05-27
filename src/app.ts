// index.ts
import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import Router from "./routes/PreguntasR";

const app = express();
app.use(express.json());

// Conectar a la base de datos
AppDataSource.initialize()
  .then(() => {
    console.log("Conectado a la base de datos");
    app.use("/preguntas", Router);

    app.listen(3000, () => {
      console.log("Servidor corriendo en http://localhost:3000");
    });
  })
  .catch((err) => console.error("Error al conectar a la base de datos", err));
