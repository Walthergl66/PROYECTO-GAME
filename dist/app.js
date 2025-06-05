"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const PreguntasR_1 = __importDefault(require("./routes/PreguntasR"));
const UsuariosR_1 = __importDefault(require("./routes/UsuariosR"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || "3000", 10);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use("/Preguntas", PreguntasR_1.default);
app.use("/usuarios", UsuariosR_1.default);
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/index.html"));
});
// 🗄️ Conexión a la base de datos y arranque del servidor
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("✅ Conectado a la base de datos");
    // 🔈 Escucha en todas las interfaces (necesario para Cloud Run)
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`🚀 Servidor corriendo en http://0.0.0.0:${PORT}`);
    });
})
    .catch((err) => {
    console.error("❌ Error al conectar a la base de datos:", err);
});
