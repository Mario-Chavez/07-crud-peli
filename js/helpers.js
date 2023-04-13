export function cantidadDeCaracteres(texto, min, max) {
    if (texto.length >= min && texto.length <= max) {
        return true;
    } else {
        return false;
    }
}
function validarDuracion(value) {
    // expresion regular
    let patron = /^[0-9]{1,3}$/;
    if (patron.test(value)) {
        return true;
    } else {
        return false;
    }
}
function validarURLImagen(url) {
    // expresion regular
    let patron = /^https?:\/\/\S+\.(?:png|jpe?g|gif|webp)$/i;
    if (patron.test(url)) {
        console.log("cumple con la url");
        return true;
    } else {
        console.log("no  cumple con la url ");
        return false;
    }
}

export function cartelDeError(titulo, descripcion, imagen, duracion) {
    let resumen = "";
    if (!cantidadDeCaracteres(titulo, 2, 60)) {
        resumen += `corregir el campo del titulo debe tener entre 3 y 100 caracteres <br>`;
    }
    if (!cantidadDeCaracteres(descripcion, 5, 100)) {
        resumen += `corregir la cantidad de caracteres de la descripcion <br> `;
    }
    if (!validarURLImagen(imagen)) {
        resumen += `URL de imagen no admitida <br> `;
    }
    if (!validarDuracion(duracion)) {
        resumen += `debe ser un numero de tres digitos como maximo <br> `;
    }
    if (resumen.length !== 0) {
        return resumen;
    } else {
        console.log("todo ok con el formulario");
        return "";
    }
}
