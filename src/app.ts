// index.ts
import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import preguntasRouter from "./routes/PreguntasR";
import usuarioRouter from "./routes/UsuariosR";
import cors from "cors";
import path from "path"

const app = express();

const PORT = Number(process.env.PORT) || 8080;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")))

app.use("/Preguntas", preguntasRouter)
app.use("/usuarios", usuarioRouter)


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
})


// 🗄️ Conexión a la base de datos y arranque del servidor
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Conectado a la base de datos");

    // 🔈 Escucha en todas las interfaces (necesario para Cloud Run)
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });

  })
  .catch((err) => {
    console.error("❌ Error al conectar a la base de datos:", err);
  });