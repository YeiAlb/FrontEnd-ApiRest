//Funcionalidad al formulario.
//Tenemos 3 input y 1 botón. Capturamos con GetElement.
// Con value guardamos lo que tenemos dentro del campo y lo guardamos dentro de una variable, que tenemos que enviar con un FETCH.
//Creamos un fetch que llame a la URL y le enviamos nuestro objeto en formato Json
//Estamos consumiendo una API que hemos creado nosotros.
//Creo el método asíncrono registrarPelicula para usar await, que CONTENGA TODO.
//El objeto json lo vamos a enviar al body.
//Cuando? hay que anadir el evento al botón.

let boton = document.getElementById("btnRegistrar");

boton.addEventListener("click", evento=>{
    registrarPelicula();
});

let registrarPelicula = async()=>{

let campos = {};

campos.titulo = document.getElementById("titulo").value;
campos.director = document.getElementById("director").value;
campos.genero = document.getElementById("genero").value;

const peticion = await fetch("http://localhost:8080/api/peliculas",
{
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(campos)
});

}





