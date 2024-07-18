// JS DE PROYECTO.HTML

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
                if (element.IdProyecto == id) {
                    proyect = element;
                    InfoProyect(proyect);
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener el archivo', error);
        })
}

function InfoProyect(proyect) {
    // Nombre
    var title = document.getElementsByTagName("h4")[0];
    title.textContent = proyect.Nombre;

    // Portada
    var img = document.getElementsByTagName("img")[0];
    img.src = proyect.InfoGeneral.Foto;

    // Sinopsis
    var sinopsisArt = document.querySelector('.sinopsis');
    var sinopsisP = sinopsisArt.querySelector('p');
    sinopsisP.textContent = proyect.InfoGeneral.Descripcion;

    // Idiomas
    var lang = document.getElementById("idioma");
    lang.textContent = proyect.InfoGeneral.Idiomas;

    // Autor
    var author = document.getElementById("author");
    author.textContent = proyect.autor;

    // Boton + info
    var btn = document.querySelectorAll('.btn3');
    btn[0].href = proyect.EnlaceProyecto;

    // Boton Jugar
    if(proyect.Jugar){
        btn[1].href = proyect.juego + "?id=" + proyect.IdProyecto;
        btn[1].style.display = "block";
    }

    // Cambiamos el <title>
    document.title = proyect.Nombre;

    // PDF
    fetch(proyect.Informacion)
        .then(response => {
            if (response.status === 200) {
                var emb = document.getElementsByTagName("embed");
                emb[0].src = proyect.Informacion;
            } else {
                console.error('El archivo no existe.');
            }
        })
        .catch(error => {
            console.error('Error al verificar la existencia del archivo:', error);
        });
}