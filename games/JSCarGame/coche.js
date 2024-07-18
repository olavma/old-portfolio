// Clase coche
class Coche {
    constructor(elemento) {
        this.elemento = elemento;
        this.posicionY = contenedor.offsetHeight / 2;
        this.activo = true;
        elemento.style.position = "absolute";
        elemento.style.top = this.posicionY + "px";
    }

    // Se mueve segun la posicion del raton
    mover(evento) {
        if (!this.activo) return;
        const posicionMouse = evento.clientY;
        const limiteSuperior = contenedor.offsetTop;
        const limiteInferior = contenedor.offsetTop + contenedor.offsetHeight - this.elemento.offsetHeight;
        if (posicionMouse >= limiteSuperior && posicionMouse <= limiteInferior) {
            this.posicionY = posicionMouse - contenedor.offsetTop;
            this.elemento.style.top = this.posicionY + "px";
        }
    }

    // Codigo para detectar que ha chocado contra un camion
    detectarColision(camion) {
        if (!this.activo) return false;
        const rect1 = this.elemento.getBoundingClientRect();
        const rect2 = camion.elemento.getBoundingClientRect();

        return (
            rect1.top < rect2.bottom &&
            rect1.bottom > rect2.top &&
            rect1.left < rect2.right &&
            rect1.right > rect2.left
        );
    }

    // Metodo que pinta el coche, le pone imagen, y el color del campo de fuerza
    pintar() {
        this.elemento.style.display = "block";
        
        
        if (this.elemento.getContext) {
            // Pintamos al jugador
            var ctx = this.elemento.getContext("2d");
            ctx.fillStyle = "rgb(0,0,255)";
            
            // Campo de fuerza del jugador
            var centerX = this.elemento.width / 2;
            var centerY = this.elemento.height / 2;
            var radius = 50;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            ctx.fill();

            // Imagen del jugador
            let bgImg = new Image();
            fetch('./src/icon.json')
            .then((response) => response.json())
            .then((json) => {
                json.forEach(icon => {
                    if(icon.Nombre == "Coche"){
                        bgImg.src = icon.imagen;
                    }
                });
            })
            bgImg.onload = () => {
                ctx.drawImage(bgImg, 10, 10, 100, 100);
            }
        }
    }
}