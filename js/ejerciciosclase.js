 class Producto {

     constructor(id,nombre,precio)
     {
     this.id=id;
     this.nombre=nombre;
     this.precio=precio;
 }
 PrecioConIVA()
  {
      return this.precio*1.21;
  }

 }

 class Persona {

     constructor(id,rol,nombre,apellido)
     {
         this.id=id;
         this.rol=rol;
         this.nombre=nombre;
         this.apellido=apellido;
     }

     Comprador()
     {
         return this.nombre + " " + this.apellido

     }
 }

 class Rol {

     constructor(id,nombre)
     {
         this.id=id;
         this.nombre=nombre;
     }
 }

 class Compra {

     constructor(producto,persona)
     {
         this.producto=producto;
         this.persona=persona;
     }
 }


 const producto = new Producto("1", "Arroz","100")
 const rol= new Rol("100","Cliente")
 const persona = new Persona("1020",rol,"Gonzalo","Perez")

 const compra = new Compra(producto,persona);

 console.log(compra)
 console.log(producto.PrecioConIVA())