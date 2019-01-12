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

var formName = 'register'

//Valida que todos los campos esten rellenados correctamente
function validateForm() {
    let res = true;
    //Valida cada uno de los campos por regex
    for (let key in regexList) {
        if (!evalRegex(key, document.forms[formName][key].value)) {
            setMsg(key, fieldList[key].error);
            res = false;
        } else setMsg(key, '');
    }

    //Valida la fecha de contrato
    if (!validateDate()) {
        setMsg('fechaContrato', fieldList['fechaContrato'].error);
        res = false;
    } else setMsg('fechaContrato', '');

    //Valida el salario introducido
    if (!validateSalary()) {
        setMsg('salario', fieldList['salario'].error);
        res = false;
    } else setMsg('salario', '');

    //Valida que la contraseña y la confirmacion sean iguales
    if (document.forms[formName]['passwordReply'].value != document.forms[formName]['password'].value) {
        setMsg('passwordReply', fieldList['passwordReply'].error);
        res = false;
    } else setMsg('passwordReply', '');

    //Valida si el usuario ya esta registrado
    if (validateUser(document.forms[formName]['usuario'].value)) {
        setMsg('usuario', 'El usuario ya ha sido registrado');
        res = false;
    }

    return res;
}

//Evalua si la fecha de contrato es valida
function validateDate() {
    let date = new Date(document.forms[formName]['fechaContrato'].value);
    let today = new Date();
    return date <= today;
}

//Valida el salario
function validateSalary() {
    let sal = document.forms[formName]['salario'].value;
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

//Valida si el usuario ya esta registrado
function validateUser(user) {
    var name = user + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return true;
        }
    }
    return false;
}

//Guarda el usuario en una cookie con el email como clave
function saveUser(event) {
    event.preventDefault();
    if (validateForm()) {
        let data = {};  //Crea un objeto con los datos del usuario
        for (let key in fieldList) {
            if (key != 'passwordReply')
                data[key] = (key != 'trabajo' && key != 'jefe') ? document.querySelector("input[name=" + key + "]").value : document.querySelector("select[name=" + key + "]").value;
        }
        let d = new Date();
        d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = data.usuario + "=" + JSON.stringify(data) + ";" + expires + ";path=/";
        window.location.href = 'index.html';
    }
}

window.onload = () => {
    for (let key in fieldList) {
        if (key == 'fechaContrato')
            document.querySelector("input[name=" + key + "]").addEventListener('change', validateForm);
        else if (key != 'trabajo' && key != 'jefe')
            document.querySelector("input[name=" + key + "]").addEventListener('keyup', validateForm);
    }
    document.getElementById("registrar").addEventListener('click', saveUser)
}