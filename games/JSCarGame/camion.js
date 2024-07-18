// Clase Camion
class Camion {
    // Constructor, pide el elemento html y un numero que es la velocidad
    constructor(elemento, v) {
        this.elemento = elemento;
        this.posicionX = contenedor.offsetWidth;
        this.velocidad = v;
        this.width = this.elemento.offsetWidth;
        this.height = this.elemento.offsetHeight;
        this.activo = true;
        elemento.style.position = "absolute";
        elemento.style.left = this.posicionX + "px";
        elemento.style.top = Math.floor(Math.random() * (contenedor.offsetHeight - this.height)) + "px";
    }

    // Si el camion esta activo se movera hacia la derecha
    mover() {
        if (!this.activo) return;
        this.posicionX -= this.velocidad;
        if (this.posicionX < -this.width) {
            this.posicionX = contenedor.offsetWidth;
            this.elemento.style.top = Math.floor(Math.random() * (contenedor.offsetHeight - this.height)) + "px";
        }
        this.elemento.style.left = this.posicionX + "px";
    }

    // Si se detecta que ha chocado contra el coche retornara un bool
    detectarColision(coche) {
        if (!this.activo) return false;
        const rect1 = this.elemento.getBoundingClientRect();
        const rect2 = coche.elemento.getBoundingClientRect();

        return (
            rect1.top < rect2.bottom &&
            rect1.bottom > rect2.top &&
            rect1.left < rect2.right &&
            rect1.right > rect2.left
        );
    }

    // Metodo que pinta el camion, le pone imagen, y el color del campo de fuerza
    pintar() {
        this.elemento.style.display = "block";
        if(this.elemento.getContext){
            var ctx2 = this.elemento.getContext("2d");
            ctx2.fillStyle = "rgb(255,0,0)";

            // Campo de fuerza del enemigo
            var centerX = this.elemento.width / 2;
            var centerY = this.elemento.height / 2;
            var radius = 150;
            ctx2.beginPath();
            ctx2.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            ctx2.fill();

            // Imagen del enemigo
            let bgImg1 = new Image();
            fetch('./src/icon.json')
            .then((response) => response.json())
            .then((json) => {
                json.forEach(icon => {
                    if(icon.Nombre == "Camion")
                    bgImg1.src = icon.imagen;
                });
            })
            bgImg1.onload = () => {
                ctx2.drawImage(bgImg1, 0, 0, 150, 100);
            }
        }
    }
}