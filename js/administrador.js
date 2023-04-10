import { Pelicula } from "./classPelicula.js";

let editar = document.getElementById("editar");
editar.addEventListener("click", function () {
    console.log("hice click");
});
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
