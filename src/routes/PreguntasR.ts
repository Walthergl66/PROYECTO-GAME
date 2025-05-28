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

// Actualizar una pregunta por ID
preguntasRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { texto, opcionA, opcionB, opcionC, opcionD, respuestaCorrecta } = req.body;

  try {
    const repo = AppDataSource.getRepository(Preguntas);
    const pregunta = await repo.findOneBy({ id: Number(id) });

    if (!pregunta) {
      return res.status(404).json({ error: "Pregunta no encontrada" });
    }

    // Actualizar campos
    pregunta.texto = texto ?? pregunta.texto;
    pregunta.opcionA = opcionA ?? pregunta.opcionA;
    pregunta.opcionB = opcionB ?? pregunta.opcionB;
    pregunta.opcionC = opcionC ?? pregunta.opcionC;
    pregunta.opcionD = opcionD ?? pregunta.opcionD;
    pregunta.respuestaCorrecta = respuestaCorrecta ?? pregunta.respuestaCorrecta;

    await repo.save(pregunta);

    res.json(pregunta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la pregunta" });
  }
});


// Eliminar una pregunta por ID
preguntasRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const repo = AppDataSource.getRepository(Preguntas);
    const pregunta = await repo.findOneBy({ id: Number(id) });

    if (!pregunta) {
      return res.status(404).json({ error: "Pregunta no encontrada" });
    }

    await repo.remove(pregunta);
    res.json({ message: "Pregunta eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la pregunta" });
  }
});



export default preguntasRouter;

