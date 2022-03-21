let user = prompt("Introduzca su nombre: ");
alert(`¡Hola ${user}! \n\nVamos a hacerte un par de preguntas. \n\nSi decides abandonar el cuestionario antes de terminarlo, por favor contesta la pregunta en la que te encuentres con la palabra "ESC".`);

let esc = true;
let score = 0;
let counter = 0;
while (esc && counter < 11){
    if (counter == 10){
        alert(`Ha concluido con el cuestionario, su puntaje fue ${score}/10. \n\n¡Muchas gracias!`);
        break;
    }
    let num1 = Math.floor(Math.random()*11); 
    let num2 = Math.floor(Math.random()*11); //Generando dos números del 0 al 10 al hacer floor para redondear al número inferior y random para que sean aleatorios
    let answer = prompt(`¿Cuánto es ${num1} x ${num2}?\n\nSi quieres suspender el cuestionario, ingresa la palabra "ESC"`);
    if (answer.toUpperCase() == "ESC"){ //Para salir del ciclo si se escribe cualquier variación (mayúsculas o minúsculas) de "ESC" (ya sea ESc, esc, eSc...)
        alert(`Ha decidido concluir con el cuestionario, su puntaje fue ${score}/10. \n\n¡Muchas gracias!`);
        break;
    }else{
        answer = parseFloat(answer); //convirtiendo a flotante
        if (answer == num1*num2){ 
            score++;
            alert("¡Su respuesta es correcta!");
        }else{
            alert(`Su respuesta fue ${answer}, y la correcta es ${num1*num2}.`);
        }
    }
    counter++;
}
