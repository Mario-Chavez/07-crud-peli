export function cantidadDeCaracteres(texto, min, max) {
    if (texto.length >= min && texto.length <= max) {
        console.log("cantidad de cararcteres correcto");
        return true;
    } else {
        console.log("cantidad de cararcteres incorrecto");
        return false;
    }
}

export function cartelDeError(titulo, descripcion) {
    let resumen = "";
    if (!cantidadDeCaracteres(titulo, 2, 60)) {
        resumen += `corregir el campo del titulo debe tener entre 3 y 100 caracteres <br> `;
    }
    if (!cantidadDeCaracteres(descripcion, 5, 100)) {
        resumen += `corregir la cantidad de caracteres <br> `;
    }
    if (resumen.length !== 0) {
        return resumen;
    } else {
        return "";
    }
}
