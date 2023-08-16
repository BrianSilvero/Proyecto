// // Creando tienda de Hunger
class Producto {
  constructor({id, nombre, precio, descripcion, img}){
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = 1
    this.descripcion = descripcion;
    this.img = img;
  }

  aumentarCantidad (){
    this.cantidad++
  }

  disminuirCantidad (){
    if(this.cantidad > 1){
      this.cantidad--
      return true
    }
    return false
  }


  descripcionHtmlCarrito(){
    return `
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${this.img}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title fs-4 fw-bold">${this.nombre}</h5>
                    <p class="card-text fs-5 fw-bold" >Cantidad: ${this.cantidad} <button class="btn btn-primary" id="minus-${this.id}"><i class="fa-solid fa-minus"></i></button><button class="btn btn-secondary" id="plus-${this.id}"><i class="fa-solid fa-plus"></i></button></p> 
                    <p class="card-text fs-2 fw-bold">Precio: $${this.precio}</p>
                    <button class="btn btn-danger" id= "eliminar-${this.id}"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        </div>
    </div>`
  }
  descripcionHtml(){
    return `<div class="card" style="width: 18rem">
    <img src="${this.img}" alt="img" />
    <div class="card-body">
        <h5 class="card-title">${this.nombre}</h5>
        <p class="card-text">${this.descripcion}</p>
        <p class="card-text">$${this.precio}</p>
        <a href="#" class="btn btn-primary" id="ap-${this.id}">Añadir al carrito</a>
    </div>
  </div>`
  }
}

class Carrito {
  constructor() {
    this.listaCarrito = [];
  }

  levantarStorage(){
    this.listaCarrito = JSON.parse(localStorage.getItem("listaCarrito")) || []
    
    if(this.listaCarrito.length > 0 ){
      let listaAuxiliar = []

      for(let i = 0; i < this.listaCarrito.length; i++){
        let productoDeLaClaseProducto = new Producto (this.listaCarrito[i])
        listaAuxiliar.push(productoDeLaClaseProducto)
      }

      this.listaCarrito = listaAuxiliar
    }
  }
  guardarEnStorage(){
    let listaCarritoJSON = JSON.stringify(this.listaCarrito)
    localStorage.setItem("listaCarrito", listaCarritoJSON)
  }

  agregar(productoAgregar){
    let existenciaDeProducto = this.listaCarrito.some( producto => producto.id == productoAgregar.id)

    if(existenciaDeProducto){
      let producto = this.listaCarrito.find(producto => producto.id == productoAgregar.id)
      producto.cantidad = producto.cantidad + 1  
    }
    else{
      this.listaCarrito.push(productoAgregar)
    }

  }
  
  eliminar(productoEliminar){
    let producto = this.listaCarrito.find(producto => producto.id == productoEliminar.id)
    let indice = this.listaCarrito.indexOf(producto)
    this.listaCarrito.splice(indice, 1)
    this.guardarEnStorage()
  }

  mostrarProductos(){
    let contenedor_carrito = document.getElementById('contenedor_carrito')
    let total = document.getElementById(`total`)
    contenedor_carrito.innerHTML = ""
    this.listaCarrito.forEach(producto => {
        contenedor_carrito.innerHTML += producto.descripcionHtmlCarrito()
    })


    this.listaCarrito.forEach(producto => {
      let btn_eliminar = document.getElementById(`eliminar-${producto.id}`)
      let btn_plus = document.getElementById(`plus-${producto.id}`)
      let btn_minus = document.getElementById(`minus-${producto.id}`)
      btn_eliminar.addEventListener("click", () => {
          this.eliminar(producto)
          this.guardarEnStorage()
          this.mostrarProductos()
      })

      btn_plus.addEventListener("click",()=>{
        producto.aumentarCantidad()
        this.mostrarProductos()
      })
      btn_minus.addEventListener("click",()=>{
        if(producto.disminuirCantidad()){
        this.mostrarProductos()
        }
      })
    })
    
    total.innerHTML = "Total de tu compra: $" + this.calcular_total()
    
  }

  calcular_total(){
    return this.listaCarrito.reduce((acumular, producto) => acumular + producto.precio * producto.cantidad, 0)
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
            contenedor_productos.innerHTML += producto.descripcionHtml()
        })

        this.listaDeProductos.forEach( producto => {
            const btn = document.getElementById(`ap-${producto.id}`)
            btn.addEventListener("click",() =>{
                carrito.agregar(producto)
                carrito.guardarEnStorage()
                carrito.mostrarProductos()
            })
        })
    }
}

// Productos del sitio

const Agenda = new Producto ({id:1, nombre:"Agenda", precio: 2300, descripcion: "Diseñada para satisfacer tus necesidades en un mundo lleno de actividades, la Agenda Hunger combina estilo y funcionalidad en un elegante formato. Con páginas de alta calidad, secciones personalizables y un diseño intuitivo, esta agenda te ayudará a conquistar tus metas día tras día. ¡Eleva tu productividad y estilo con la Agenda Hunger", img: "https://raw.githubusercontent.com/BrianSilvero/Proyecto/main/assets/agenda.png"})
const Remera = new Producto ({id:2, nombre:"Remera", precio: 3800, descripcion: "Fabricada con materiales de primera calidad, esta remera es el equilibrio perfecto entre estilo y confort. Ya sea para el día a día o para destacar en tus actividades, la Remera Hunger te acompaña con su diseño moderno y ajuste impecable. ¡Eleva tu estilo con la autenticidad de Hunger!", img: "https://raw.githubusercontent.com/BrianSilvero/Proyecto/main/assets/remera.png"})
const Taza = new Producto ({id:3, nombre:"Taza", precio: 1500, descripcion: "Creada con pasión y calidad premium, esta taza es mucho más que un recipiente, es un compañero de emociones. Cada café, té o chocolate caliente se transforma en un ritual con su diseño cautivador y el confort de sostenerla en tus manos. ¡Eleva tus mañanas y despierta tus sentidos con la Taza Hunger, la chispa que transforma tus bebidas en momentos inolvidables!", img: "https://raw.githubusercontent.com/BrianSilvero/Proyecto/main/assets/taza.png"})
const Botella = new Producto ({id:4, nombre:"Botella", precio: 2000, descripcion: "Diseñada para quienes buscan explorar el mundo, esta botella es resistente, funcional y llena de estilo. Mantén tus bebidas frías o calientes durante horas, mientras te desplazas con confianza gracias a su construcción de alta calidad. Siente la sed de la aventura y mantente hidratado con la Botella Hunger, tu compañera perfecta en cada camino que decidas recorrer.", img: "https://raw.githubusercontent.com/BrianSilvero/Proyecto/main/assets/botella.png"})



// Carrito del sitio

const carrito = new Carrito()
carrito.levantarStorage()
carrito.mostrarProductos()

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
