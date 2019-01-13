//Valida si el usuario introducido es un email valido
function validateForm() {
    let mail = /^\w[\w\.]+@pufo\.es$/;
    if (!mail.test(document.querySelector('input[name=usuario]').value)) {
        document.querySelector("span[for=usuario]").textContent = 'El email no es valido';
        return false;
    }
    return true;
}

//Valida si el usuario existe y devuelve sus datos
function validateUser(user) {
    let data = getCookie(user);
    return data == "" ? null : JSON.parse(data);
}

//Oculta el formulario y muestra los datos del usuario
function showUserData(data) {
    document.getElementById('form').style.display = 'none';
    let userData = document.getElementById('userData');
    for (let key in data) {
        if (key != 'password') {
            let element = document.createElement('li');
            element.appendChild(document.createTextNode(key + " : " + data[key]));
            userData.appendChild(element);
        }
    }
    //Boton para salir
    let b = document.createElement('button');
    b.textContent = 'Salir';
    b.addEventListener('click', () => {
        closeSession();
        window.location.reload();
    })
    userData.appendChild(b);
}

//Guarda el usuario en una cookie con el email como clave
function logIn(event) {
    event.preventDefault();
    if (validateForm()) {
        let data = validateUser(document.querySelector('input[name=usuario]').value);
        if (data != null && data.password == document.querySelector('input[name=password]').value) {
            showUserData(data);
            setSession(data.usuario);
        } else
            document.querySelectorAll("span[for=usuario],span[for=password]").forEach((e) => e.textContent = 'El usuario o la contraseña introducidos no son validos');
    }
}

window.onload = () => {
    //Verifica si hay una sesion abierta
    let session = getSession();
    if (session != "") {
        showUserData(validateUser(session));
    } else {
        document.querySelector("input[name=usuario]").addEventListener('change', validateForm);
        document.getElementById("login").addEventListener('click', logIn);
    }
}