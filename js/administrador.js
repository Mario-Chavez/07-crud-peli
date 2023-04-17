import { Pelicula } from "./classPelicula.js";
import { cartelDeError } from "./helpers.js";

let btnEditar = document.getElementById("editar");
let btnAgregar = document.getElementById("agregar");
let formulario = document.getElementById("form");
let codigo = document.getElementById("codigo");
let titulo = document.getElementById("titulo");
let descripcion = document.getElementById("descripcion");
let pais = document.getElementById("pais");
let reparto = document.getElementById("reparto");
let genero = document.getElementById("genero");
let imagen = document.getElementById("imagen");
let duracion = document.getElementById("duracion");
let anio = document.getElementById("anio");
let msjForm = document.getElementById("msFormulario");

btnEditar.addEventListener("click", crearPeli);
btnAgregar.addEventListener("click", mostrarModalDePeli);
formulario.addEventListener("submit", cargarPelicula);
let listaPeliculas = [];

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
    console.log("entre al hacer una pelicula");
    modalPeli.show();
}

function cargarPelicula(e) {
    e.preventDefault();
    // validar Peliculas

    let sumario = cartelDeError(
        titulo.value,
        descripcion.value,
        imagen.value,
        duracion.value,
        genero.value
    );
    if (sumario.length === 0) {
        console.log("creando pelicula");
        // creamos nueva pelicula
        let nuevaPeli = new Pelicula(
            titulo.value,
            descripcion.value,
            imagen.value,
            duracion.value,
            genero.value
        );
        // console.log(nuevaPeli);
        listaPeliculas.push(nuevaPeli);
        localStorage.setItem("listaPeli", JSON.stringify(listaPeliculas)); //para objetos publicos funciona
        modalPeli.hide();
    } else {
        msjForm.className = "alert alert-danger mt-3";
        msjForm.innerHTML = sumario;
    }
    // crear Peliculas
    // validar Peliculas
    // almacenar Peliculas en el localStorage
    // cerrar la ventana modal
}
