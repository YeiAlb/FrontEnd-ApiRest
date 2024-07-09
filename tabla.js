window.onload = function() {
    listarPeliculas();
}

let listarPeliculas = async () => {
    const peticion = await fetch("http://localhost:8080/api/peliculas", {
        method: 'GET',
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    });

    const peliculas = await peticion.json();
    let contenidoTabla = "";

    for (let pelicula of peliculas) {
        let contenidoFila = `<tr>
            <td>${pelicula.id}</td>
            <td>${pelicula.titulo}</td>
            <td>${pelicula.director}</td>
            <td>${pelicula.genero}</td>
            <td>
            <i onClick="editarPelicula(${pelicula.id})" class="material-icons button edit">edit</i>
            <i onClick="borrarPelicula(${pelicula.id})" class="material-icons button delete">delete</i>
            </td>
        </tr>`;
        contenidoTabla += contenidoFila;
    }

    document.querySelector("#tabla tbody").outerHTML = contenidoTabla;
}

let borrarPelicula = async (id) => {
    const peticion = await fetch("http://localhost:8080/api/pelicula/" + id, {
        method: 'DELETE',
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    });

    listarPeliculas();
}

let idEditar; // Declarar idEditar fuera de la función para ser accesible globalmente

let editarPelicula = async (id) => {
    mostrarFormulario();
    idEditar = id; // Asignar el valor de idEditar

    const peticion = await fetch("http://localhost:8080/api/pelicula/" + id, {
        method: 'GET',
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    });

    const pelicula = await peticion.json();

    document.getElementById("titulo").value = pelicula.titulo;
    document.getElementById("director").value = pelicula.director;
    document.getElementById("genero").value = pelicula.genero;
}

let btnModificar = document.getElementById("btnModificar");
btnModificar.addEventListener("click", evento => {
    aplicarActualizacion(idEditar);
});

let aplicarActualizacion = async (id) => {
    let campos = {
        id: id,
        titulo: document.getElementById("titulo").value,
        director: document.getElementById("director").value,
        genero: document.getElementById("genero").value
    };

    const peticion = await fetch("http://localhost:8080/api/peliculas", {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(campos)
    });

    listarPeliculas();
}

function mostrarFormulario() {
    let formulario = document.getElementById("formulario");
    formulario.style.visibility = "visible";
}