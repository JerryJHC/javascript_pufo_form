//Contiene una lista con las expresiones a evaluar
var regexList = {
    "nombre": /^[A-Za-zÁ-Úá-ú\ ]{2,15}$/,
    "apellido": /^[A-Za-zÁ-Úá-ú\ ]{2,15}$/,
    "usuario": /^\w[\w\.]+@pufo\.es$/,
    "telefono": /^$|^[69][\d]{8}$/,
    "password": /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@\.#$%&_]).{8,}/
}

var fieldList = {
    "nombre": { "error": "El nombre solo debe contener letras" },
    "apellido": { "error": "El apellido solo debe contener letras" },
    "usuario": { "error": "El email debe pertenecer a Pufo S.A." },
    "telefono": { "error": "El número de teléfono no es válido" },
    "password": { "error": "Debe tener al menos ocho caracteres y contener al menos una letra minúscula, una mayúscula, un número y un símbolo" },
    "fechaContrato": { "error": "La fecha de contrato no es válida" },
    "salario": { "error": "El salario debe estar entre 858.55€ y 12000€" },
    "passwordReply": { "error": "La contraseña no coincide" },
    "trabajo": {},
    "jefe": {}
}

//Valida que todos los campos esten rellenados correctamente
function validateForm() {
    let res = true;
    //Valida cada uno de los campos por regex
    for (let key in regexList) {
        if (!evalRegex(key, document.forms["register"][key].value)) {
            setMsg(key, fieldList[key].error);
            res = false;
        } else setMsg(key, '');
    }

    if (!validateDate()) {
        setMsg('fechaContrato', fieldList['fechaContrato'].error);
        res = false;
    } else setMsg('fechaContrato', '');

    if (!validateSalary()) {
        setMsg('salario', fieldList['salario'].error);
        res = false;
    } else setMsg('salario', '');
    return res;
}

//Evalua si la fecha de contrato es valida
function validateDate() {
    let date = new Date(document.forms['register']['fechaContrato'].value);
    let today = new Date();
    return date <= today;
}

//Valida el salario
function validateSalary() {
    let sal = document.forms['register']['salario'].value;
    if (!isNaN(sal)) {
        return sal >= 858.55 && sal <= 120000;
    }
    return false;
}

//Evalua una expresion del formulario
function evalRegex(field, value) {
    let regex = new RegExp(regexList[field]);
    return regex.test(value);
}

//Muestra u oculta el mensaje de error
function setMsg(field, value) {
    document.querySelector("span[for=" + field + "]").textContent = value;
}

//Guarda el usuario en una cookie con el email como clave
function saveUser(email, data) {
    let d = new Date();
    d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = email + "=" + data + ";" + expires + ";path=/";
}

window.onload = () => {
    for (let key in fieldList) {
        if (key == 'fechaContrato')
            document.querySelector("input[name=" + key + "]").onchange = validateForm;
        else
            document.querySelector("input[name=" + key + "]").onkeyup = validateForm;
    }
}