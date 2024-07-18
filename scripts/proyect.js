// JS DE PROYECTOS.HTML

const section = document.getElementById("proyectos");

fetch('../files/proyectos.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            AddProject(element);
        });

    })
    .catch(error => {
        console.error('Error al obtener el archivo JSON:', error);
    });

function AddProject(element) {
    // Creacion del articulo
    var article = document.createElement("article");
    article.classList.add("project");

    // Nombre del proyecto
    nombreProyecto(article, element);

    // Foto del proyecto
    fotoProyecto(article, element);

    // Sinopsis
    sinopsisProyecto(article, element);

    // Idiomas
    idiomasProyecto(article, element);

    // Boton de más info
    BotonMasInfo(article, element);

    // Añadimos el articulo a la seccion
    section.appendChild(article);

}

function nombreProyecto(article, element) {
    var title = document.createElement("h4");
    title.classList.add("nameProject");
    title.textContent = element.Nombre;

    article.appendChild(title);
}

function fotoProyecto(article, element) {
    var figure = document.createElement("figure");
    figure.classList.add("portada");

    var img = document.createElement("img");
    img.src = element.InfoGeneral.Foto;

    figure.appendChild(img);

    article.appendChild(figure);
}

function sinopsisProyecto(article, element) {
    var div = document.createElement("div");

    var h5 = document.createElement("h5");
    h5.textContent = "De que se trata";

    var para = document.createElement("p");
    para.classList.add("sinopsis");
    para.textContent = element.InfoGeneral.Descripcion;

    div.appendChild(h5);
    div.appendChild(para);

    article.appendChild(div);
}

function idiomasProyecto(article, element) {
    var lang = document.createElement("div");
    lang.classList.add("language");

    var h4 = document.createElement("h4");
    h4.textContent = "Idiomas disponibles";

    var h5 = document.createElement("h5");

    var span = document.createElement("span");
    span.textContent = element.InfoGeneral.Idiomas;

    h5.appendChild(span);

    lang.appendChild(h4);
    lang.appendChild(h5);

    article.appendChild(lang);
}

function BotonMasInfo(article, element) {
    var a = document.createElement("a");
    a.classList.add("btn3");
    a.href = element.Enlace + "?id=" + element.IdProyecto;
    a.textContent = "más info";

    article.appendChild(a);
}