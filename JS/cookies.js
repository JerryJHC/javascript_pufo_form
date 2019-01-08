function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function save() {
    setCookie('user', document.forms['reg']['user'].value, 10);
    setCookie('pass', document.forms['reg']['pass'].value, 10);
}

document.getElementById("save").addEventListener('click', save);