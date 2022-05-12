const hoy = new Date();
const arriving = new Date();
arriving.setDate(arriving.getDate()+7);
let carrito = JSON.parse(localStorage.getItem("carrito")); //retrieving the shopping car
let productos = JSON.parse(localStorage.getItem("productos")) //retrieving the products we have 
crearProductoCarrito()
var total = 0;

function crearProductoCarrito(){
    let tabla = document.getElementById("tcarrito");
    tabla.innerHTML = "";
    total = 0;
    carrito.length == 0 && Swal.fire('¡Oh no!\nTu carrito está vacío.'); //showing an alert in case the car is empty
    for (let ii=0; ii<carrito.length; ii++){ //to modify the rows of the products the user has in their car to show in HTML
        let articulo = carrito[ii].producto;
        let precio = carrito[ii].precio;
        let cantidad = carrito[ii].cantidad;
        let totalArticulo = parseInt(cantidad)*parseFloat(precio);
        tabla.innerHTML += 
        `
        <tr id="${ii}">
            <td>${articulo}</td>
            <td>$${precio}</td>
            <td>${cantidad}</td>
            <td>$${totalArticulo}</td>
            <td><button class="btn btn-danger" onClick="eliminarArticulo(${ii})">Eliminar</button></td>
        </tr>
        `;
        total += totalArticulo;
    }

    let footercarrito = document.getElementById("carritototal")
    footercarrito.innerHTML = 
    `
    <tr>
        <td class="right" colspan="3">Total:</td><td class="right">$${total}</td><td><button class="btn btn-success" onClick="checkoutPago(${total})">Proceder al Pago</button></td>
    </tr>
    `;
    localStorage.setItem("carrito", JSON.stringify(carrito)); //updating the shopping car
}

function eliminarArticulo(ii){
    Swal.fire({
        title: '¿Estás seguro de que deseas eliminar este producto de tu carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, elimínalo!'
      }).then((result) => {
        if (result.isConfirmed) {
            let articulocarrito = document.getElementById(`${ii}`);
            for (let ii=0; ii<productos.length; ii++){
                if (productos[ii].product == articulocarrito.getElementsByTagName("td")[0].innerText){ //We will find the product and increment the stock as we will delete it from the car
                    productos[ii].stock += 1;
                    total -= productos[ii].price*parseFloat(articulocarrito.getElementsByTagName("td")[2].innerText);
                }
            }
            articulocarrito.innerHTML = ""; //we make the table blank
            carrito.splice(ii,1) //removing the element from the array so it doesn't get written again
            crearProductoCarrito();
            localStorage.setItem("carrito", JSON.stringify(carrito)); //updating the shopping car

            Swal.fire({
                icon: 'success',
                title: 'Artículo eliminado',
                showConfirmButton: false,
                timer: 1000
              })
        }
      })
}


function checkoutPago(total){
    if (total > 0) {
        let checkoutPago = document.getElementById("payment");
        checkoutPago.style.display = "block";
        let totalPago = document.getElementById("totalcheckout")
        totalPago.innerHTML = `Total = $${total}`
    }else{
        Swal.fire('¡No podemos proceder a un pago!\nTu carrito está vacío.');
    }
}

let form = document.getElementById("formCheckout")
form.onsubmit = function(){
    Swal.fire({
        title: '¿Estás seguro de que deseas realizar el pago?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, lo quiero!'
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: '¡Gracias! Te notificaremos por medio de correo electrónico la información de tu pedido.',
                showConfirmButton: false,
                timer: 4000
              })
        }
      })
    document.getElementById("payment").style.display = "none";
}

document.getElementById("closeCheckout").addEventListener("click", function(){
    document.getElementById("payment").style.display = "none";
})
