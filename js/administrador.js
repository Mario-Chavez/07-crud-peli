import { Pelicula } from "./classPelicula.js";

let btnEditar = document.getElementById("editar");
let btnAgregar = document.getElementById("agregar");
let formulario = document.getElementById("form");

btnEditar.addEventListener("click", crearPeli);
btnAgregar.addEventListener("click", mostrarModalDePeli);
formulario.addEventListener("submit", cargarPelicula);

const modalPeli = new bootstrap.Modal(document.getElementById("modalAgregar"));

function crearPeli() {
    // crear nueva peliculas
    let nuevaPeli = new Pelicula(
        "mario",
        "algo",
        "otraCosa",
        "aventura",
        2012,
        "1 h",
        "eeuu",
        "mario"
    );
    console.log(nuevaPeli);
}

function mostrarModalDePeli() {
    console.log("estoy haciendo una peli");
    modalPeli.show();
}

function cargarPelicula(e) {
    e.preventDefault();
    console.log("creando la pelicula...");
    // cerrar la ventana modal
    modalPeli.hide();
}
