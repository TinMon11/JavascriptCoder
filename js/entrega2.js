/*Billetera virtual donde se pude agregar/restar saldo y consultar el saldo  */

let user = prompt("Ingrese su nombre");

alert(`Bienvenido ${user} a tu billetera virtual`);

let saldoinicial = 0;
let option = 1;

while (option !== 4) {

  let option = Number(prompt("Seleccione una opción: \n 1. AGREGAR SALDO \n 2. RETIRAR FONDOS \n 3. VER SALDO \n 4. SALIR "));

/*Si elige Agregar Saldo se consulta cuanto agregar, vemos si es un number, agregarmos al saldo y mostramos por pantalla*/

  if (option === 1) {
   agregarSaldo(saldoinicial)
  } 

 /*Si elige Retirar Saldo se consulta cuanto retira, vemos si es un number, restamos al saldo y mostramos por pantalla*/ 
  
  else if (option === 2) {
      restarSaldo(saldoinicial)
} 


  else if (option === 3) {
    alert(`Tu saldo actual es ${saldoinicial} `);
}

  else {
    alert("Gracias por haber usado la SuperBilletera");
    break;
  }
}

function agregarSaldo(saldo) {
  let montoingresado = Number(prompt("Cuanto dinero ingresas:"));

  if (!isNaN(montoingresado)) {
      saldo = saldoinicial + montoingresado;
      alert(`Se agregaron ${montoingresado} a tu billetera. \n Tu nuevo saldo es ${saldo} `);
      saldoinicial = saldo;
  } else {
      alert("No ingresaste un numero")
  } 
}

function restarSaldo(saldo) {
  let montoingresado = Number(prompt("Qué monto desea retirar:"));

  if (!isNaN(montoingresado)) {

      if (montoingresado > saldo) {
        alert(`Tu saldo actual es ${saldo}. \n No puedes retirar ${montoingresado} ya que no tienes fondos suficientes`);
      }  else {
        saldo = saldo - montoingresado;
        alert(`Se retiraron ${montoingresado} de tu billetera. \n Tu nuevo saldo es ${saldo} `);
        saldoinicial = saldo;
      }
  } else {
      alert("No ingresaste un numero")
  }
}

