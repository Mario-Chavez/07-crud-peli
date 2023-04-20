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
const modalPeli = new bootstrap.Modal(document.getElementById("modalAgregar"));

// manejador de eventos
btnEditar.addEventListener("click", crearPeli);
btnAgregar.addEventListener("click", mostrarModalDePeli);
formulario.addEventListener("submit", cargarPelicula);

// se debe trabajar para que lo q traemos sean del tipo Peliculas
// let listaPeliculas = JSON.parse(localStorage.getItem("listaPeli")) || []; esto me devuelve un array de tipo pbjet no podemos usarlo para intanciarlo con la class peli

let listaPeliculas = localStorage.getItem("listaPeli");

/* transformamos lo q s encuentra en el local storage en un array de class
Peliculas para poder usarlo con sus metodos */

if (!listaPeliculas) {
    listaPeliculas = []; //si no existe array vacio
} else {
    // si lista peliculas tiene datos se lo trfanforma a un array de class Peli
    listaPeliculas = JSON.parse(listaPeliculas).map(
        (pelicula) =>
            new Pelicula(
                pelicula.titulo,
                pelicula.descripcion,
                pelicula.imagen,
                pelicula.genero,
                pelicula.anio,
                pelicula.duracion,
                pelicula.pais,
                pelicula.reparto
            )
    );
}

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
}

function mostrarModalDePeli() {
    modalPeli.show();
}

function cargarPelicula(e) {
    e.preventDefault();
    // validar Peliculas
    let sumario = cartelDeError(
        titulo.value,
        descripcion.value,
        imagen.value,
        genero.value,
        anio.value,
        duracion.value,
        pais.value,
        reparto.value
    );
    if (sumario.length === 0) {
        // creamos nueva pelicula
        let nuevaPeli = new Pelicula(
            titulo.value,
            descripcion.value,
            imagen.value,
            genero.value,
            anio.value,
            duracion.value,
            pais.value,
            reparto.value
        );
        listaPeliculas.push(nuevaPeli);
        // almacenar en el localStorage
        guardarPeliLocalStorage();
        // limpiar formulario
        cleanForm();
        //cerrar modal
        modalPeli.hide();
    } else {
        msjForm.className = "alert alert-danger mt-3";
        msjForm.innerHTML = sumario;
    }
}

function guardarPeliLocalStorage() {
    localStorage.setItem("listaPeli", JSON.stringify(listaPeliculas)); //para objetos publicos funciona
}
function cleanForm() {
    formulario.reset();
}
