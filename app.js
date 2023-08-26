class Producto {

  constructor({ id, nombre, precio, descripcion, img }) {
      this.id = id
      this.nombre = nombre
      this.precio = precio
      this.cantidad = 1
      this.descripcion = descripcion
      this.img = img
  }

  aumentarCantidad() {
      this.cantidad++
  }

  disminuirCantidad() {
      if (this.cantidad > 1) {
          this.cantidad--
          return true
      }

      return false
  }

  descripcionHTMLCarrito() {
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

  descripcionHTML() {
      return `<div class="card" style="width: 18rem">
      <img src="${this.img}" alt="img" />
      <div class="card-body">
          <h5 class="card-title text-center fs-2 fw-bold">${this.nombre}</h5>
          <p class="card-text fw-bold">${this.descripcion}</p>
          <p class="card-text text-center fs-2 fw-bold border-bottom">$${this.precio}</p>
          <a href="#" class="btn btn-primary" id="ap-${this.id}">Añadir al carrito</a>
      </div>
    </div>`
  }
}

class Carrito {
  constructor() {
      this.listaCarrito = []
      this.contenedor_carrito = document.getElementById('contenedor_carrito')
      this.total = document.getElementById('total')
      this.finalizar_compra = document.getElementById("finalizar_compra")
      this.keyStorage = "listaCarrito"
  }

  levantarStorage() {
      this.listaCarrito = JSON.parse(localStorage.getItem(this.keyStorage)) || []

      if (this.listaCarrito.length > 0) {
          let listaAuxiliar = []

          for (let i = 0; i < this.listaCarrito.length; i++) {
              let productoDeLaClaseProducto = new Producto(this.listaCarrito[i])
              listaAuxiliar.push(productoDeLaClaseProducto)

          }

          this.listaCarrito = listaAuxiliar
      }
  }

  guardarEnStorage() {
      let listaCarritoJSON = JSON.stringify(this.listaCarrito)
      localStorage.setItem(this.keyStorage, listaCarritoJSON)
  }

  agregar(productoAgregar) {
      //Agregar producto 
      let existeElProducto = this.listaCarrito.some(producto => producto.id == productoAgregar.id)

      if (existeElProducto) {
          let producto = this.listaCarrito.find(producto => producto.id == productoAgregar.id)
          producto.cantidad = producto.cantidad + 1
      } else {
          this.listaCarrito.push(productoAgregar)
      }
  }

  eliminar(productoEliminar) {
      let producto = this.listaCarrito.find(producto => producto.id == productoEliminar.id)
      let indice = this.listaCarrito.indexOf(producto)
      this.listaCarrito.splice(indice, 1)
  }

  limpiarContenedorCarrito() {
      this.contenedor_carrito.innerHTML = ""
  }

  mostrarProductos() {
      this.limpiarContenedorCarrito()

      this.listaCarrito.forEach(producto => {
          contenedor_carrito.innerHTML += producto.descripcionHTMLCarrito()
      })

      //Eventos de los diferentes bones como eliminar producto, aumentar y disminuir cantidad
      this.listaCarrito.forEach(producto => {

          let btn_eliminar = document.getElementById(`eliminar-${producto.id}`)
          let btn_plus = document.getElementById(`plus-${producto.id}`)
          let btn_minus = document.getElementById(`minus-${producto.id}`)

          btn_eliminar.addEventListener("click", () => {
              this.eliminar(producto)
              this.guardarEnStorage()
              this.mostrarProductos()
          })

          btn_plus.addEventListener("click", () => {
              producto.aumentarCantidad()
              this.mostrarProductos()
          })

          btn_minus.addEventListener("click", () => {
              if (producto.disminuirCantidad()) {
                  this.mostrarProductos()
              }
          })

      })

      total.innerHTML = "Total: $" + this.calcular_total()
  }

  calcular_total() {
      return this.listaCarrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0)
  }

  eventoFinalizarCompra() {
      this.finalizar_compra.addEventListener("click", () => {

          if (this.listaCarrito.length > 0) {
              let precio_total = this.calcular_total()
              //Limpieza del carrito
              this.listaCarrito = []
              //Limpieza del storage
              localStorage.removeItem(this.keyStorage)
              //Visualizar total
              this.limpiarContenedorCarrito()
              this.total.innerHTML = ""
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: `¡Excelente, tu compra se registró con éxito por un total de:  $${precio_total}`,
                  text: "Para más detalle, revise su e-mail",
                  timer: 3000
                })

          } else {
              Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: '¡No te olvides de seleccionar un producto para realizar la compra!',
                  timer: 3000
                })
          }
      })
  }
}

