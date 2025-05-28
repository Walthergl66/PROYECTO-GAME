// src/index.ts
import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Preguntas } from "../models/Preguntas";

const preguntasRouter = Router();

preguntasRouter.get("/", async (req, res) => {
    try {
        const preguntas = await AppDataSource.getRepository(Preguntas).find();
        res.json(preguntas);
    } catch (error) {
        res.status
    }
});

//Crear un pregunta
preguntasRouter.post("/", async (req, res) => {
  try {
    const { texto, opcionA, opcionB, opcionC, opcionD, respuestaCorrecta } = req.body;

    const nuevaPregunta = AppDataSource.getRepository(Preguntas).create({
      texto,
      opcionA,
      opcionB,
      opcionC,
      opcionD,
      respuestaCorrecta,
    });

    await AppDataSource.getRepository(Preguntas).save(nuevaPregunta);

    res.status(201).json(nuevaPregunta);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la pregunta" });
  }
});

export default preguntasRouter;

