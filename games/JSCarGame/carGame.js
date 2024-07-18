//// Declaracion de variables

// Carretera
var contenedor = document.getElementById("contenedor");

// Coche (Jugador)
var coche = new Coche(document.getElementById("coche"));

// Array de camiones
var camiones = [];
var camionesOriginal = document.getElementsByClassName("camiones");
for(let i=0;i<camionesOriginal.length;i++){
    let min = 10;
    let max = 15;
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    camiones.push(new Camion(document.getElementById("camion" + i), randomNum))
}

// Textos que se muestran en la partida
var win = document.getElementById("text0");
var lose = document.getElementById("text");
var km = document.getElementById("km");
var camionVM = document.getElementById("enemyVMax");
var camionVm = document.getElementById("enemyVMin");
var musicas = [];

// Musica
const audio = document.getElementById("music");
audio.play();
fetch('./src/music.json')
    .then((response) => response.json())
    .then((json) => {
        json.forEach(song => {
            musicas.push(song);
        })
    })
    .catch((error) => console.error(error))

document.getElementById("start").onclick = function () {
    start();
}

// Procedimiento que inicia la partida, pone todos los valores correspondientes y pinta el coche y los camiones
function start(){
    document.getElementById("loreDiv").style.display = "none";
    document.getElementById("contenedor").style.display = "block";
    var cont2 = document.getElementById("cont2");
    cont2.style.display = "block";
    km.textContent = 10110;
    camionVM.textContent = 10;
    camionVm.textContent = 10; 

    coche.pintar();
    for(let i=0;i<camiones.length;i++){
        camiones[i].pintar();
    }

    musicas.forEach(song => {
        if(song.Nombre == "Partida"){
            audio.src = song.cancion;
            audio.play(); // Hay que ponerlo en bucle
        }
    });
}

// Movemos el coche segun el movimiento del mouse
document.addEventListener("mousemove", (evento) => {
    coche.mover(evento);
});

// Todo el resto del juego, la deteccion de colisiones, el movimiento de los camiones, el cambio de velocidad, el cambio en los textos
function actualizar() {
    for(let i=0;i<camiones.length;i++){
        camiones[i].mover();
        // Si el coche detecta que ha chocado contra un camion significa que no has llegado al Mar del Olvido, por ende has perdido
        if (coche.detectarColision(camiones[i])) {
            contenedor.style.display = "none";
            lose.style.display = "block";
            coche.activo = false;

            musicas.forEach(song => {
                if(song.Nombre == "Derrota"){
                    audio.src = song.cancion;
                    audio.play();
                }
            });

            // For de camiones : camiones[i].activo
            for(let i=0;i<camiones.length;i++){
                camiones[i].activo = false;
            }
            refresh.style.display = "block";
            document.getElementById("cont2").style.display = "none";
        }

        // Si el contador de kilometros llega a 0 significa que has llegado al Mar del Olvido, por ende Victoria
        if (km.textContent == 0) {
            win.style.display = "block";
            contenedor.style.display = "none";
            coche.activo = false;

            musicas.forEach(song => {
                if(song.Nombre == "Victoria"){
                    audio.src = song.cancion;
                    audio.play();
                }
            });

            for(let i=0;i<camiones.length;i++){
                camiones[i].activo = false;
            }
            document.getElementById("cont2").style.display = "none";
        }

        if(km.textContent == 9000) { camiones[i].velocidad += 5; }
        if(km.textContent == 7000) { camiones[i].velocidad += 5; }
        if(km.textContent == 5000) { camiones[i].velocidad += 5; }
        if(km.textContent == 3000) { camiones[i].velocidad += 5; }
        if(km.textContent == 1000) { camiones[i].velocidad += 5; }
        if(km.textContent == 500) { camiones[i].velocidad += 5; }


        
    }
    km.textContent--;
    let maxV=0;
    let minV=100;
    for(let i=0;i<camiones.length;i++){
        if(maxV<camiones[i].velocidad){
            maxV = camiones[i].velocidad;
        }
        if(minV>camiones[i].velocidad){
            minV = camiones[i].velocidad;
        }
    }
    camionVM.textContent = maxV;
    camionVm.textContent = minV;

    window.requestAnimationFrame(actualizar);
}

actualizar();

// Si el jugador le da al boton de volver a intentarlo, la pagina se recargara para que todo vuelva a su posicion correspondiente
let refresh = document.getElementById('refresh');
refresh.addEventListener('click', _ => {
    location.reload();
})