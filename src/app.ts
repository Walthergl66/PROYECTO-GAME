// index.ts
import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import preguntasRouter from "./routes/PreguntasR";
import usuarioRouter from "./routes/UsuariosR";


const app = express();

app.use(express.json());
app.use("/Preguntas", preguntasRouter)
app.use("/usuarios", usuarioRouter)
// Conectar a la base de datos
AppDataSource.initialize()
  .then(() => {
    console.log("Conectado a la base de datos");

    app.listen(3000, () => {
      console.log("Servidor corriendo en http://localhost:3000");
    });
  })
  .catch((err) => console.error("Error al conectar a la base de datos", err));
