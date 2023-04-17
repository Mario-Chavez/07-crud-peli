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
        return true;
    } else {
        return false;
    }
}
function validarGenero(texto) {
    if (
        texto.length > 0
        // &&(texto === Aventura || texto === Accion || texto === Drama || texto === Terror)
    ) {
        console.log("todo bien");
        return true;
    }
    console.log("es invalido");
}

export function cartelDeError(titulo, descripcion, imagen, duracion, genero) {
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
    if (!validarGenero(genero)) {
        resumen += `el genero debe ser los de las opciones <br> `;
    }
    if (resumen.length !== 0) {
        return resumen;
    } else {
        return "";
    }
}
