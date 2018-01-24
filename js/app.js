$(document).ready(function(){
   setTimeout("$('.popup').hide();", 2000);
});
var pin; // Variable que guardará el pin que el sistema le genere al usuario
var telephoneNumber; // Variable que guardará el número de teléfono introducido por el usuario
var countryCode; // Variable que guardará el código de país seleccionado por el usuario

$(document).ready(function(){
   setTimeout("$('.popup').hide();", 1000);
});


function loadPage(){
  $("#send").attr('disabled', true); // Por defecto, el botón de enviar aparece como deshabilitado al cargar la página
  $("#next").attr('disabled', true); // Por defecto se deshabilita el botón next de la vista de verificación de PIN
  $("#verify").hide(); // Se oculta por defecto la vista de verificación de PIN
}

/*
Función que valida los caracteres escritos por el usuario en los inputs telephone e inputPin, es decir, solo
permite que el usuario introduzca valores numéricos en estos input y mientras esta condición no se cumpla, el
input no aceptará el valor introducido por el usuario, además de que el botón send o next (según sea el caso)
permanecerá deshabilitado.
Si el valor introducido es un número, es aceptado por el input, hasta alcanzar 10 o 3 valores numéricos
consecutivos (según sea el caso), en caso contrario, el valor no será aceptado.
Por otra parte, una vez que el input contenga 10 o 3 dígitos (según sea el caso), se procede a habilitar el
botón send o next (según sea el caso), permitiendo al usuario continuar con el proceso.
*/
function doValidation(elementType){
  if(elementType == "tel"){
    var validPhone = /^[0-9]{10}$/; // Expresión regular que involucra a una cadena con 10 dígitos
    var validChars = /^[0-9]{1,10}$/; // Expresión regular que permite formar una cadena desde 1 hasta 10 dígitos
    if($("#telephone").val().length>0 && $("#telephone").val().length<11 && $("#telephone").val().match(validChars)){
      if($("#telephone").val().match(validPhone)){ // Si el valor del input es una cadena de 10 dígitos (es decir, un número telefónico válido)
        console.log("Teléfono válido!");
        telephoneNumber = $("#telephone").val(); // Se guarda el teléfono válido en telephoneNumber para usarse en la siguiente vista
        $("#send").attr('disabled', false); // Se modifica la propiedad 'disabled' del botón a false (Se activa el botón)
      }
      else{
        console.log("Teléfono no válido");
        $("#send").attr('disabled', true); // Se modifica la propiedad 'disabled' del botón a true (Se desactiva el botón)
      }
    }
    else
      $("#telephone").val($("#telephone").val().substr(0, $("#telephone").val().length-1)); // Se quita del valor del input el último caracter no válido introducido, es decir, se recorta la cadena a n-1
  }
  else if(elementType == "pin"){
    var validPin = /^[0-9]{3}$/; // Expresión regular que involucra a una cadena con 10 dígitos
    var validChars = /^[0-9]{1,3}$/; // Expresión regular que permite formar una cadena desde 1 hasta 10 dígitos
    if($("#inputPin").val().length>0 && $("#inputPin").val().length<4 && $("#inputPin").val().match(validChars)){
      if($("#inputPin").val().match(validPin) && $("#inputPin").val() == pin){ // Si el valor del input es una cadena de 3 dígitos (es decir, un PIN) y además coincide con el PIN generado por el sistema
        console.log("PIN válido!");
        $("#next").attr('disabled', false); // Se modifica la propiedad 'disabled' del botón a false (Se activa el botón)
      }
      else{
        console.log("PIN no válido");
        $("#next").attr('disabled', true); // Se modifica la propiedad 'disabled' del botón a true (Se desactiva el botón)
      }
    }
    else
      $("#inputPin").val($("#inputPin").val().substr(0, $("#inputPin").val().length-1)); // Se quita del valor del input el último caracter no válido introducido, es decir, se recorta la cadena a n-1
  }
}

function generatePIN(isFirst){
  pin = parseInt(Math.random()*1000); // Se genera el pin como un número aleatorio entero entre 0 y 999
  alert("Tu código es: LAB-"+pin); // Se muestra el cuadro de diálogo con el pin generado
  if(isFirst){ // Si es la primera vez que se genera un pin, significa que el usuario está en la vista principal
    $("#main").hide(); // Se oculta la vista principal y
    $("#verify").show(); // se muestra la vista de verificación de PIN
    countryCode = $("#country").val(); // Se guarda el código de país en countryCode para usarlo en la siguiente vista
    $("#phoneNumberMsg").html("Introduce el código enviado a "+countryCode+telephoneNumber); // Se muestra al usuario un mensaje personalizado con el código de país y teléfono introducido en la vista anterior
  }
  else{
    $("#next").attr('disabled', true); // Previene la entrada con un PIN caducado
  }
}

$(document).ready(loadPage);
