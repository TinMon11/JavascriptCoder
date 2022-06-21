
class Usuario {
  
    constructor (user,password,registros)
     { 
      this.user = user 
      this.password = password;
      this.registros = registros;
     }
  }

let arrayUsuarios = []

/*En el siguiente array (array de objetos) se van agregando las operaciones, con un id, tipo de operacion, monto, y saldo luego de esa operacion*/

class Registro {
  
    constructor (fecha, tipo,factura, monto,saldo, montoUSDT, saldoUsdt)
     { 
      this.fecha = fecha 
      this.tipo = tipo;
      this.factura = factura;
      this.monto = monto;
      this.saldo = saldo;
      this.montoUSDT = montoUSDT;
      this.saldoUsdt = saldoUsdt
     }
  }

/*Defino movimientos iniciales para el usuario de Prueba*/

const mov1 = new Registro ("25-05-2022 20:00", "Add", 100, 1000, 1000,0,504)
const mov2 = new Registro ("25-05-2022 20:20", "Add", 101, 2100, 3100,0,504)
const mov3 = new Registro ("26-05-2022 15:20", "Withdraw", 200, 500, 2600,0,504)
const mov4 = new Registro ("26-05-2022 16:20", "Withdraw", 201, 800, 1800,0,504)
const mov5 = new Registro ("26-05-2022 17:20", "Withdraw", 202, 300, 1500,0,504)
const mov6 = new Registro ("27-05-2022 13:08", "Add", 102, 805, 2305,0,504)

let arrayPrueba = [mov6,mov5,mov4,mov3,mov2, mov1];

const usuarioPrueba = new Usuario ("Martin", "12345", arrayPrueba)

arrayUsuarios.push(usuarioPrueba)







