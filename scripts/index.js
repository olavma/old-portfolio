function seeProyect() {
    const opcion = confirm("¿Desea ver Github o una página web?");

    if (opcion) {
        // Si el usuario hizo clic en "Aceptar", abrimos una nueva ventana con la página de Github
        window.open("https://github.com/olavma");
    } else {
        // Si el usuario hizo clic en "Cancelar", lo redirigimos a otra página web
        window.open("proyectos.html");
    }


}