// Variables
const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");
const textarea = document.getElementById("message");

// Expresiones regulares para validación
const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  mensaje: /^.{1,1000}$/,
};

// Campos y su estado de validación
const campos = {
  nombre: false,
  apellido: false,
  correo: false,
  consulta: false,
  mensaje: false,
  terminos: false,
};

// Función que valida el formulario
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

// Función para validar el tipo de consulta seleccionada
const validarConsulta = () => {
  var radios = document.querySelectorAll('input[name="query-type"]');
  var radio1 = radios[0];
  var radio2 = radios[1];

  if (radio1.checked || radio2.checked) {
    campos.consulta = true;
    document.getElementById("label--pad-bottom").classList.add("label_valido");
    console.log("consulta correcta");
  } else {
    campos.consulta = false;
    console.log("consulta incorrecta");
  }
};

// Función para validar la aceptación de términos
const validarTerminos = () => {
  const terminos = document.getElementById("check");

  if (terminos.checked) {
    campos.terminos = true;
    console.log("terminos correcto");
    document
      .getElementById("error_terminos")
      .classList.remove("error_message_activo");
    document.getElementById("label_terminos").classList.add("label_valido");
    document
      .getElementById("error_terminos")
      .classList.remove("error_message--activo");
  } else {
    campos.terminos = false;
    console.log("terminos incorrecto");
    document
      .getElementById("error_terminos")
      .classList.add("error_message_activo");
    document.getElementById("label_terminos").classList.remove("label_valido");
    document
      .getElementById("error_terminos")
      .classList.add("error_message--activo");
  }
};

// Función para validar campos individuales
const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    campos[campo] = true;
    console.log(`${campo} correcto`);

    if (campo === "mensaje") {
      document.getElementById("message").classList.remove("input_invalido");
      document
        .getElementById(`error_${campo}`)
        .classList.remove("error_message_activo");
      document.getElementById("message").classList.add("input_valido");
    } else {
      document
        .getElementById(`input_${campo}`)
        .classList.remove("input_invalido");
      document
        .getElementById(`error_${campo}`)
        .classList.remove("error_message_activo");
      document.getElementById(`input_${campo}`).classList.add("input_valido");
    }

    document
      .getElementById(`label_${campo}`)
      .classList.remove("label_invalido");
    document.getElementById(`label_${campo}`).classList.add("label_valido");
  } else {
    campos[campo] = false;
    console.log(`${campo} incorrecto`);

    document
      .getElementById(`error_${campo}`)
      .classList.add("error_message_activo");
    document.getElementById(`label_${campo}`).classList.remove("label_valido");
    document.getElementById(`label_${campo}`).classList.add("label_invalido");

    if (campo === "mensaje") {
      document.getElementById("message").classList.remove("input_valido");
      document.getElementById("message").classList.add("input_invalido");
    } else {
      document
        .getElementById(`input_${campo}`)
        .classList.remove("input_valido");
      document.getElementById(`input_${campo}`).classList.add("input_invalido");
    }
  }
};

// Event listeners para validar formulario
inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});
textarea.addEventListener("blur", validarFormulario);

// Event listener para submit del formulario
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
    console.log("Formulario Valido");
    formulario.reset();
    document.querySelector("body").classList.add("success-form");
    document.getElementById("success").classList.add("success_on");
    scrollToTop();

    setTimeout(() => {
      document.getElementById("success").classList.remove("success_on");
      document.querySelector("body").classList.remove("success-form");

      // Eliminar estilos de éxito
      inputs.forEach((input) => {
        input.classList.remove("input_valido", "input_invalido");
      });
      textarea.classList.remove("input_valido", "input_invalido");
      document
        .querySelectorAll(".label_valido, .label_invalido")
        .forEach((label) => {
          label.classList.remove("label_valido", "label_invalido");
        });
    }, 5000);

    // Reiniciar estado de campos
    for (let key in campos) {
      campos[key] = false;
    }
  } else {
    console.log("Formulario Invalido");
    // Agregar manejo de error aquí
  }
});

// Contador de caracteres para el textarea
var mensaje = document.getElementById("message");
var contadorCaracteres = document.getElementById("contador-caracteres");

mensaje.addEventListener("input", function () {
  var longitudTexto = mensaje.value.length;
  contadorCaracteres.textContent = longitudTexto + " / 1000 caracteres";
});

// Función para hacer scroll hacia el inicio
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
