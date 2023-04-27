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
let estadoPelicula = true; // estado bandera (true=crear, false=editar)

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

function crearPelicula() {
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
             <button class="bi bi-pencil-square btn btn-warning" id="btnEditar" onclick="editarPelicula( '${pelicula.getCodigo()}' )"></button>
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

    if (estadoPelicula) {
        crearPelicula();
    } else {
        actualizarPelicula();
    }
}

function guardarPeliLocalStorage() {
    localStorage.setItem("listaPeli", JSON.stringify(listaPeliculas)); //para objetos publicos funciona
}
function cleanForm() {
    formulario.reset();
}

/* se accede desde el objeto window ya que es superior a dom es una forma la otra seria 
acceder desde el dom con document.query.... */
window.borrarPelicula = (codigo) => {
    Swal.fire({
        title: "Estas seguro?",
        text: "Si borras la pelicula no podras volver atras!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si Borrar!",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        /* si se confirma precedemos a borrar la pelicula */
        if (result.isConfirmed) {
            // busco el array de pelicula
            let posicionPeli = listaPeliculas.findIndex(
                (pelicula) => pelicula.getCodigo() === codigo
            );
            // borrar la peliculas teneindo en cuenta el indice o posicion de la pelicula

            listaPeliculas.splice(posicionPeli, 1);
            guardarPeliLocalStorage();

            /* removemos del html la peli borrada
            traemos los tr de la tabla asi recorremos los child  de tbody */
            let datosTablaPelicula = document.querySelector("tbody");
            datosTablaPelicula.removeChild(datosTablaPelicula.children[posicionPeli]);

            Swal.fire("Borrado!", "La pelicula fue borrada.", "success");
        }
    });
};

/* editar pelicula */
window.editarPelicula = (codigounico) => {
    let peli = listaPeliculas.find((peli) => peli.getCodigo() === codigounico);

    //mostrar modal
    modalPeli.show();
    // completar los datos en el modal precargamos con los datos que tiene el localStorage
    // con los datos que tiene el localStorage los traemos con los get
    codigo.value = peli.getCodigo();
    titulo.value = peli.getTitulo();
    descripcion.value = peli.getDescripcion();
    imagen.value = peli.getImagen();
    genero.value = peli.getGenero();
    anio.value = peli.getAnio();
    duracion.value = peli.getDuracion();
    pais.value = peli.getPais();
    reparto.value = peli.getReparto();
    // cambio el estado de mi variable bandera
    estadoPelicula = false;
};

function actualizarPelicula() {
    // let listaPeliculas = localStorage.getItem("listaPeli");

    // obtener la pelicula q estoy editando
    let posicionPeli = listaPeliculas.findIndex(
        (peli) => peli.getCodigo() === codigo.value
    );
    // actualizar sus propiedades

    let p = listaPeliculas[posicionPeli];
    listaPeliculas[posicionPeli].descripcion = descripcion.value;
    listaPeliculas[posicionPeli].imagen = imagen.value;
    listaPeliculas[posicionPeli].genero = genero.value;
    listaPeliculas[posicionPeli].anio = anio.value;
    listaPeliculas[posicionPeli].duracion = duracion.value;
    listaPeliculas[posicionPeli].pais = pais.value;
    listaPeliculas[posicionPeli].reparto = reparto.value;
    // hasta aqui se puso bien los value
    // console.log(listaPeliculas);
    console.log(p);
    // guardarPeliLocalStorage();
}
