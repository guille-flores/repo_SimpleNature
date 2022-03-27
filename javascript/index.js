const login = confirm(`¡Bienvenido a Simple Nature! \n\n¿Desea iniciar sesión?`);
if(login){
    var usuario = new NewUser(prompt("Ingrese su nombre de usuario: "), prompt("Ingrese su contraseña: "), prompt("Ingrese su dirección: "));
    alert(`¡Hola ${usuario.name}!\n\nGracias por escoger Simple Nature, a continuación podrás seleccionar los productos que desees agregar al carrito.\n\n¡Por ser parte de nuestra comunidad, recibiras un descuento del 15%!`)
}else{
    alert("¡Hola!\n\nGracias por escoger Simple Nature, a continuación podrás seleccionar los productos que desees agregar al carrito.");
}


//Definiendo las clases que son los productos
const chia = {nombre: "Chia", price: 50, available: true};
const lenteja = {nombre: "Lenteja Criolla", price: 70, available: false};
const frijol = {nombre: "Frijol", price: 30, available: true};
const arroz = {nombre: "Arroz Blanco", price: 20, available: true};
const arrozint = {nombre: "Arroz Integral", price: 25, available: false};
const bebidacoco = {nombre: "Bebida de Coco", price: 25, available: true};
const bebidasoya = {nombre: "Bebida de Soya", price: 25, available: true};
const lecheent = {nombre: "Leche Entera", price: 15, available: true};
const lechelight = {nombre: "Leche Light", price: 18, available: true};
const chocolate = {nombre: "Chocolate", price: 18, available: true};
const nueces = {nombre: "Nuez de la India", price: 80, available: false};




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
                        total = total + agregarCarrito(chia);
                        break;
                    case "2":
                        total = total + agregarCarrito(lenteja);
                        break;
                    case "3":
                        total = total + agregarCarrito(frijol);
                        break;
                    default:
                        alert("Opción inválida, por favor ingrese solo el número de la opción deseada del menú.");
                }
                break;
            case "2": 
                producto = prompt("Ingrese solamente el número del producto a a elegir:\n\n1. Arroz Blanco\n\n2. Arroz Integral");
                switch(producto){
                    case "1":
                        total = total + agregarCarrito(arroz);
                        break;
                    case "2":
                        total = total + agregarCarrito(arrozint);
                        break;
                    default:
                        alert("Opción inválida, por favor ingrese solo el número de la opción deseada del menú.");
                }
                break;
            case "3": 
                producto = prompt("Ingrese solamente el número del producto a a elegir:\n\n1. Bebida de Coco\n\n2. Bebida de Soya");
                switch(producto){
                    case "1":
                        total = total + agregarCarrito(bebidacoco);
                        break;
                    case "2":
                        total = total + agregarCarrito(bebidasoya);
                        break;
                    default:
                        alert("Opción inválida, por favor ingrese solo el número de la opción deseada del menú.");
                }
                break;
            case "4": 
                producto = prompt("Ingrese solamente el número del producto a a elegir:\n\n1. Leche Entera\n\n2. Leche Light");
                switch(producto){
                    case "1":
                        total = total + agregarCarrito(lecheent);
                        break;
                    case "2":
                        total = total + agregarCarrito(lechelight);
                        break;
                    default:
                        alert("Opción inválida, por favor ingrese solo el número de la opción deseada del menú.");
                }
                break;
            case "5": 
                producto = prompt("Ingrese solamente el número del producto a a elegir:\n\n1. Chocolate amargo (barra 100g)\n\n2. Nuez de la India (500g)");
                switch(producto){
                    case "1":
                        total = total + agregarCarrito(chocolate);
                        break;
                    case "2":
                        total = total + agregarCarrito(nueces);
                        break;
                    default:
                        alert("Opción inválida, por favor ingrese solo el número de la opción deseada del menú.");
                }
                break;
            default:
                alert("Opción inválida, por favor ingrese solo el número de la opción deseada del menú.");
            
        }
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
        if(confirm(`¡Gracias por tu compra, ${usuario.name}!\n\nTu total es de \$${total} MXN, y cuentas con un descuento del 15%.\n\nEn total deberás pagar \$${total-discount(login, total)} MXN.\n\nSe te hará llegar tu pedido a ${usuario.direccion}. ¿Deseas continuar?`)){
            alert("!Gracias y vuelva pronto¡");
        }
    }else{
        let ubicacion = prompt(`¡Gracias por tu compra!\n\nTu total es de \$${total} MXN.\n\nPor favor ingresa tu dirección para enviar tu pedido.`);
        if(confirm(`La dirección es ${ubicacion}.\n\nEl total es de \$${total} MXN. ¿Deseas continuar?`)){
            alert("!Gracias y vuelva pronto¡");
        }
    }
}


function NewUser(name, password, direccion){
    this.name = name;
    this.password = password;
    this.direccion = direccion;
}

function agregarCarrito(product){
    if(product.available){
        if(confirm(`Este producto tiene un costo de \$${product.price} MXN, ¿seguro que desea agregarlo al carrito?`)){
            return parseFloat(product.price);
        }else{
            return 0
        }
    }else{
        alert(`Lo sentimos, por el momento no contamos con ${product.nombre}.`);
        return 0;
    }
}

function discount(aplicable, total){
    if(aplicable && total > 0){
        return total*0.15;
    }else{
        return 0;
    }
}