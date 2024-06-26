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

      //VALIDA INPUTS TIPO RADIO Y CHECKBOX
      /*
      if (
        e.target.value == "general-enquiry" ||
        e.target.value == "support-request"
      ) {
        console.log(e.target.value);
      } else {
        console.log("no valido");
      }
        */
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
    console.log(`Campo consulta: ${campos.consulta}`);
  } else {
    campos.consulta = false;
    console.log(`Campo consulta: ${campos.consulta}`);
  }
};
//funcion que valida input, en caso de verdadero modificara campo especifico en objeto llamado campos.
const validarTerminos = () => {
  const terminos = document.getElementById("check");
  if (terminos.checked) {
    campos.terminos = true;
    console.log(`Campo terminos: ${campos.terminos}`);
  } else {
    campos.terminos = false;
    console.log(`Campo terminos: ${campos.terminos}`);
  }
};

//funcion que  valida campo interactuado
const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    //todo correcto
    //elimina clase de incorrecto, quita borde rojo
    //elimina clase de incorrecto, quita mensaje color rojo
    //agrega clase de correcto, coloca borde verde
    /*
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-correcto");
    */
    //agrega verdadero cuando es valido campo
    campos[campo] = true;
    console.log(`${campo} correcto`);
  } else {
    //de no ser correcto
    //agrega clase de incorrecto, coloca borde rojo
    //agrega clase de incorrecto, coloca mensaje color rojo
    //elimina clase de correcto, quita borde verde
    /*
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-correcto");
    */
    //agrega falso cuando es invalido campo
    campos[campo] = false;
    console.log(`${campo} incorrecto`);
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
    //agregar mensaje de exito, agregando clase display on
    //remover clase de exito, setTimeout 5000
    //remueve bordes color verde de inputs exito
  } else {
    console.log("Formulario Invalido"); //invalido
    //agregar mensaje de error, agregando clase display on
    //remover clase de error, setTimeout 000
  }
});
