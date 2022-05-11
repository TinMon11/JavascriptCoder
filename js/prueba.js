let saldoinicial = 0

function agregarSaldo(saldo) {
  let montoingresado = Number(prompt("Cuanto dinero ingresas:"))
  saldo = saldoinicial + montoingresado
  saldoinicial = saldo
}

for (let i=1;i<=4;i++) {
    agregarSaldo(saldoinicial)
    alert("Tu saldo es: "+ saldoinicial )
    document.write(`<H1>Este es el saldo al momento ${i}: ${saldoinicial}`)
}