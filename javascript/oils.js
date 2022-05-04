const user = JSON.parse(sessionStorage.getItem("usuario")) || prompt("¡Bienvenido a Simple Nature!\n\nIngrese su nombre: "); //obtaining the user name or not if it already exists
sessionStorage.setItem("usuario", JSON.stringify(user));

var carrito = JSON.parse(localStorage.getItem("carrito")) || []; //if the shopping car has items, it will use it, otherwise will create the empty list to store the items to select

//Definiendo las clases que son los productos
class NewProduct{
    constructor(product, price, id, stock){
        this.product = product.charAt(0).toUpperCase() + product.slice(1).toLowerCase(); //To capitalize first letter only
        this.price = price;
        this.id = id;
        this.stock = stock;
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

productos.push(new NewProduct("Aceite de Aguacate", 80, "aceite_aguacate", 0));
productos.push(new NewProduct( "Aceite de Coco", 18, "aceite_coco", 10));
productos.push(new NewProduct( "Aceite de Girasol", 18, "aceite_girasol", 12));
productos.push(new NewProduct("Aceite de Oliva", 80, "aceite_oliva", 0));
productos.push(new NewProduct("Crema de Cacahuate", 80, "crema_cacahuate", 1));

var botones = [];
for (let ii=0; ii<productos.length; ii++){
    botones[ii] = document.getElementById(productos[ii].id);
}

console.log(botones.length)
console.log(botones[13])
botones[0].onclick = () => {total = total + agregarCarrito(productos[0].id)}; 
botones[1].onclick = () => {total = total + agregarCarrito(productos[1].id)};
botones[2].onclick = () => {total = total + agregarCarrito(productos[2].id)}; 
botones[3].onclick = () => {total = total + agregarCarrito(productos[3].id)}; 
botones[4].onclick = () => {total = total + agregarCarrito(productos[4].id)};   

function agregarCarrito(id){
    productos[productos.map(function(x){return x.id}).indexOf(id)].addOrder();
}
