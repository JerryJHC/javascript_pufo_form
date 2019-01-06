//Contiene una lista con las expresiones a evaluar
var regexList = {
    "nombre": /^[A-Za-zÁ-Úá-ú\ ]{2,15}$/,
    "apellido": /^[A-Za-zÁ-Úá-ú\ ]{2,15}$/,
    "usuario": /^\w[\w\.]+@pufo\.es$/,
    "telefono": /^$|^[69][\d]{8}$/
}

//Valida que todos los campos esten rellenados correctamente
function validateForm() {
    for (let item in regexList) {
        if (!evalRegex(item, document.forms["register"][item].value)) {
            setMsg(item, false);
            return false;
        } else setMsg(item, true);
    }
    return true;
}

//Evalua una expresion del formulario
function evalRegex(field, value) {
    let regex = new RegExp(regexList[field]);
    return regex.test(value);
}

//Muestra u oculta el mensaje de error
function setMsg(field, value) {
    document.querySelector(".msg[data-field=" + field + "]").hidden = value;
}