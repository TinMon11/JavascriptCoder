
arrayRegistros = JSON.parse(localStorage.getItem("Registros"));
console.log(arrayRegistros)

let saldo = 0;
let saldoUSDT = 0;

if (arrayRegistros.length > 1) {
    saldoUSDT = (arrayRegistros[0].saldoUsdt)
    saldo = (arrayRegistros[0].saldo)
} 

let saldoTotal = document.getElementById("saldo")
saldoTotal.innerHTML =  "$ " + saldo;

let saldoTotalUSDT = document.getElementById("saldoUsdt")
saldoTotalUSDT.innerHTML =  "USDT " + saldoUSDT;

/*Tomo los botones del panel para interactuar luego con DOM*/ 

let user = document.getElementById("userName")
let agregarDinero = document.getElementById("addMoneyButton")
let restarDinero = document.getElementById("withdrawMoneyButton")
let buttonUSDT = document.getElementById("USDTButton")
let buscarFactura = document.getElementById("searchButton")
let listado = document.getElementById("viewTransactions")
let botonSalida = document.getElementById("exitButton")
let tipoOperacion = document.getElementById("operacion")
let submit = document.getElementById("submitButton")
let seccionMensajes = document.getElementById("mensajes")
let sectionUSDT = document.getElementById("sectionUSDT")
let seccionInvoice = document.getElementById("invoiceNumberForm")

/*Tomo del almacenamiento local el nombre de usuario para escribirlo en el titulo de la pagina*/

let usuario = localStorage.getItem("Username")
userName.innerHTML = usuario

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
            monto > MaxRetirado(arrayRegistros) ? movimientoExtraño () : seccionMensajes.innerHTML = "Done! Money Withdrew from your account."
            saldo = saldo - monto;
            saldoTotal.innerHTML =  "$ " + saldo.toFixed(2);;
            agregarRegistro(tipo,monto,fc,saldo.toFixed(2),0,saldoUSDT);
            seccionInvoice.style.display = "none"
            listarRegistros(arrayRegistros);
            notificacion();
            }

        }

        if (tipo === "Add Money") {
            saldo = saldo + monto;
            saldoTotal.innerHTML =  "$ " + saldo.toFixed(2);;
            agregarRegistro(tipo,monto,fc,saldo.toFixed(2),0,saldoUSDT);
            seccionMensajes.innerHTML = "Done! Money added to your account." 
            seccionInvoice.style.display = "none"
            listarRegistros(arrayRegistros);
            notificacion();
        }
            amount.value =""

        } 
    
    else {
        notificacionError ()
    }

}


/*Interaccion con DOM*/


agregarDinero.onclick = ()=>{
    sectionUSDT.style.display = "none"
    seccionMensajes.innerHTML = ""
    seccionInvoice.style.display = "flex"
    tipoOperacion.innerHTML = "Add Money"
    }

restarDinero.onclick = ()=>{
        sectionUSDT.style.display = "none"
        seccionMensajes.innerHTML = ""
        seccionInvoice.style.display = "flex"
        tipoOperacion.innerHTML = "Withdraw"
    }

buttonUSDT.onclick = ()=>{
    sectionUSDT.innerHTML = ""
    seccionMensajes.innerHTML = ""
    seccionInvoice.style.display = "none"
    mostrarModuloUSDT()
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
    sectionUSDT.style.display = "none"
    seccionInvoice.style.display = "none"
    seccionMensajes.innerHTML = ""
    let filtrado = filtrarFactura()
    /*Uso de operador Ternario*/
    filtrado.length > 0 ?  listarRegistros(filtrado) : seccionMensajes.innerHTML = "Invoice Number doesn't exist"
}

listado.onclick = () => {
    sectionUSDT.style.display = "none"
    seccionInvoice.style.display = "none";
    listarRegistros(arrayRegistros);
    seccionMensajes.innerHTML = "";
}

botonSalida.onclick = () => {
    seccionInvoice.style.display = "none"
    hideTransactions();
    seccionMensajes.innerHTML = ""
    sectionUSDT.style.display = "none"
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
   tdSaldo.innerHTML="Saldo AR$";
   encabezado.appendChild(tdSaldo);

   const tdMontoUSDT = document.createElement("th");
   tdMontoUSDT.innerHTML="MontoUSDT";
   encabezado.appendChild(tdMontoUSDT);

   const tdSaldoUSDT = document.createElement("th");
   tdSaldoUSDT.innerHTML="SaldoUSDT";
   encabezado.appendChild(tdSaldoUSDT);

   miLista.appendChild(encabezado);

   if (listadoRegistros.length > 0) {

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

       nodotd = document.createElement("td");
       nodotd.innerHTML=`${registro.montoUSDT}`
       nodotr.appendChild(nodotd);
       
       nodotd = document.createElement("td");
       nodotd.innerHTML=`${registro.saldoUsdt}`
       nodotr.appendChild(nodotd);

       miLista.appendChild(nodotr);
       }); 

    }

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

