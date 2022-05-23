
let user = prompt("Ingrese su nombre");

let usuario = document.getElementById("userName");
usuario.innerText = user;

alert(`Bienvenido ${user} a tu billetera virtual`);

/*En el siguiente array (array de objetos) se van agregando las operaciones, con un id, tipo de operacion, monto, y saldo luego de esa operacion*/

class Registro {
  
    constructor (fecha, tipo,factura, monto,saldo)
     { 
      this.fecha = fecha 
      this.tipo = tipo;
      this.factura = factura;
      this.monto = monto;
      this.saldo = saldo;
     }
  }

/*Defino movimientos iniciales para no tener el array vacio cada vez que se inicia*/

const mov1 = new Registro ("25-05-2022 20:00", "Deposito", 100, 1000, 1000)
const mov2 = new Registro ("25-05-2022 20:20", "Deposito", 101, 2000, 3000)
const mov3 = new Registro ("26-05-2022 15:20", "Retiro", 200, 500, 2500)
const mov4 = new Registro ("26-05-2022 16:20", "Retiro", 201, 800, 1700)

const arrayRegistros = [mov1,mov2,mov3,mov4];

let saldo = 1700; /*1700 es el saldo con los registros iniciales agregados manualmente en las siguientes lineas*/

mostrarMenu()

function mostrarMenu()
 {
    let opcion = 0;
    
    while(opcion!==6)

    {
        opcion = Number( prompt(`Seleccione una acción:
                            1. Agregar Dinero
                            2. Retirar Dinero
                            3. Ver Saldo
                            4. Ver Movimientos
                            5. Buscar Factura
                            6. Salir`));

    switch(opcion)

        {
        case 1:
            {
            let montoingresado = Number(prompt("Qué monto desea ingresar:"));
            modificarSaldo(montoingresado, opcion);
            mostrarSaldo(saldo);
            break;
            }

    
        case 2: 
            {
            let montoingresado = Number(prompt("Qué monto desea retirar:"));
            modificarSaldo(montoingresado, opcion);
            mostrarSaldo(saldo);
            break;
            }

        case 3:
            {
            alert(`Tu saldo actual es ${saldo} `);
            break;
            }

        case 4: 
            {
            alert("Se imprime en consola (por ahora) el registro de movimientos");
            filtrarMovimientos()
            break;
            }

        case 5: 
            {   
            alert("Se imprime en consola (por ahora) el registro correspondiente a esa factura");
            buscarFactura();
            break;
            }

        case 6: 
            {   
            alert("Gracias por haber usado la SuperBilletera");
            break;
            }

        default:
            {
            alert("Opcion Invalida. Elija otra opción");
            }
        }
    }

}

/*En esta funcion modificamos el saldo. Sumando o Restando, de acuerdo a la opcion que haya elegido el usuario. Le pasamos como dato el monto, y el tipo de operacion. Agrega el movimiento al array de Registros (llamando a otra funcion)*/ 


function modificarSaldo(monto, operacion) {

    if (isNaN(monto)) {
      alert("No ingresaste un numero")
    }   
        else {

        let factura = Number(prompt("Ingrese el N° de Factura de su Cobro/Gasto:"));

        if (operacion===1) {
                saldo = saldo + monto;
                alert(`Se agregaron ${monto} a tu billetera. \n Tu nuevo saldo es ${saldo} `);
                let movimiento = "Deposito";
                agregarRegistro(movimiento, factura, monto, saldo)
                }
        
          else if (operacion===2) {
                    if (monto > saldo) {
                    alert(`Tu saldo actual es ${saldo}. \n No puedes retirar ${monto} ya que no tienes fondos suficientes.`);
                    }  else {
                    saldo = saldo - monto;
                    alert(`Se retiraron ${monto} de tu billetera. \n Tu nuevo saldo es ${saldo} `);
                    let movimiento = "Retiro";
                    agregarRegistro(movimiento, factura, monto, saldo);
                    }   
                }   
            }  
  }


  /*Funcion para ir agregando los registros al array correspondiente*/
  
  function agregarRegistro(operacion, factura, monto, saldo) {
        let hoy = new Date();
        let fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear() + ' ' + hoy.getHours() + ':' + hoy.getMinutes();
        let nuevoRegistro = new Registro(fecha, operacion,factura, monto,saldo);
        arrayRegistros.unshift(nuevoRegistro);
  }


/*Funcion para filtrar el array por movimiento (Deposito-Retiro-Todo)*/

function filtrarMovimientos() {

let filtro = Number(prompt(`Que movimientos desea filtrar:
                     1 - Depositos
                     2 - Retiros 
                     3 - Todos`))

if (filtro === 1 ) {filtro = "Deposito"} 
    else if (filtro === 2) {filtro = "Retiro"} 
        else {filtro = ""}

let arrayFiltrado = arrayRegistros.filter(movimiento => movimiento.tipo.includes(filtro))

console.log("Estos son los movimientos:")
console.log(arrayFiltrado);

}

/*Funcion para buscar por N° de Factura*/

function buscarFactura() {

let buscada = Number(prompt("Ingrese el numero de factura que desea buscar:"));

if (isNaN(buscada))
 {
    alert("No ingresaste un numero") 
 } else 
    { 
    let facturaBuscada = arrayRegistros.find ((fc) => fc.factura === buscada);
    console.log(facturaBuscada);
    }

}



function mostrarSaldo(saldo) 
    {
        let nuevoSaldo = document.getElementById("saldo")
        nuevoSaldo.innerText = saldo;
    }