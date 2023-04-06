document
    .getElementById("btnThemeLight")
    .addEventListener("click", () => cambiarTema("light"));
document
    .getElementById("btnThemeDark")
    .addEventListener("click", () => cambiarTema("dark"));

function cambiarTema(color) {
    /* accedemos al body y seteamos un atributo (data-bs-theme) y lo cambiamos
    cada ves que nos mande los parametros en color*/
    let body = document.querySelector("body");
    body.setAttribute("data-bs-theme", color);
    //actualiza el icono con el classnAME
    color === "dark"
        ? (document.getElementById("iconTheme").className = "bi bi-moon-stars-fill")
        : (document.getElementById("iconTheme").className = "bi bi-brightness-high-fill");
}
