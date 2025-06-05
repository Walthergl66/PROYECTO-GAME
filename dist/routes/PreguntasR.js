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
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = require("express");
const data_source_1 = require("../data-source");
const Preguntas_1 = require("../models/Preguntas");
const preguntasRouter = (0, express_1.Router)();
preguntasRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const preguntas = yield data_source_1.AppDataSource.getRepository(Preguntas_1.Preguntas).find();
        res.json(preguntas);
    }
    catch (error) {
        console.error(error); // Muestra error en consola
        res.status(500).json({ error: "Error al obtener preguntas" }); // Envía mensaje al frontend
    }
}));
//Crear un pregunta
preguntasRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { texto, opcionA, opcionB, opcionC, opcionD, respuestaCorrecta } = req.body;
        const nuevaPregunta = data_source_1.AppDataSource.getRepository(Preguntas_1.Preguntas).create({
            texto,
            opcionA,
            opcionB,
            opcionC,
            opcionD,
            respuestaCorrecta,
        });
        yield data_source_1.AppDataSource.getRepository(Preguntas_1.Preguntas).save(nuevaPregunta);
        res.status(201).json(nuevaPregunta);
    }
    catch (error) {
        res.status(500).json({ error: "Error al crear la pregunta" });
    }
}));
// Actualizar una pregunta por ID
preguntasRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { texto, opcionA, opcionB, opcionC, opcionD, respuestaCorrecta } = req.body;
    try {
        const repo = data_source_1.AppDataSource.getRepository(Preguntas_1.Preguntas);
        const pregunta = yield repo.findOneBy({ id: Number(id) });
        if (!pregunta) {
            return res.status(404).json({ error: "Pregunta no encontrada" });
        }
        // Actualizar campos
        pregunta.texto = texto !== null && texto !== void 0 ? texto : pregunta.texto;
        pregunta.opcionA = opcionA !== null && opcionA !== void 0 ? opcionA : pregunta.opcionA;
        pregunta.opcionB = opcionB !== null && opcionB !== void 0 ? opcionB : pregunta.opcionB;
        pregunta.opcionC = opcionC !== null && opcionC !== void 0 ? opcionC : pregunta.opcionC;
        pregunta.opcionD = opcionD !== null && opcionD !== void 0 ? opcionD : pregunta.opcionD;
        pregunta.respuestaCorrecta = respuestaCorrecta !== null && respuestaCorrecta !== void 0 ? respuestaCorrecta : pregunta.respuestaCorrecta;
        yield repo.save(pregunta);
        res.json(pregunta);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar la pregunta" });
    }
}));
// Eliminar una pregunta por ID
preguntasRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const repo = data_source_1.AppDataSource.getRepository(Preguntas_1.Preguntas);
        const pregunta = yield repo.findOneBy({ id: Number(id) });
        if (!pregunta) {
            return res.status(404).json({ error: "Pregunta no encontrada" });
        }
        yield repo.remove(pregunta);
        res.json({ message: "Pregunta eliminada correctamente" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar la pregunta" });
    }
}));
exports.default = preguntasRouter;
