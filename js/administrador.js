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
let caracteres = document.getElementById("caracteres");

// manejador de eventos
// btnEditar.addEventListener("click", crearPeli);
btnAgregar.addEventListener("click", mostrarModalDePeli);
formulario.addEventListener("submit", cargarPelicula);
descripcion.addEventListener("input", cantidadDeCaracteres);

/* contador de caracteres  */
function cantidadDeCaracteres() {
    const numCaracter = 500 - descripcion.value.length;
    if (descripcion.value.length > 0) {
        caracteres.innerText = `Quedan ${numCaracter} caracteres`;
    }
}

// se debe trabajar para que lo q traemos sean del tipo Peliculas
// let listaPeliculas = JSON.parse(localStorage.getItem("listaPeli")) || []; esto me devuelve un array de tipo pbjet no podemos usarlo para intanciarlo con la class peli

let listaPeliculas = localStorage.getItem("listaPeli");

if (!listaPeliculas) {
    //si lista peliculas no existe en Localstorage
    listaPeliculas = [];
} else {
    //si lista Peliculas tiene datos, quiero transformarlo en un array de objetos Pelicula
    listaPeliculas = JSON.parse(listaPeliculas).map(
        (pelicula) =>
            new Pelicula(
                pelicula.codigo,
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

cargaInicial();

function cargaInicial() {
    // verificar si listaPeliculas tiene datos
    if (listaPeliculas.length > 0) {
        //dibujes los datos en la tabla
        listaPeliculas.map((pelicula, indice) => crearFila(pelicula, indice));
    }
    //el else seria mostrar un mensaje q no hay datos para cargar o dejo la tabla vacia
}

function crearFila(pelicula, indice) {
    // unica forma en la que puse acceder a las propiedades ya q eran privadas
    // lo buscpo por los getter ya que asi se llaman los geter en la class Pelicula
    // console.log(pelicula.getTitulo());

    //aqui dibujo el TR
    let datosTablaPelicula = document.querySelector("tbody");
    datosTablaPelicula.innerHTML += `
    <tr>
         <th>${indice + 1}</th>
         <td>${pelicula.getTitulo()}</td>
         <td class="text-truncate">${pelicula.getDescripcion()}</td>
         <td class="text-truncate">${pelicula.getImagen()}</td>
         <td>${pelicula.getGenero()}</td>
         <td>
             <button class="bi bi-pencil-square btn btn-warning" id="btnEditar" ></button>
             <button class="bi bi-x-square btn btn-danger" onclick="borrarPelicula( '${pelicula.getCodigo()}' )" ></button>
         </td>
   </tr>
  `;
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
        /* sele asigna undefined por que todavia no sabemos q dato ira es indefinidol
         si te paso codigo respetalo y no hagas otro
        y si no usa el uuid para hacer un codigo
        */
        let nuevaPeli = new Pelicula(
            undefined,
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
        //dibujar una fila
        let indicePeli = listaPeliculas.length - 1; //accedemos a la ultima posicion del array de peli guardada en el localstore
        crearFila(nuevaPeli, indicePeli); //llamo a crearFila para que dibuje la fila en el html
        // alert
        Swal.fire("Buen trabajo!", "Pelicula Creada!", "success");
    } else {
        msjForm.className = "alert alert-danger mt-3";
        msjForm.innerHTML = sumario;
        setTimeout(() => {
            msjForm.className = "d-none";
        }, 4000);
    }
}

function guardarPeliLocalStorage() {
    localStorage.setItem("listaPeli", JSON.stringify(listaPeliculas)); //para objetos publicos funciona
}
function cleanForm() {
    formulario.reset();
}

//borrar Pelicula
// function borrarPelicula() {
//     console.log("borrar Pelicula");
// }
/* se accede desde el objeto window ya que es superior a dom es una forma la otra seria 
acceder desde el dom con document.query.... */
window.borrarPelicula = (codigo) => {
    console.log(codigo);
    // let peliBorrar = listaPeliculas.findIndex(
    //     (pelicula) => pelicula.getCodigo() === codigo
    // );
    // listaPeliculas.splice(peliBorrar, 1);
    // console.log("lista de peliculas", listaPeliculas);
};
// const index = listaPeliculas.indexOf(peliBorrar);
// if (index > -1) {
//     // only splice array when item is found
//     array.splice(index, 1); // 2nd parameter means remove one item only
// }
