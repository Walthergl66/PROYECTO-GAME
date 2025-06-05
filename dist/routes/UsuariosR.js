"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_source_1 = require("../data-source");
const Usuarios_1 = require("../models/Usuarios");
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuarioRouter = (0, express_1.Router)();
// Obtener todos los usuarios (opcional)
usuarioRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield data_source_1.AppDataSource.getRepository(Usuarios_1.Usuario).find();
        res.json(usuarios);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios." });
    }
}));
// Crear un nuevo usuario
usuarioRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, email, password } = req.body;
        // Validar datos
        if (!nombre || !email || !password) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }
        if (password.length < 8) {
            return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres." });
        }
        // Verificar si el correo ya está registrado
        const existeUsuario = yield data_source_1.AppDataSource.getRepository(Usuarios_1.Usuario).findOneBy({ email });
        if (existeUsuario) {
            return res.status(400).json({ error: "El correo ya está registrado." });
        }
        // Encriptar la contraseña
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Crear usuario
        const nuevoUsuario = data_source_1.AppDataSource.getRepository(Usuarios_1.Usuario).create({
            nombre,
            email,
            password: hashedPassword
        });
        // Guardar en la base de datos
        yield data_source_1.AppDataSource.getRepository(Usuarios_1.Usuario).save(nuevoUsuario);
        res.status(201).json({ message: "Usuario creado con éxito." });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el usuario." });
    }
}));
usuarioRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validar datos
        if (!email || !password) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }
        // Buscar al usuario
        const usuario = yield data_source_1.AppDataSource.getRepository(Usuarios_1.Usuario).findOneBy({ email });
        if (!usuario) {
            return res.status(400).json({ error: "Correo o contraseña incorrectos." });
        }
        // Comparar contraseñas
        const passwordValido = yield bcrypt_1.default.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(400).json({ error: "Correo o contraseña incorrectos." });
        }
        // Éxito
        res.json({ message: "Login exitoso.", usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al iniciar sesión." });
    }
}));
exports.default = usuarioRouter;
