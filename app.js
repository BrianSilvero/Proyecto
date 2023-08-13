// // Creando tienda de Hunger
class Producto {
  constructor(id, nombre, precio, descripcion, img) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.img = img;
  }
}

class Carrito {
  constructor() {
    this.listaCarrito = [];
  }
}

class controladorDeProducto{
    constructor(){
        this.listaDeProductos = []
    }

    agregar(producto){
        this.listaDeProductos.push(producto)        
    }

    mostrarProductos(){
        let contenedor_productos = document.getElementById("contenedor_productos")
        this.listaDeProductos.forEach( producto => {
            contenedor_productos.innerHTML += `<div class="card" style="width: 18rem">
            <img src="${producto.img}" alt="img" />
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.descripcion}</p>
                <p class="card-text">$${producto.precio}</p>
                <a href="#" class="btn btn-primary">Añadir al carrito</a>
            </div>
          </div>`
        })
    }
}

// Productos del sitio
const Agenda = new Producto (1, "Agenda", 2300, "Diseñada para satisfacer tus necesidades en un mundo lleno de actividades, la Agenda Hunger combina estilo y funcionalidad en un elegante formato. Con páginas de alta calidad, secciones personalizables y un diseño intuitivo, esta agenda te ayudará a conquistar tus metas día tras día. ¡Eleva tu productividad y estilo con la Agenda Hunger", "https://encycolorpedia.es/gimp.svg")
const Remera = new Producto (2, "Remera", 3800, "Fabricada con materiales de primera calidad, esta remera es el equilibrio perfecto entre estilo y confort. Ya sea para el día a día o para destacar en tus actividades, la Remera Hunger te acompaña con su diseño moderno y ajuste impecable. ¡Eleva tu estilo con la autenticidad de Hunger!", "assets\agenda.png")
const Taza = new Producto (3, "Taza", 1500, "Creada con pasión y calidad premium, esta taza es mucho más que un recipiente, es un compañero de emociones. Cada café, té o chocolate caliente se transforma en un ritual con su diseño cautivador y el confort de sostenerla en tus manos. ¡Eleva tus mañanas y despierta tus sentidos con la Taza Hunger, la chispa que transforma tus bebidas en momentos inolvidables!", "assets/agenda.png")
const Botella = new Producto (4, "Botella", 2000, "Diseñada para quienes buscan explorar el mundo, esta botella es resistente, funcional y llena de estilo. Mantén tus bebidas frías o calientes durante horas, mientras te desplazas con confianza gracias a su construcción de alta calidad. Siente la sed de la aventura y mantente hidratado con la Botella Hunger, tu compañera perfecta en cada camino que decidas recorrer.", "assets/agenda.png")


// Carrito del sitio

const carrito = new Carrito()

// Controlador de producto

const Controlador = new controladorDeProducto ()

Controlador.agregar(Agenda)
Controlador.agregar(Remera)
Controlador.agregar(Taza)
Controlador.agregar(Botella)

Controlador.mostrarProductos()

// class Producto{
//     constructor(id, nombre, precio, cantidad){
//         this.id = id;
//         this.nombre = nombre;
//         this.precio = precio;
//         this.cantidad = cantidad;
//     }

//     incrementarCantidad(cantidad){
//         this.cantidad = cantidad
//     }

//     descripcion(){
//         return  "Id: " + this.id +
//                 "\nProducto: "+this.nombre+
//                 "\nPrecio: "+this.precio
//     }

//     descripcionDelCarrito(){
//         return  "\nProducto: "+this.nombre+
//                 "\nPrecio: "+this.precio+
//                 "\nCantidad: "+this.cantidad+
//                 "\n==================="
//     }
// }

// class controladorDeProducto {
//     constructor(){
//         this.listaDeCompra = [];
//     }

//     agregar(producto){
//         this.listaDeCompra.push(producto)
//     }

//     buscarProductoPorId (id){
//         return this.listaDeCompra.find(producto => producto.id === id);
//     }
//     mostrar(){
//         let listadoEnTexto = "";
//         this.listaDeCompra.forEach( producto => {
//             listadoEnTexto = listadoEnTexto + producto.descripcion() + "\n==================== \n"
//             // alert(producto.descripcion())
//         })
//         alert(listadoEnTexto)
//     }
// }

// class Carrito{
//     constructor(){
//         this.listaCarrito= []
//     }

//     agregar(producto){
//         this.listaCarrito.push(producto)
//     }

//     mostrar(){
//         let listadoEnTexto = "";
//         this.listaCarrito.forEach( producto => {
//             listadoEnTexto = listadoEnTexto + producto.descripcionDelCarrito()
//             // alert(producto.descripcion())
//         })
//         alert(listadoEnTexto)

//     }

//     calcularTotal(){
//             return this.listaCarrito.reduce( (acumulador ,producto) => acumulador + producto.precio * producto.cantidad ,0)
//     }

//     calculoDeIva(){
//         return this.calcularTotal() * 1.21
//     }
// }

// const cDP = new controladorDeProducto();
// const carrito = new Carrito();

// cDP.agregar(new Producto(1, "Gorra", 1800, 1));
// cDP.agregar(new Producto(2, "Remera", 3400, 1));
// cDP.agregar(new Producto(3, "Taza", 1000, 1));
// cDP.agregar(new Producto(4, "Agenda", 2000, 1));

// let edad = Number(prompt ("Bienvendio a la tienda de Hunger! \n Que edad tienes?"))

// if(edad >= 13){
// let rta = "";

// do {
//     cDP.mostrar();
//     let opciones = Number(prompt("Ingrese el numero del articulo a comprar"));
//     let producto = cDP.buscarProductoPorId(opciones)
//     let cantidad = Number(prompt("Ingrese la cantidad que desea comprar"));
//     producto.incrementarCantidad(cantidad)
//     carrito.agregar(producto);
//     alert("El producto se añadio de forma exitosa!. El carrito tuyo es: ")
//     carrito.mostrar();
//     rta = prompt ("Quisiera agregar algo mas al carrito? (Escriba 'Esc' para finalizar compra)").toUpperCase();
// } while (rta != "ESC");

// alert("El total de su compra es: $"+ carrito.calcularTotal())
// alert("El valor del iva es de: $" + carrito.calculoDeIva())
// }
// else{
// alert("Lo sentimos no tienes la edad para comprar");
// }
