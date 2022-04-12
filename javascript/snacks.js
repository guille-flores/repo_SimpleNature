
const carrito = [];
const hoy = new Date();
const arriving = new Date();
arriving.setDate(arriving.getDate()+7);

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

total = 0
const productos = [];
productos.push(new NewProduct("Almendras Cubiertas con Chocolate Amargo", 80, "almendras_cubiertas_chocolate", 5));
productos.push(new NewProduct( "Chocolate", 18, "chocolate_90", 2));
productos.push(new NewProduct("Almendras", 80, "almendras", 0));
productos.push(new NewProduct("Coco Rayado", 80, "coco_rayado", 3));

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

function agregarCarrito(id){
    return productos[productos.map(function(x){return x.id}).indexOf(id)].addOrder();
}