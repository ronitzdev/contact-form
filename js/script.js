//variables
const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");
const textarea = document.getElementById("message");
//console.log(formulario);
//console.log(inputs);
//console.log(textarea);

//expressions
const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  mensaje: /^.{1,1000}$/,
};
//campos
const campos = {
  nombre: false,
  apellido: false,
  correo: false,
  consulta: false,
  mensaje: false,
  terminos: false,
};

//funcion que valida formulario, ejecuta validacion de cada campo
const validarFormulario = (e) => {
  switch (e.target.name) {
    case "first-name":
      validarCampo(expresiones.nombre, e.target, "nombre");
      break;
    case "last-name":
      validarCampo(expresiones.apellido, e.target, "apellido");
      break;
    case "email":
      validarCampo(expresiones.correo, e.target, "correo");
      break;
    case "query-type":
      validarConsulta();
      break;
    case "message":
      validarCampo(expresiones.mensaje, e.target, "mensaje");
      break;
    case "terms":
      validarTerminos();
      break;
  }
};
const validarConsulta = () => {
  // Obtener todos los inputs tipo radio con name="opcion"
  var radios = document.querySelectorAll('input[name="query-type"]');
  var radio1 = radios[0];
  var radio2 = radios[1];
  // Verificar si alguno está seleccionado
  if (radio1.checked || radio2.checked) {
    campos.consulta = true;
    //quitar lo incorrecto
    //poner lo correcto
    document.getElementById("label--pad-bottom").classList.add("label_valido");
    console.log("consulta correcta");
  } else {
    campos.consulta = false;
    console.log("consulta incorrecta");
    //no se hace necesario quitar lo correcto, ya no se puede borrar seleccion
  }
};
//funcion que valida input, en caso de verdadero modificara campo especifico en objeto llamado campos.
const validarTerminos = () => {
  const terminos = document.getElementById("check");
  if (terminos.checked) {
    campos.terminos = true;
    console.log("terminos correcto");
    //quitar lo incorrecto
    document
      .getElementById("label_terminos")
      .classList.remove("label_invalido");
    //poner lo correcto
    document.getElementById("label_terminos").classList.add("label_valido");
  } else {
    campos.terminos = false;
    console.log("terminos incorrecto");
    //quitar lo correcto
    document.getElementById("label_terminos").classList.remove("label_valido");
    //poner lo incorrecto
    document.getElementById("label_terminos").classList.add("label_invalido");
  }
};

//funcion que  valida campo interactuado
const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    campos[campo] = true;
    console.log(`${campo} correcto`);
    //quitar lo incorrecto
    document
      .getElementById(`label_${campo}`)
      .classList.remove("label_invalido");
    if (campo == "mensaje") {
      document.getElementById("message").classList.remove("input_invalido");
    } else {
      document
        .getElementById(`input_${campo}`)
        .classList.remove("input_invalido");
    }
    //poner lo correcto
    document.getElementById(`label_${campo}`).classList.add("label_valido");
    if (campo == "mensaje") {
      document.getElementById("message").classList.add("input_valido");
    } else {
      document.getElementById(`input_${campo}`).classList.add("input_valido");
    }
  } else {
    campos[campo] = false;
    console.log(`${campo} incorrecto`);
    //quitar lo correcto
    document.getElementById(`label_${campo}`).classList.remove("label_valido");
    if (campo == "mensaje") {
      document.getElementById("message").classList.remove("input_valido");
    } else {
      document
        .getElementById(`input_${campo}`)
        .classList.remove("input_valido");
    }
    //poner lo incorrecto
    document.getElementById(`label_${campo}`).classList.add("label_invalido");
    if (campo == "mensaje") {
      document.getElementById("message").classList.add("input_invalido");
    } else {
      document.getElementById(`input_${campo}`).classList.add("input_invalido");
    }
  }
};
//monitorea formulario y valida campos
//validacion con funcion validarFormulario();
inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
  textarea.addEventListener("blur", validarFormulario);
});
//submit button
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const terminos = document.getElementById("check");
  if (
    campos.nombre &&
    campos.apellido &&
    campos.correo &&
    campos.consulta &&
    campos.mensaje &&
    terminos.checked
  ) {
    console.log("Formulario Valido"); //valido
    formulario.reset();
    //body
    document.querySelector("body").classList.add("success-form");
    //message
    document.getElementById("success").classList.add("success_on");
    // Llamar a la función cuando sea necesario
    scrollToTop();
    //ocultar mensaje de exito
    setTimeout(() => {
      document.getElementById("success").classList.remove("success_on");
      document.querySelector("body").classList.remove("success-form");
      //INICIO ELIMINAR ESTILOS SUCCESS
      // Inputs
      inputs.forEach((input) => {
        input.classList.remove("input_valido", "input_invalido");
      });
      // Textarea
      textarea.classList.remove("input_valido", "input_invalido");
      // Labels
      document
        .querySelectorAll(".label_valido, .label_invalido")
        .forEach((label) => {
          label.classList.remove("label_valido", "label_invalido");
        });
      //FIN ELIMINAR ESTILOS SUCCESS
    }, 5000);
    //eliminar campos validos (internamente cambia valor valides campos false)
    for (let key in campos) {
      campos[key] = false;
    }
    //remueve estilos de exito de elementos
  } else {
    console.log("Formulario Invalido"); //invalido
    //agregar mensaje de error, agregando clase display on
    //remover clase de error, setTimeout 000
  }
});
//modificar contador caracteres
// Obtener el elemento del textarea y el div del contador
var mensaje = document.getElementById("message");
var contadorCaracteres = document.getElementById("contador-caracteres");

// Añadir evento 'input' para detectar cambios en el textarea
mensaje.addEventListener("input", function () {
  // Obtener la longitud actual del texto dentro del textarea
  var longitudTexto = mensaje.value.length;

  // Actualizar el texto del contador
  contadorCaracteres.textContent = longitudTexto + " / 1000 caracteres";
});

// Scroll hacia el inicio de la página
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Esto hace que el desplazamiento sea suave
  });
}