function agregarRegistro(operacion, monto, factura, saldo, montoUSDT, saldoUSDT) {
    let hoy = new Date();
    let fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear() + ' ' + hoy.getHours() + ':' + hoy.getMinutes();
    let nuevoRegistro = new Registro(fecha, operacion, factura, monto, saldo, montoUSDT, saldoUSDT);
    arrayRegistros.unshift(nuevoRegistro);
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

/*Funcion para mostrar notificacion cuando el movimiento es correcto. Uso libreria Toastify*/

function notificacion() {
    Toastify({
        text: '¡Succesfull operation!', 
        className: 'toastPopUp',
        duration: 2500,
        gravity: 'bottom', // `top` or `bottom`
        position: 'center', // `left`, `center` or `right`
        style: {
            background: '#3071E7',
        }
    }).showToast();
}


function notificacionError () { 
    Swal.fire({
        title:'Invalid Movement',
        text:'Please Enter a Number Bigger than 0',
        icon: 'error',
        confirmButtonText: 'Retry',
    })
}

function movimientoExtraño () { 
    Swal.fire({
        title:'Biggest Withdrew Amount',
        text:'¡Attention! This is your biggest amount withdrew',
        icon: 'warning',
        confirmButtonText: 'OK',
    })
}


function mostrarModuloUSDT() {
    
    sectionUSDT.style.display = "flex"

    /*Hago un fetch para traer la cotizacion de compra-venta del USDT en ARS*/

    fetch("https://criptoya.com/api/satoshitango/usdt/ars/0.1")
    .then((response)=>response.json())
    .then((json)=> 
    { let {ask,bid} = json

    /*Muestro cotizacion en el HTML mediante DOM*/
    const divCotizacion = document.createElement("div")
    divCotizacion.innerHTML = `Buy USDT at $${ask} <br> Sell USDT at $${bid}<br>`
    seccionMensajes.appendChild(divCotizacion)

    localStorage.setItem("askPrice",JSON.stringify(ask));
    localStorage.setItem("bidPrice",JSON.stringify(bid));


    })

    const div = document.createElement("div")
    div.innerHTML = `   <button class="card__options__buttons" id="buyUSDT">Buy USDT</button>
    <button class="card__options__buttons" id="sellUSDT">Sell USDT</button>
    <button class="card__options__buttons" id="cancelUSDT">Cancel</button>`
    sectionUSDT.appendChild(div)

    /*A los 3 botones de esta seccion les agrego un onclick, que llamara a distintas funciones o acciones*/

    document.getElementById("buyUSDT").onclick = () =>{
        let ask = localStorage.getItem("askPrice")
        compraVentaUSDT("buy",ask)}

    document.getElementById("sellUSDT").onclick = () =>{
        let bid = localStorage.getItem("bidPrice")
        compraVentaUSDT("sell",bid)}

    document.getElementById("cancelUSDT").onclick = () =>{
        seccionMensajes.innerHTML = ""
        sectionUSDT.style.display = "none"}
    
}


async function compraVentaUSDT (tipo,cotizacion) {

    seccionMensajes.innerHTML = `You are going to ${tipo} USDT - Current Price AR$ ${cotizacion}`

     if (tipo == "buy") 
     {
         const { value: cantidad } = await Swal.fire({
                 input: 'number',
                 inputLabel: `Amount to Buy - Price $ ${cotizacion}`,
                 inputPlaceholder: 'Insert amount',
                 showCancelButton: true
               })
              

               if (cantidad) {
                
                let arsNecesarios = cantidad * cotizacion
                arsNecesarios > saldo && (seccionMensajes.innerHTML = `Insufficient funds on your Wallet to buy ${cantidad} USDT `)

                if (arsNecesarios < saldo)
                    {
                        saldo = saldo - arsNecesarios
                        saldoUSDT = Number((saldoUSDT + Number(cantidad)).toFixed(2))
                        saldoTotal.innerHTML =  "$ " + saldo.toFixed(2);
                        saldoTotalUSDT.innerHTML =  "USDT " + saldoUSDT;
                        agregarRegistro("BuyUSDT", arsNecesarios, "-", saldo.toFixed(2),cantidad, saldoUSDT)
                        listarRegistros(arrayRegistros);
                        notificacion();
                    }

              }
    }      


         if (tipo == "sell") 
         {
             const { value: cantidad } = await Swal.fire({
                     input: 'number',
                     inputLabel: `Amount to Sell - Price $ ${cotizacion}`,
                     inputPlaceholder: 'Insert amount',
                     showCancelButton: true
                   })
                  
    
                   if (cantidad) {

                    cantidad > saldoUSDT && (seccionMensajes.innerHTML = `Insufficient funds on your Wallet to sell ${cantidad} USDT `)
                    
                    let arsRecibidos = cantidad * cotizacion
    
                    if (cantidad < saldoUSDT)
                        {
                            saldo = saldo + arsRecibidos
                            saldoUSDT = saldoUSDT - cantidad
                            saldoTotal.innerHTML =  "$ " + saldo.toFixed(2);
                            saldoTotalUSDT.innerHTML =  "USDT " + saldoUSDT;
                            agregarRegistro("SellUSDT", arsRecibidos.toFixed(2), "-", saldo.toFixed(2), cantidad, saldoUSDT)
                            listarRegistros(arrayRegistros);
                            notificacion();
                        }
    
                    }
        }      
}
