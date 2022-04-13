let user = prompt("¡Bienvenido a Simple Nature!\n\nIngrese su nombre: ");
const carrito = [];
const hoy = new Date();
const arriving = new Date();
arriving.setDate(arriving.getDate()+7);
var mainpage = document.getElementById("mainpage__general");

let h2 = document.createElement("h2");
h2.innerHTML = `Hola ${user}, por favor selecciona tus productos.`;
mainpage.prepend(h2);
let h1 = document.createElement("h1");
h1.innerHTML = `Su carrito tiene los siguientes productos:`;
mainpage.append(h1)

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
                if (!carrito.includes(this.product)){
                    carrito.push(this.product);
                    alert(`${this.product} se ha agregado al carrito, tu total es de \$${total+this.price}\n\nSerá entregado en ${arriving}`);
                    let li = document.createElement("li");
                    li.innerHTML = this.product;
                    mainpage.append(li);
                }
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

var botones = [];
for (let ii=0; ii<productos.length; ii++){
    botones[ii] = document.getElementById(productos[ii].id);
}

botones[0].onclick = () => {total = total + agregarCarrito(productos[0].id)}; 
botones[1].onclick = () => {total = total + agregarCarrito(productos[1].id)}; 
botones[2].onclick = () => {total = total + agregarCarrito(productos[2].id)}; 
botones[3].onclick = () => {total = total + agregarCarrito(productos[3].id)}; 
botones[4].onclick = () => {total = total + agregarCarrito(productos[4].id)}; 
botones[5].onclick = () => {total = total + agregarCarrito(productos[5].id)}; 
botones[6].onclick = () => {total = total + agregarCarrito(productos[6].id)}; 
botones[7].onclick = () => {total = total + agregarCarrito(productos[7].id)}; 
botones[8].onclick = () => {total = total + agregarCarrito(productos[8].id)}; 
botones[9].onclick = () => {total = total + agregarCarrito(productos[9].id)}; 
botones[10].onclick = () => {total = total + agregarCarrito(productos[10].id)}; 
botones[11].onclick = () => {total = total + agregarCarrito(productos[11].id)}; 
botones[12].onclick = () => {total = total + agregarCarrito(productos[12].id)}; 

function agregarCarrito(id){
    return productos[productos.map(function(x){return x.id}).indexOf(id)].addOrder();
}

