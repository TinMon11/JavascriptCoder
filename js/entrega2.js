/*Billetera virtual donde se pude agregar/restar saldo y consultar el saldo  */

let user = prompt("Ingrese su nombre");

alert(`Bienvenido ${user} a tu billetera virtual`);

let saldo = 0;
let option = 1;

while (option !== 4) {

  let option = Number(prompt("Seleccione una opción: \n 1. AGREGAR SALDO \n 2. RETIRAR FONDOS \n 3. VER SALDO \n 4. SALIR "));

/*Si elige Agregar Saldo se consulta cuanto agregar, vemos si es un number, agregarmos al saldo y mostramos por pantalla*/

  if (option === 1) {
    let monto = Number(prompt("Qué monto desea agregar:"));
    
    if (!isNaN(monto)) {

    saldo = saldo + monto;
    alert(`Se agregaron ${monto} a tu billetera. \n Tu nuevo saldo es ${saldo} `);
    }

    else {
        alert("No ingresaste un numero")
    }

  } 

 /*Si elige Retirar Saldo se consulta cuanto retira, vemos si es un number, restamos al saldo y mostramos por pantalla*/ 
  
  else if (option === 2) {
    let monto = Number(prompt("Qué monto desea retirar:"));

    if (!isNaN(monto)) {

    if (monto > saldo) {
      alert(`Tu saldo actual es ${saldo}. No puedes retirar ${monto} ya que no tienes fondos suficientes`);
    } 
  
    else {
      saldo = saldo - monto;
      alert(`Se retiraron ${monto} de tu billetera. \n Tu nuevo saldo es ${saldo} `);
    }

    }

    else {
        alert("No ingresaste un numero")
    }

} 


  else if (option === 3) {
    alert(`Tu saldo actual es ${saldo} `);
}

  else {
    alert("Gracias por haber usado la SuperBilletera");
    break;
  }
}
