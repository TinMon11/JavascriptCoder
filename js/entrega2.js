/*Billetera virtual donde se pude agregar/restar saldo y consultar el saldo  */

let user = prompt("Ingrese su nombre");

alert(`Bienvenido ${user} a tu billetera virtual`);

let saldo = 0;
let option = 1;


/*En el siguiente array (array de objetos) se van agregando las operaciones, con un id, tipo de operacion, monto, y saldo luego de esa operacion*/

class Registro {
  
  constructor (fecha, tipo,monto,saldo)
   { 
    this.fecha = fecha 
    this.tipo = tipo;
    this.monto = monto;
    this.saldo = saldo;
   }
}

const arrayRegistros = []

while (option !== 4) {

  let option = Number(prompt("Seleccione una opción: \n 1. AGREGAR SALDO \n 2. RETIRAR FONDOS \n 3. VER SALDO \n 4. SALIR "));

/*Si elige Agregar Saldo se consulta cuanto agregar, vemos si es un number, agregarmos al saldo y mostramos por pantalla*/

  if (option === 1) {
    let montoingresado = Number(prompt("Qué monto desea ingresar:"));
    modificarSaldo(montoingresado, option)
  } 

 /*Si elige Retirar Saldo se consulta cuanto retira, vemos si es un number, restamos al saldo y mostramos por pantalla*/ 
  
  else if (option === 2) {
      let montoingresado = Number(prompt("Qué monto desea retirar:"));
      modificarSaldo(montoingresado, option)
} 


  else if (option === 3) {
    alert(`Tu saldo actual es ${saldo} `);
}

  else {
    alert("Gracias por haber usado la SuperBilletera");
    break;
  }
}

console.log(arrayRegistros);


/*En esta funcion modificamos el saldo. Sumando o Restando, de acuerdo a la opcion que haya elegido el usuario. Le pasamos como dato el monto, y el tipo de operacion. Agrega el movimiento al array de Registros (llamando a otra funcion)*/ 

function modificarSaldo(monto, operacion) {

  if (isNaN(monto)) {
    alert("No ingresaste un numero")
  }   
      else {

      if (operacion===1) {
              saldo = saldo + monto;
              alert(`Se agregaron ${monto} a tu billetera. \n Tu nuevo saldo es ${saldo} `);
              let movimiento = "Deposito";
              agregarRegistro(movimiento, monto, saldo)
      }
      
        else if (operacion===2) {
                  if (monto > saldo) {
                  alert(`Tu saldo actual es ${saldo}. \n No puedes retirar ${monto} ya que no tienes fondos suficientes.`);
                  }  else {
                  saldo = saldo - monto;
                  alert(`Se retiraron ${monto} de tu billetera. \n Tu nuevo saldo es ${saldo} `);
                  let movimiento = "Retiro";
                  agregarRegistro(movimiento, monto, saldo);

                  }
             }
          } 
}


/*Funcion para ir agregando los registros al array correspondiente*/

function agregarRegistro(operacion, monto, saldo) {
      let hoy = new Date();
      let fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear() + ' ' + hoy.getHours() + ':' + hoy.getMinutes();
      let nuevoRegistro = new Registro(fecha, operacion,monto,saldo);
      arrayRegistros.unshift(nuevoRegistro);
}

console.log(arrayRegistros)



