import { Pelicula } from "./classPelicula.js";

let listaPeliculas = localStorage.getItem("listaPeli");

let datosTablaPelicula = document.getElementById("cardIndex");

if (!listaPeliculas) {
    //si lista peliculas no existe en Localstorage
    listaPeliculas = [];
} else {
    //si lista Peliculas tiene datos, quiero transformarlo en un array de objetos Pelicula
    listaPeliculas = JSON.parse(listaPeliculas).map(
        (pelicula) =>
            new Pelicula(
                undefined,
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

function cargaInicial() {
    // verificar si listaPeliculas tiene datos
    if (listaPeliculas.length > 0) {
        //dibujes los datos en la tabla
        listaPeliculas.map((pelicula) => cargaDeCard(pelicula));
    }
    //el else seria mostrar un mensaje q no hay datos para cargar o dejo la tabla vacia
}

function cargaDeCard(pelicula) {
    // unica forma en la que puse acceder a las propiedades ya q eran privadas
    // lo buscpo por los getter ya que asi se llaman los geter en la class Pelicula
    // console.log(pelicula.titulo())
    // console.log(pelicula);
    datosTablaPelicula.innerHTML += `
    <article class="col-md-4 col-lg-3 mb-3">
        <div class="card h-100">
                <img
                    src="${pelicula.imagen}"
                    class="card-img-top"
                    alt="${pelicula.titulo}"
                />
                <div class="card-body">
                    <h5 class="card-title">${pelicula.titulo}</h5>
                </div>
                <div class="card-footer">
                    <a href="./pages/detalle.html" class="btn btn-primary">
                        Ver Mas
                    </a>
                </div>
        </div>
    </article>
      `;
}
cargaInicial();
