var carrito = JSON.parse(localStorage.getItem("carrito")) || []; //if the shopping car has items, it will use it, otherwise will create the empty list to store the items to select

//Definiendo las clases que son los productos
class NewProduct{
    constructor(product, price, id, stock, description, image){
        this.product = product.charAt(0).toUpperCase() + product.slice(1).toLowerCase(); //To capitalize first letter only
        this.price = price;
        this.id = id;
        this.stock = stock;
        this.description = description;
        this.image = image;
    }

    addOrder(){
        if (this.stock > 0){
            Swal.fire({
                title: `Este producto tiene un costo de \$${this.price} MXN, ¿seguro que desea agregarlo al carrito?`,
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Sí, lo quiero!'
              }).then((result) => {
                if (result.isConfirmed) {
                    this.stock = this.stock - 1;
                    if (carrito.filter(x => x.producto == this.product).length <= 0){
                        const toadd = {
                            producto: this.product,
                            precio: this.price,
                            cantidad: 1
                        }
                        carrito.push(toadd);
                    }else{
                        let posicion = carrito.map(x => x.producto).indexOf(this.product); //we will identify the repeated item so we can change the quantity
                        carrito[posicion].cantidad += 1;
                    }
                    total += this.price;
                    localStorage.setItem("carrito", JSON.stringify(carrito)); //creating an HTML element to add in a table
                    Swal.fire({
                        icon: 'success',
                        title: `${this.product} se ha agregado a tu carrito.`,
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
              })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Lo sentimos, no contamos con más ${this.product} por el momento.`,
              })
        }
    }
}

var total = 0
const productos = [];

//Definiendo un fetch para simular la conexion con un JSON y obtener los productos
const productBuilder = async () => {
    var resp = await fetch("../../javascript/productos.json");
    var json = await resp.json()
    let aceites_html = document.getElementById("Aceites y Untables");
        aceites_html.innerHTML = ""
        json["Aceites y Untables"].forEach(element => { 
            productos.push(new NewProduct(element.producto, element.precio, element.id, element.stock, element.descripcion, element.image));
            aceites_html.innerHTML +=
            `
            <div class="card m-md-4 col-6 col-md-3 p-md-0 p-2">
                    <div class="flipcard d-flex justify-content-center align-items-center flex-grow-1">
                        <div class="flip__back d-md-flex justify-content-center align-items-center position-absolute text-center p-4 h-100 overflow-auto">
                            <p>${element.descripcion}</p>
                        </div>
                        <div class="flip__front d-md-flex justify-content-center align-items-center">
                            <img src=${element.image} alt="${element.descripcion}" class="card-img">
                        </div>
                    </div>
                    <div class="card-footer d-flex flex-column justify-content-center align-items-center">
                        <h5 class="text-center">${element.producto}</h5>
                        <button type="button" class="btn btn-secondary" onclick="agregarCarrito(${element.id})">Agregar al carrito</button>
                    </div>
            </div>
            `
        });
}
productBuilder()

localStorage.setItem("productos", JSON.stringify(productos));

var botones = [];
for (let ii=0; ii<productos.length; ii++){
    botones[ii] = document.getElementById(productos[ii].id);
}

function agregarCarrito(id){
    productos[productos.map(function(x){return x.id}).indexOf(id)].addOrder();
}