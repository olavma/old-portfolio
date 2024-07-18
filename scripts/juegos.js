// JS DE GAME.HTML

// Obtener el valor del parámetro "id" de la URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Realizar cambios en la página según el valor del ID
if (id) {
    // Hacer algo con el ID, como cargar contenido relacionado o mostrar información específica
    if (!(id == 0)) {
        LoadInfo(id);
    }
} else {
    // No se proporcionó ningún ID en la URL
    console.log('No se proporcionó ningún ID en la URL');
}

function LoadInfo(id) {
    var proyect = {};
    fetch('../files/proyectos.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                if (element.IdProyecto == id && element.Jugar) {
                    proyect = element;
                    PlayGame(proyect);
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener el archivo', error);
        })
}

function PlayGame(game){
    // Ocultamos la informacion de que no hay ningun juego y mostramos el juego mediante un iframe
    document.getElementById("nullGame").style.display = "none";
    var iframe = document.querySelector("iframe");
    iframe.style.display = "block";
    iframe.src = game.Jugar;

    // Cambiamos el titulo de la pagina por '"Juegos: " + nombre del juego' 
    document.title = "Juegos: " + game.Nombre;
}