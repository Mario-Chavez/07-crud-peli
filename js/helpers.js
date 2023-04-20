export function cantidadDeCaracteres(texto, min, max) {
    if (texto.length >= min && texto.length <= max) {
        return true;
    } else {
        return false;
    }
}
function validarDuracion(value) {
    // expresion regular
    /* numero de 3 digitos unicamente */
    let patron = /^[0-9]{3,3}$/;

    if (patron.test(value) === true) {
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
        return true;
    }
}
// validar anio desde 1985 - (año actual +1) un año mas (estrenos)
function validarAnio(value) {
    const anioActual = new Date().getFullYear();
    if (value >= 1985 && value <= anioActual + 1) {
        return true;
    } else {
        return false;
    }
}

export function cartelDeError(
    titulo,
    descripcion,
    imagen,
    genero,
    anio,
    duracion,
    pais,
    reparto
) {
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
    if (!validarGenero(genero)) {
        resumen += `el genero debe ser los de las opciones <br> `;
    }
    if (anio.length !== 0 && !validarAnio(anio)) {
        resumen += `ingreasa un año correcto deber ser entre el rango de 1985
        y como maximo el proximo año ${new Date().getFullYear() + 1}
        <br> `;
    }
    if (duracion.length !== 0 && !validarDuracion(duracion)) {
        resumen += `debe ser un numero de tres digitos como maximo <br> `;
    }
    if (pais.length !== 0 && !cantidadDeCaracteres(pais, 2, 50)) {
        resumen += `corregir la cantidad de caracteres de pais <br> `;
    }
    if (reparto.length !== 0 && !cantidadDeCaracteres(reparto, 5, 200)) {
        resumen += `corregir la cantidad de caracteres de reparto <br> `;
    }
    if (resumen.length !== 0) {
        return resumen;
    } else {
        return "";
    }
}
