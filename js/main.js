
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
const mov5 = new Registro ("26-05-2022 17:20", "Retiro", 202, 300, 1400)
const mov6 = new Registro ("27-05-2022 13:08", "Deposito", 102, 800, 2200)

const arrayRegistros = [mov1,mov2,mov3,mov4,mov5, mov6];

let saldo = 2200; /*2200 es el saldo con los registros iniciales agregados manualmente en las siguientes lineas*/

let saldoTotal = document.getElementById("saldo")
saldoTotal.innerHTML =  "$ " + saldo;

/*Tomo los botones del panel para interactuar luego con DOM*/ 

let user = document.getElementById("userName")
let agregarDinero = document.getElementById("addMoneyButton")
let restarDinero = document.getElementById("withdrawMoneyButton")
let buscarFactura = document.getElementById("searchButton")
let listado = document.getElementById("viewTransactions")
let botonSalida = document.getElementById("exitButton")

/*Tomo del almacenamiento el nombre de usuario para escribirlo en el titulo de la pagina*/

let usuario = localStorage.getItem("Username")
userName.innerHTML = usuario
localStorage.clear()

/*Declaracion de funciones basicas*/

function sumarMonto () {
    let montoIngresado = document.getElementById("addValue");
    monto = Number(montoIngresado.value)
    if (monto > 0) {
        saldo = saldo + monto;
        saldoTotal.innerHTML =  "$ " + saldo;
        agregarRegistro("Deposito",monto,saldo);
    } else {
        alert("Monto Ingresado No Válido. Debe ser mayor a 0")
    }
    
    montoIngresado.value =""
    }

function restarMonto () {
    let montoIngresado = document.getElementById("withdrawMoney");
    monto = Number(montoIngresado.value);
        if (monto > saldo ) {
            alert(`Tu saldo actual es ${saldo}. \n No puedes retirar ${monto} ya que no tienes fondos suficientes.`);
        }  else if (monto < 0) {
            alert("Monto Ingresado No Válido. Debe ser mayor a 0")
        } else {
            saldo = saldo - monto;
            saldoTotal.innerHTML =  "$ " + saldo;
            agregarRegistro("Retiro",monto,saldo);
        }
        
        montoIngresado.value =""
    }


/*Interaccion con DOM*/


agregarDinero.onclick = ()=>{
    sumarMonto()
    listarRegistros(arrayRegistros);
    }

restarDinero.onclick = ()=>{
    restarMonto()
    listarRegistros(arrayRegistros);
    }

buscarFactura.onclick = ()=> {
    let filtrado = filtrarFactura()
    listarRegistros(filtrado)
    }


listado.onclick = () => {
    listarRegistros(arrayRegistros);
}

botonSalida.onclick = () => {
    hideTransactions();
}




/*Muestra el listado de REGISTROS del sistema*/

function listarRegistros(listadoRegistros)

{
   let miLista = document.getElementById("TransactionsList");
   if(!miLista)
   {
     miLista = document.createElement("table");
     miLista.setAttribute("id", "TransactionsList");
   }

   miLista.innerHTML="";

   const encabezado = document.createElement("tr");
   
   const tdFecha = document.createElement("th");
   tdFecha.innerHTML="Fecha";
   encabezado.appendChild(tdFecha);

   const tdTipo = document.createElement("th");
   tdTipo.innerHTML="Tipo";
   encabezado.appendChild(tdTipo);

   const tdFactura = document.createElement("th");
   tdFactura.innerHTML="N° Factura:";
   encabezado.appendChild(tdFactura);

   const tdMonto = document.createElement("th");
   tdMonto.innerHTML="Monto";
   encabezado.appendChild(tdMonto);

   const tdSaldo = document.createElement("th");
   tdSaldo.innerHTML="Saldo";
   encabezado.appendChild(tdSaldo);

   miLista.appendChild(encabezado);

   listadoRegistros.forEach((registro)=>{
       const nodotr = document.createElement("tr");
       let nodotd = document.createElement("td");
       nodotd.innerHTML=`${registro.fecha}`;
       nodotr.appendChild(nodotd)
       
       nodotd = document.createElement("td");
       nodotd.innerHTML=`${registro.tipo}`;
       nodotr.appendChild(nodotd);

       nodotd = document.createElement("td");
       nodotd.innerHTML=`${registro.factura}`
       nodotr.appendChild(nodotd);

       nodotd = document.createElement("td");
       nodotd.innerHTML=`${registro.monto}`
       nodotr.appendChild(nodotd);

       nodotd = document.createElement("td");
       nodotd.innerHTML=`${registro.saldo}`
       nodotr.appendChild(nodotd);

       miLista.appendChild(nodotr);
       }); 

    document.body.appendChild(miLista);

}


function filtrarFactura () {
    let buscada = document.getElementById("invoiceNumber");
    numeroFactura = Number(buscada.value)
    let facturaBuscada = arrayRegistros.filter ((fc) => fc.factura === numeroFactura);
    buscada.value = "";
    return facturaBuscada;
}

function hideTransactions() {
    let miLista = document.getElementById("TransactionsList");
    miLista.innerHTML="";
}

function agregarRegistro(operacion, monto, saldo) {
    let hoy = new Date();
    let fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear() + ' ' + hoy.getHours() + ':' + hoy.getMinutes();
    let factura = Number(prompt("Ingrese Numero de Factura:"));
    let nuevoRegistro = new Registro(fecha, operacion,factura, monto,saldo);
    arrayRegistros.unshift(nuevoRegistro);
}

