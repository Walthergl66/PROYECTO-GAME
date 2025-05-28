const API_URL = "http://localhost:3000/preguntas"; // Ajusta según tu API
let preguntas = [];
let preguntaActual = 0;
let score = 0;
let vidas = 3;

// Obtener preguntas al iniciar
async function fetchPreguntas() {
  try {
    const res = await fetch(API_URL);
    preguntas = await res.json();
    preguntas = preguntas.sort(() => Math.random() - 0.5); 
    mostrarPregunta();
  } catch (error) {
    console.error("Error al obtener preguntas:", error);
  }
}

function mostrarPregunta() {
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");

  // Verificar si el juego debe terminar
  if (vidas <= 0 || preguntas.length === 0) {
    mostrarResultadoFinal();
    return;
  }

  const pregunta = preguntas[preguntaActual];
  questionText.textContent = pregunta.texto;
  optionsContainer.innerHTML = "";

  ["opcionA", "opcionB", "opcionC", "opcionD"].forEach(opcion => {
    const btn = document.createElement("button");
    btn.textContent = pregunta[opcion];
    btn.onclick = () => responder(pregunta[opcion]);
    optionsContainer.appendChild(btn);
  });

  actualizarStatus();
}

function responder(respuesta) {
  const pregunta = preguntas[preguntaActual];

  if (respuesta === pregunta.respuestaCorrecta) {
    score += 10;
  } else {
    vidas -= 1;
  }

  preguntaActual++;

  if (preguntaActual >= preguntas.length) {
    preguntaActual = 0;
    preguntas = preguntas.sort(() => Math.random() - 0.5);
  }

  mostrarPregunta();
}

function actualizarStatus() {
  const status = document.getElementById("status");
  status.textContent = `Puntos: ${score} | Vidas: ${vidas}`;
}

// function mostrarResultadoFinal() {
//   const game = document.getElementById("game");
//   game.innerHTML = `<h2>Juego terminado</h2>
//     <p>Puntos finales: ${score}</p>
//     <button onclick="reiniciarJuego()">Jugar de nuevo</button>`;

//   // Resetear la UI
//   const status = document.getElementById("status");
//   status.textContent = `Puntos: ${score} | Vidas: ${vidas}`;
// }

// function reiniciarJuego() {
//   score = 0;
//   vidas = 3;
//   preguntaActual = 0;

//   // Restaurar el HTML inicial del juego
//   const game = document.getElementById("game");
//   game.innerHTML = `
//     <h2>Pregunta:</h2>
//     <p id="question-text"></p>
//     <div id="options-container"></div>
//   `;

//   fetchPreguntas();
//   actualizarStatus();
// }

function mostrarResultadoFinal() {
  document.getElementById("question-container").style.display = "none";
  document.getElementById("status").style.display = "none";
  const resultado = document.getElementById("resultado-container");
  resultado.style.display = "block";
  document.getElementById("puntos-finales").textContent = `Puntos finales: ${score}`;
}

function reiniciarJuego() {
  score = 0;
  vidas = 3;
  preguntaActual = 0;

  document.getElementById("resultado-container").style.display = "none";
  document.getElementById("question-container").style.display = "block";
  document.getElementById("status").style.display = "block";

  fetchPreguntas();
  actualizarStatus();
}

// Iniciar el juego
fetchPreguntas();
