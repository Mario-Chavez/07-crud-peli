import { Pelicula } from "./classPelicula.js";

let btnEditar = document.getElementById("editar");
btnEditar.addEventListener("click", crearPeli);

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
