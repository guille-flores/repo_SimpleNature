const login = confirm(`¡Bienvenido a Simple Nature! \n\n¿Desea iniciar sesión?`);
if(login){
    var usuario = new NewUser(prompt("Ingrese su nombre de usuario: "), prompt("Ingrese su contraseña: "), prompt("Ingrese su dirección: "));
    alert(`¡Hola ${usuario.name}!\n\nGracias por escoger Simple Nature, a continuación podrás seleccionar los productos que desees agregar al carrito.\n\n¡Por ser parte de nuestra comunidad, recibiras un descuento del 15%!`)
}else{
    alert("¡Hola!\n\nGracias por escoger Simple Nature, a continuación podrás seleccionar los productos que desees agregar al carrito.");
}

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

const productos = [];
productos.push(new NewProduct("ChIA", 50, 123212441, 5));
productos.push(new NewProduct("lenteja criolla", 50, 12323241, 0));
productos.push(new NewProduct("Frijol", 30, 2131241, 2));
productos.push(new NewProduct("Arroz Blanco", 20, 213415, 1));
productos.push(new NewProduct("Arroz Integral", 25, 21324, 0));
productos.push(new NewProduct("Bebida de Coco", 25,416663, 4));
productos.push(new NewProduct("Bebida de Soya", 25, 1414244, 10));
productos.push(new NewProduct("Leche Entera", 15, 54325, 8));
productos.push(new NewProduct("Leche Light", 18, 4433434, 9));
productos.push(new NewProduct( "Chocolate", 18, 55425, 2));
productos.push(new NewProduct("Nuez de la India", 80, 21321, 0));

var finalizar = false; //Para terminar las compras e ir a pagar
var cancelled = false; //en caso de que el usuario seleccione cancelar
var total = 0; //Para el total

while(!finalizar){
    let opcion = prompt("Ingrese solamente el número del producto u opción a elegir. Por ejemplo, ingrese \"1\" si desea legumbres y leguminosas. Las opciones son:\n\n1. Legumbres y Leguminosas\n\n2. Cereales\n\n3. Bebidas\n\n4. Lácteos\n\n5. Snacks y Chocolates");
    if(opcion){
        switch(opcion){
            case "1":
                var producto = prompt("Ingrese solamente el número del producto a a elegir:\n\n1. Chía\n\n2. Lentejas\n\n3. Frijol"); 
                switch(producto){
                    case "1":
                        total = total + agregarCarrito("chia");
                        break;
                    case "2":
                        total = total + agregarCarrito("lenteja criolla");
                        break;
                    case "3":
                        total = total + agregarCarrito("frijol");
                        break;
                    default:
                        alert("Opción inválida, por favor ingrese solo el número de la opción deseada del menú.");
                }
                break;
            case "2": 
                producto = prompt("Ingrese solamente el número del producto a a elegir:\n\n1. Arroz Blanco\n\n2. Arroz Integral");
                switch(producto){
                    case "1":
                        total = total + agregarCarrito("arroz blanco");
                        break;
                    case "2":
                        total = total + agregarCarrito("arroz integral");
                        break;
                    default:
                        alert("Opción inválida, por favor ingrese solo el número de la opción deseada del menú.");
                }
                break;
            case "3": 
                producto = prompt("Ingrese solamente el número del producto a a elegir:\n\n1. Bebida de Coco\n\n2. Bebida de Soya");
                switch(producto){
                    case "1":
                        total = total + agregarCarrito("bebida de coco");
                        break;
                    case "2":
                        total = total + agregarCarrito("bebida de soya");
                        break;
                    default:
                        alert("Opción inválida, por favor ingrese solo el número de la opción deseada del menú.");
                }
                break;
            case "4": 
                producto = prompt("Ingrese solamente el número del producto a a elegir:\n\n1. Leche Entera\n\n2. Leche Light");
                switch(producto){
                    case "1":
                        total = total + agregarCarrito("leche entera");
                        break;
                    case "2":
                        total = total + agregarCarrito("leche light");
                        break;
                    default:
                        alert("Opción inválida, por favor ingrese solo el número de la opción deseada del menú.");
                }
                break;
            case "5": 
                producto = prompt("Ingrese solamente el número del producto a a elegir:\n\n1. Chocolate amargo (barra 100g)\n\n2. Nuez de la India (500g)");
                switch(producto){
                    case "1":
                        total = total + agregarCarrito("chocolate");
                        break;
                    case "2":
                        total = total + agregarCarrito("nuez de la india");
                        break;
                    default:
                        alert("Opción inválida, por favor ingrese solo el número de la opción deseada del menú.");
                }
                break;
            default:
                alert("Opción inválida, por favor ingrese solo el número de la opción deseada del menú.");
            
        }
    }else if(opcion == ''){
        alert("Opción inválida, por favor ingrese solo el número de la opción deseada del menú.");
    }else{
        cancelled = true;
        break; 
    }
    if(!confirm("¿Desea agregar otro producto?")){
        finalizar = true;
        cancelled = false;
    }
}

if(!cancelled){
    if(login){
        if(confirm(`¡Gracias por tu compra, ${usuario.name}!\n\nTu total es de \$${total} MXN, y cuentas con un descuento del 15%.\n\nEn total deberás pagar \$${total-discount(login, total)} MXN.\n\nSe te hará llegar tu pedido a ${usuario.direccion}.\n\nTu pedido incluye ${carrito.join(', ')}\n\n¿Deseas continuar?`)){
            alert(`Su pedido llegará el ${arriving.toLocaleDateString()}.\n\n¡Gracias y vuelva pronto!`);
        }
    }else{
        let ubicacion = prompt(`¡Gracias por tu compra!\n\nTu total es de \$${total} MXN.\n\nPor favor ingresa tu dirección para enviar tu pedido.`);
        if(confirm(`La dirección es ${ubicacion}.\n\nEl total es de \$${total} MXN.\n\nTu pedido incluye ${carrito.join(', ')}\n\n¿Deseas continuar?`)){
            alert(`Su pedido llegará el ${arriving.toLocaleDateString()}.\n\n¡Gracias y vuelva pronto!`);
        }
    }
}


function NewUser(name, password, direccion){
    this.name = name;
    this.password = password;
    this.direccion = direccion;
}

function agregarCarrito(nameprod){
    return productos[productos.map(function(x){ return x.product.toLowerCase()}).indexOf(nameprod.toLowerCase())].addOrder();
}

function discount(aplicable, total){
    if(aplicable && total > 0){
        return total*0.15;
    }else{
        return 0;
    }
}