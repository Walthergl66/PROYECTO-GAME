import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../models/Usuarios";
import bcrypt from "bcrypt"

const usuarioRouter = Router();

// Obtener todos los usuarios (opcional)
usuarioRouter.get("/", async (req:Request, res:Response) => {
  try {
    const usuarios = await AppDataSource.getRepository(Usuario).find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios." });
  }
});

// Crear un nuevo usuario
usuarioRouter.post("/", async (req:Request, res:Response) => {
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
    const existeUsuario = await AppDataSource.getRepository(Usuario).findOneBy({ email });
    if (existeUsuario) {
      return res.status(400).json({ error: "El correo ya está registrado." });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const nuevoUsuario = AppDataSource.getRepository(Usuario).create({
      nombre,
      email,
      password: hashedPassword
    });

    // Guardar en la base de datos
    await AppDataSource.getRepository(Usuario).save(nuevoUsuario);

    res.status(201).json({ message: "Usuario creado con éxito." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el usuario." });
  }
});

export default usuarioRouter;
