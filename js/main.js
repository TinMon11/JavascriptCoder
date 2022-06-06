
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


const mov1 = new Registro ("25-05-2022 20:00", "Add", 100, 1000, 1000)
const mov2 = new Registro ("25-05-2022 20:20", "Add", 101, 2000, 3000)
const mov3 = new Registro ("26-05-2022 15:20", "Withdraw", 200, 500, 2500)
const mov4 = new Registro ("26-05-2022 16:20", "Withdraw", 201, 800, 1700)
const mov5 = new Registro ("26-05-2022 17:20", "Withdraw", 202, 300, 1400)
const mov6 = new Registro ("27-05-2022 13:08", "Add", 102, 805, 2205)

let arrayRegistros = [mov6,mov5,mov4,mov3,mov2, mov1];

/*Guardo en memoria el array inicial*/
localStorage.setItem("Registros",JSON.stringify(arrayRegistros));
arrayRegistros = JSON.parse(localStorage.getItem("Registros"))


let saldo = 2205; /*2200 es el saldo con los registros iniciales agregados manualmente en las siguientes lineas*/

let saldoTotal = document.getElementById("saldo")
saldoTotal.innerHTML =  "$ " + saldo;

/*Tomo los botones del panel para interactuar luego con DOM*/ 

let user = document.getElementById("userName")
let agregarDinero = document.getElementById("addMoneyButton")
let restarDinero = document.getElementById("withdrawMoneyButton")
let buscarFactura = document.getElementById("searchButton")
let listado = document.getElementById("viewTransactions")
let botonSalida = document.getElementById("exitButton")

let tipoOperacion = document.getElementById("operacion")
let submit = document.getElementById("submitButton")
let seccionMensajes = document.getElementById("mensajes")
let seccionInvoice = document.getElementById("invoiceNumberForm")

/*Tomo del almacenamiento local el nombre de usuario para escribirlo en el titulo de la pagina*/

let usuario = localStorage.getItem("Username")
userName.innerHTML = usuario
localStorage.clear()

/*Declaracion de funciones basicas*/
/*Funcion para modificar el saldo, es unica, para sumar o restar depende de lo que haya selecc el usuario*/

function modificarMonto (monto,fc) {
    
    let tipo = tipoOperacion.innerHTML
    let amount = document.getElementById("amount");

    if (monto > 0) {

        if (tipo === "Withdraw") {

            monto > saldo &&  (seccionMensajes.innerHTML = `Insufficient funds on your Wallet to Witdhraw $ ${monto}`)

            
            if (monto < saldo) {
            /*Operador Ternario*/    
            monto > MaxRetirado(arrayRegistros) ? seccionMensajes.innerHTML = "This is your bigget amount Withdrew" : seccionMensajes.innerHTML = "Done! Money Withdrew from your account."
            saldo = saldo - monto;
            saldoTotal.innerHTML =  "$ " + saldo;
            agregarRegistro(tipo,monto,fc,saldo);
            seccionInvoice.style.display = "none"
            listarRegistros(JSON.parse(localStorage.getItem("Registros")));
            }

        }

        if (tipo === "Add Money") {
            saldo = saldo + monto;
            saldoTotal.innerHTML =  "$ " + saldo;
            agregarRegistro(tipo,monto,fc,saldo);
            seccionMensajes.innerHTML = "Done! Money added to your account." 
            seccionInvoice.style.display = "none"
            listarRegistros(JSON.parse(localStorage.getItem("Registros")));
        }

            amount.value =""
            localStorage.setItem("Registros",JSON.stringify(arrayRegistros))

    } else {
        seccionMensajes.innerHTML = "Invalid amount. Please enter a number > 0"
    }

}


/*Interaccion con DOM*/


agregarDinero.onclick = ()=>{
    seccionInvoice.style.display = "flex"
    tipoOperacion.innerHTML = "Add Money"
    }

restarDinero.onclick = ()=>{
        seccionInvoice.style.display = "flex"
        tipoOperacion.innerHTML = "Withdraw"
    }

/*DOM cuando se despliega la seccion de agregar o restar dinero*/

submit.onclick = ()=> {
    let amount = document.getElementById("amount");
    monto = Number(amount.value);
    let factura = document.getElementById("invNumber");
    fc = Number(factura.value);
    amount.value = "";
    factura.value="";
    modificarMonto(monto,fc);
    
}


buscarFactura.onclick = ()=> {
    seccionInvoice.style.display = "none"
    seccionMensajes.innerHTML = ""
    let filtrado = filtrarFactura()
    /*Uso de operador Ternario*/
    filtrado.length > 0 ?  listarRegistros(filtrado) : seccionMensajes.innerHTML = "Invoice Number doesn't exist"
}

listado.onclick = () => {
    seccionInvoice.style.display = "none";
    listarRegistros(arrayRegistros);
    seccionMensajes.innerHTML = "";
}

botonSalida.onclick = () => {
    seccionInvoice.style.display = "none"
    hideTransactions();
    seccionMensajes.innerHTML = ""
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
    numeroFactura = Number(buscada.value);
    let facturaBuscada = arrayRegistros.filter ((fc) => fc.factura === numeroFactura);
    buscada.value = "";
    return facturaBuscada;
}

function hideTransactions() {
    let miLista = document.getElementById("TransactionsList");
    miLista.innerHTML="";
}

function agregarRegistro(operacion, monto, factura, saldo) {
    let hoy = new Date();
    let fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear() + ' ' + hoy.getHours() + ':' + hoy.getMinutes();
    let nuevoRegistro = new Registro(fecha, operacion, factura, monto, saldo);
    arrayRegistros.unshift(nuevoRegistro);
    localStorage.setItem('Registros',JSON.stringify(arrayRegistros))
}

/*En la siguiente funcion filtro solo los retiros de Dinero. luego con un Spread operator y Math.Max veo cual fue el mayor monto retirado*/

function MaxRetirado (arrayRegistros) {

    let arrayFiltrado = arrayRegistros.filter ((tipo) => tipo.tipo === "Withdraw");
    let arrayRetiros = [];

    arrayFiltrado.forEach((registro) => {
    arrayRetiros.unshift(registro.monto)
    })
    

    /*Uso spread para desarmar el array y ver luego el maximo retirado*/
    let maximoRetirado = Math.max(...arrayRetiros);
    return maximoRetirado;
}