class ProductoController {
  constructor() {
      this.listaProductos = []
  }

  cargarProductos() {
      //Se cargan los productos de la pagina
      const Agenda = new Producto ({id:1, nombre:"Agenda", precio: 2300, descripcion: "Diseñada para satisfacer tus necesidades en un mundo lleno de actividades, la Agenda Hunger combina estilo y funcionalidad en un elegante formato. Con páginas de alta calidad, secciones personalizables y un diseño intuitivo, esta agenda te ayudará a conquistar tus metas día tras día. ¡Eleva tu productividad y estilo con la Agenda Hunger", img: "https://raw.githubusercontent.com/BrianSilvero/Proyecto/main/assets/agenda.png"})
      const Remera = new Producto ({id:2, nombre:"Remera", precio: 3800, descripcion: "Fabricada con materiales de primera calidad, esta remera es el equilibrio perfecto entre estilo y confort. Ya sea para el día a día o para destacar en tus actividades, la Remera Hunger te acompaña con su diseño moderno y ajuste impecable. ¡Eleva tu estilo con la autenticidad de Hunger!", img: "https://raw.githubusercontent.com/BrianSilvero/Proyecto/main/assets/remera.png"})
      const Taza = new Producto ({id:3, nombre:"Taza", precio: 1500, descripcion: "Creada con pasión y calidad premium, esta taza es mucho más que un recipiente, es un compañero de emociones. Cada café, té o chocolate caliente se transforma en un ritual con su diseño cautivador y el confort de sostenerla en tus manos. ¡Eleva tus mañanas y despierta tus sentidos con la Taza Hunger, la chispa que transforma tus bebidas en momentos inolvidables!", img: "https://raw.githubusercontent.com/BrianSilvero/Proyecto/main/assets/taza.png"})
      const Botella = new Producto ({id:4, nombre:"Botella", precio: 2000, descripcion: "Diseñada para quienes buscan explorar el mundo, esta botella es resistente, funcional y llena de estilo. Mantén tus bebidas frías o calientes durante horas, mientras te desplazas con confianza gracias a su construcción de alta calidad. Siente la sed de la aventura y mantente hidratado con la Botella Hunger, tu compañera perfecta en cada camino que decidas recorrer.", img: "https://raw.githubusercontent.com/BrianSilvero/Proyecto/main/assets/botella.png"})

      this.agregar(Agenda)
      this.agregar(Remera)
      this.agregar(Taza)
      this.agregar(Botella)
  }

  agregar(producto) {
      this.listaProductos.push(producto)
  }

  mostrarProductos() {
      let contenedor_productos = document.getElementById("contenedor_productos")
      this.listaProductos.forEach(producto => {
          contenedor_productos.innerHTML += producto.descripcionHTML()
      })

      //Se aplica el evento de click en el boton "añadir al carrito"
      this.listaProductos.forEach(producto => {

          const btn = document.getElementById(`ap-${producto.id}`)

          btn.addEventListener("click", () => {
              carrito.agregar(producto)
              carrito.guardarEnStorage()
              carrito.mostrarProductos()
              Toastify({
                  avatar: `${producto.img}`,
                  text: `¡${producto.nombre} añadido!`,
                  duration: 100000,
                  gravity: "bottom", // `top` or `bottom`
                  position: "right", // `left`, `center` or `right`
                  
                }).showToast();
          })
      })
  }
}

//En esta parte del codigo se gestiona la interaccion del usuario con el carrito
const carrito = new Carrito()
carrito.levantarStorage()
carrito.mostrarProductos()
carrito.eventoFinalizarCompra()

//En esta parte del codigo se gestiona los productos, se calcula y se muestra en pantalla.
const controlador_productos = new ProductoController()
controlador_productos.cargarProductos()
controlador_productos.mostrarProductos()