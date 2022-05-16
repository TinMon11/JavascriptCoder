//  class Producto {

//      constructor(id,nombre,precio)
//      {
//      this.id=id;
//      this.nombre=nombre;
//      this.precio=precio;
//  }
//  PrecioConIVA()
//   {
//       return this.precio*1.21;
//   }

//  }

//  class Persona {

//      constructor(id,rol,nombre,apellido)
//      {
//          this.id=id;
//          this.rol=rol;
//          this.nombre=nombre;
//          this.apellido=apellido;
//      }

//      Comprador()
//      {
//          return this.nombre + " " + this.apellido

//      }
//  }

//  class Rol {

//      constructor(id,nombre)
//      {
//          this.id=id;
//          this.nombre=nombre;
//      }
//  }

//  class Compra {

//      constructor(producto,persona)
//      {
//          this.producto=producto;
//          this.persona=persona;
//      }
//  }


//  const producto = new Producto("1", "Arroz","100")
//  const rol= new Rol("100","Cliente")
//  const persona = new Persona("1020",rol,"Gonzalo","Perez")

//  const compra = new Compra(producto,persona);

//  console.log(compra)
//  console.log(producto.PrecioConIVA())

// const misNumeros = [1,3,5,6,"Hola",14]

// //lenght para que te de la cnatida de elementos

// alert(`El largo del array es ${misNumeros.length}`)

//Push - para agregar valores al final del array --- UNSHIFT mete al prinicipio del array
// POP quita el ultimo del array
// 


// misNumeros.push(104)



// for (let i=0;i<misNumeros.length;i++) {
//     alert(`Valor de la posicion ${i} es: ${misNumeros[i]}`)
// }

let i=0;

const miArray = []

while (i<5) {
    let numero = Number(prompt(`Ingrese un numero:`));
    miArray.push(numero);
    i++;
}

alert(miArray)

let suma = 0;
let multip = 1;

for (let i=0;i<miArray.length;i++) {

      suma = suma + miArray[i];
      multip = multip*miArray[i];
 }

 alert(suma)
alert(multip)