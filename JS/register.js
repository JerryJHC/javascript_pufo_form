//Contiene una lista con las expresiones a evaluar
var regexList = {
    "nombre": { "regex": /^[A-Za-zÁ-Úá-ú\ ]{2,15}$/, "error": "El nombre solo debe contener letras" },
    "apellido": { "regex": /^[A-Za-zÁ-Úá-ú\ ]{2,15}$/, "error": "El apellido solo debe contener letras" },
    "usuario": { "regex": /^\w[\w\.]+@pufo\.es$/, "error": "El email debe pertenecer a Pufo S.A." },
    "telefono": { "regex": /^$|^[69][\d]{8}$/, "error": "El número de teléfono no es válido" },
    "password": { "regex": /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@\.#$%&_]).{8,}/, "error": "Debe tener al menos ocho caracteres y contener al menos una letra minúscula, una mayúscula, un número y un símbolo" }
}

//Valida que todos los campos esten rellenados correctamente
function validateForm() {
    for (let key in regexList) {
        if (!evalRegex(key, document.forms["register"][key].value)) {
            setMsg(key, regexList[key].error);
            return false;
        } else setMsg(key, '');
    }
    return true;
}

//Evalua una expresion del formulario
function evalRegex(field, value) {
    let regex = new RegExp(regexList[field].regex);
    return regex.test(value);
}

//Muestra u oculta el mensaje de error
function setMsg(field, value) {
    document.querySelector("input[name=" + field + "]").setCustomValidity(value);
}

window.onload = () => {
    for (let key in regexList) {
        document.querySelector("input[name=" + key + "]").onkeyup = validateForm;
    }
}