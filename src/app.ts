// index.ts
import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import preguntasRouter from "./routes/PreguntasR";
import usuarioRouter from "./routes/UsuariosR";
import cors from "cors";
import path from "path";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

// Rutas de la API
app.use("/Preguntas", preguntasRouter);
app.use("/usuarios", usuarioRouter);

// Ruta raíz (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Variables de entorno
const PORT = process.env.PORT || 4000;
const BASE_URL =`https://blue-dune-0c95ab31e.6.azurestaticapps.net`;

// Inicializar la base de datos y levantar el servidor
AppDataSource.initialize()
  .then(() => {
    console.log("Conectado a la base de datos");

    app.listen(PORT, () => {
      console.log(`Servidor backend corriendo en ${BASE_URL}`);
    });
  })
  .catch((err) => console.error("Error al conectar a la base de datos", err));
