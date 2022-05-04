alert("Bienvenido al Juego. Tenes 5 intentos para adivinar el nombre de pila (Solo el nombre, sin apellido y sin acento) de un famoso. Te voy a ir dando pistas");
let personaje = "martin";
const oportunidades = 5;

alert("Pista Numero 1: Soy Argentino. Jugador de Futbol");

let intento = prompt("Ingresa el Nombre: ");
intento = intento.toLowerCase();
let i=1;

while(intento!==personaje && i<5) {

        if (i===1) {
            alert("Fallaste. Te quedan "+(5-i)+" Intentos")
            alert("Pista Numero 2: Estoy retirado. Y era goleador.")
        }

        if (i===2) {
            alert("Fallaste. Te quedan "+(5-i)+" Intentos")
            alert("Pista Numero 3: Jugué en Estudiantes de La Plata, pero soy ídolo de otro club.")
        }

        if (i===3) {
            alert("Fallaste. Te quedan "+(5-i)+" Intentos")
            alert("Pista Numero 4: Cuando me retiré, me regalaron un arco de fútbol.")
        }

        if (i===4) {
            alert("Fallaste. Te quedan "+(5-i)+" Intentos")
            alert("Ultima Pista: Terminé peleado con Riquelme")
        }

        i = i+1;

        intento = prompt("Ingresa el Nombre: ");
        intento = intento.toLowerCase();

    }

if (intento === personaje) {
    alert("Felicitaciones! Si, el personaje era Martín Palermo")
}

else {
    alert ("Lo siento, no lograste adivinar el nombre de pila del gran goleador Palermo")
}





