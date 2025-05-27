import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../models/usuarios";
import bcrypt from "bcryptjs";

const router = Router();

// Registro
router.post("/", async (req, res) => {
  const { nombre, email, password } = req.body;

  const repo = AppDataSource.getRepository(Usuario);
  const existente = await repo.findOne({ where: { email } });

  if (existente) return res.status(400).json({ mensaje: "Correo ya registrado" });

  const hashed = await bcrypt.hash(password, 10);
  const nuevo = repo.create({ nombre, email, password: hashed });
  await repo.save(nuevo);

  res.status(201).json({ mensaje: "Registrado con éxito" });
});

// Login
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const repo = AppDataSource.getRepository(Usuario);
  const usuario = await repo.findOne({ where: { email } });

  if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

  const valido = await bcrypt.compare(password, usuario.password);
  if (!valido) return res.status(401).json({ mensaje: "Contraseña incorrecta" });

  const { password: _, ...resto } = usuario;
  res.status(200).json({ mensaje: "Bienvenido", usuario: resto });
});

export default router;
