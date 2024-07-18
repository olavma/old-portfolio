// Codigo Konami
const codigoKonami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a", "Enter"];

// Define una variable para rastrear la posición actual del usuario en la secuencia
let posicion = 0;

// Agrega un controlador de eventos de teclado para detectar la secuencia del código Konami
document.addEventListener("keydown", function(event) {
  // Obtiene la tecla presionada
  const tecla = event.key;

  // Verifica si la tecla presionada coincide con la posición actual en la secuencia
  if (tecla === codigoKonami[posicion]) {
    // Avanza a la siguiente posición en la secuencia
    posicion++;

    // Verifica si el usuario ha completado la secuencia del código Konami
    if (posicion === codigoKonami.length) {
      // Ejecuta la acción del código Konami aquí
      alert("¡Código Konami detectado!");
      window.location.href = "https://www.google.es";

      // Reinicia la posición del usuario en la secuencia
      posicion = 0;
    }
  } else {
    // Si la tecla presionada no coincide con la posición actual en la secuencia, reinicia la posición del usuario
    posicion = 0;
  }
});
