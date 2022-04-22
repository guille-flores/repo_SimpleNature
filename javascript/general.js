if(sessionStorage.getItem("usuario") == "null"){
    let user = prompt("¡Bienvenido a Simple Nature!\n\nIngrese su nombre: ");
    sessionStorage.setItem('usuario', user);
}

if(localStorage.getItem("carrito").length != "null"){
    var carrito = JSON.parse(localStorage.getItem("carrito")); //obtaining the shopping car in case the user edited it so we can work over it
}else{
    var carrito = [];
}

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
            if(confirm(`Este producto tiene un costo de \$${this.price} MXN, ¿seguro que desea agregarlo al carrito?`)){
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
                alert(`${this.product} se ha agregado al carrito`);
                return parseFloat(this.price);
            }else{
                return 0;
            }
        }else{
            alert(`Lo sentimos, por el momento no contamos con ${this.product}.`);
            return 0;
        }
    }
}

var total = 0
const productos = [];
productos.push(new NewProduct("ChIA", 50, "chia", 5));
productos.push(new NewProduct("lenteja criolla", 50, "lenteja_criolla", 1));
productos.push(new NewProduct("Frijol Negro", 30, "frijol_negro", 2));
productos.push(new NewProduct("Frijol Pinto", 30, "frijol_pinto", 2));
productos.push(new NewProduct("Arroz Blanco", 20, "arroz_blanco", 1));
productos.push(new NewProduct("Arroz Integral", 25, "arroz_integral", 0));
productos.push(new NewProduct("Bebida de Coco", 25,"agua_coco", 4));
productos.push(new NewProduct("Alimento Líquido de Coco", 25,"leche_coco", 4));
productos.push(new NewProduct("Bebida de Coco sin Azúcar", 25,"agua_coco_sa", 4));
productos.push(new NewProduct("Bebida de Almendras", 25,"agua_almendras", 4));
productos.push(new NewProduct("Bebida de Almendras sin Azúcar", 30, "agua_almendras_sa", 10));
productos.push(new NewProduct( "Alimento Líquido de Macadamia", 18, "agua_macadamia", 2));
productos.push(new NewProduct("Jugo de Manzana", 80, "jugo_manzana", 5));
localStorage.setItem("productos", JSON.stringify(productos));

var botones = [];
for (let ii=0; ii<productos.length; ii++){
    botones[ii] = document.getElementById(productos[ii].id);
}

botones[0].onclick = () => {agregarCarrito(productos[0].id)}; 
botones[1].onclick = () => {agregarCarrito(productos[1].id)}; 
botones[2].onclick = () => {agregarCarrito(productos[2].id)}; 
botones[3].onclick = () => {agregarCarrito(productos[3].id)}; 
botones[4].onclick = () => {agregarCarrito(productos[4].id)}; 
botones[5].onclick = () => {agregarCarrito(productos[5].id)}; 
botones[6].onclick = () => {agregarCarrito(productos[6].id)}; 
botones[7].onclick = () => {agregarCarrito(productos[7].id)}; 
botones[8].onclick = () => {agregarCarrito(productos[8].id)}; 
botones[9].onclick = () => {agregarCarrito(productos[9].id)}; 
botones[10].onclick = () => {agregarCarrito(productos[10].id)}; 
botones[11].onclick = () => {agregarCarrito(productos[11].id)}; 
botones[12].onclick = () => {agregarCarrito(productos[12].id)}; 

function agregarCarrito(id){
    productos[productos.map(function(x){return x.id}).indexOf(id)].addOrder();
}

