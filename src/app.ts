// index.ts
import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import preguntasRouter from "./routes/PreguntasR";
import usuarioRouter from "./routes/UsuariosR";
import cors from "cors";
import path from "path"

const app = express();


app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")))

app.use("/Preguntas", preguntasRouter)
app.use("/usuarios", usuarioRouter)


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
})



// Conectar a la base de datos

const PORT = parseInt(process.env.PORT || "3000", 10); // <- aquí

AppDataSource.initialize()
  .then(() => {
    console.log("Conectado a la base de datos");

    app.listen(PORT, () => { // <- y aquí
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Error al conectar a la base de datos", err));
