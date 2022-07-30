const formularioSubmit = document.getElementById ("formularioIngreso");
const nombre = document.querySelector (`.ingreseSuNombre`);
const apellido = document.querySelector (`.ingreseSuApellido`);
const divFormulario = document.querySelector(`#divFormulario`);  
const contenidoDespuesDeIngreso = document.querySelector (`#contenidoDespuesDeIngreso`); 
let nombreUsuarioStorage = localStorage.getItem (`nombreUsuarioStorage`) ;
let apellidoUsuarioStorage = localStorage.getItem (`apellidoUsuarioStorage`);
const contenidoDespuesDeSaludo = document.querySelector (`#contenidoDespuesDeSaludo`);
const listaDePasajeros = document.getElementById ("listaScaloneta");
const fetchEnDom = document.getElementById (`mostrarListaDeAsientos`)


//FORMULARIO INGRESO
formularioSubmit.addEventListener('submit', function(e) {
    e.preventDefault();
    nombreUsuarioStorage = nombre.value;
    apellidoUsuarioStorage = apellido.value;
    localStorage.setItem ("nombreUsuarioStorage" , nombre.value);
    localStorage.setItem ("apellidoUsuarioStorage" , apellido.value);
    ocultarFormularioIngreso ();
});

//POST INGRESO
const ocultarFormularioIngreso = () => {
    divFormulario.style.display = `none`;
    contenidoDespuesDeIngreso.innerHTML = `Bienvenido ${nombreUsuarioStorage} ${apellidoUsuarioStorage} <br> <br> El juego consiste en responder 10 preguntas de multiple opción sobre la Selección Argentina. De acuerdo a la cantidad de respuestas correctas, obtendras el pasaje para subirte a la Scaloneta o no. SUERTE !!`;
    botonParaContinuar.style.display ="block";
    }

//SI LA PERSONA YA SE LOGUEO ANTERIORMENTE
if (!!nombreUsuarioStorage && !!apellidoUsuarioStorage) {
    ocultarFormularioIngreso ();
};

//LISTA DE PASAJEROS
listaDePasajeros.addEventListener (`click`, function (e){
    e.preventDefault ()
    contenidoDespuesDeSaludo.style.display = "none"
    contenidoDespuesDeIngreso.style.display = "none"
    mostrarListaDeAsientos.style.display = "block"
   //FETCH
fetch (`/json/ajax.json`)
.then (res => res.json())
.then(respuesta => {
    for (respuestas of respuesta) { //Recorrido del array
        const {disponibles, ocupados} = respuestas; //Descontracturar el array
        const disponible = disponibles //Guardar elementos en variable
        const ocupado = ocupados //Guardar elementos en variable
        const fetchDiv = document.createElement ("div");
        fetchDiv.className = "fetchDiv";
        fetchDiv.innerHTML = `${disponible} <br>  ${ocupado}`;
        fetchEnDom.appendChild (fetchDiv);
    }
});
//FIN FETCH
const recargar = document.getElementById('volverBoton');
recargar.addEventListener('click', () => {
    location.reload();
    })
});


/*--------------------------------------------------------------------JUEGO ----------------------------------------------------------------------------------------------------------------------- */
contenidoDespuesDeSaludo.addEventListener ("submit" , function (e){
    e.preventDefault();
    divFormulario.style.display = "none";
    contenidoDespuesDeIngreso.style.display = "none";
    contenidoDespuesDeSaludo.style.display ="none";
    preguntasDelJuego.style.display = "block";
// RELOJ JUEGO
    const tiempoDom = document.getElementById('tiempo');
    const minutosDom = document.getElementById('minutos');
    const segundosDom = document.getElementById('segundos');

    let tiempo = 0;
//PARA QUE APAREZCA EL 0 ANTES DE LOS MINUTOS Y SEGUNDOS
    const pad = (val) => {
    let valString = val.toString();
    if (valString.length < 2) {
        return '0' + valString;
    } else {
        return valString;
  }
};
//RELOJ EN DOM
    const intervaloTiempo = setInterval(() => {
        tiempo++;
        minutosDom.innerHTML = pad(parseInt(tiempo / 60));
        segundosDom.innerHTML = pad(tiempo % 60);
        tiempoDom.innerHTML = `Estuviste jugando por ${tiempo} segundos. ¿Valió la pena tu tiempo? Descubrelo haciendo click en el botón de abajo`;
    }, 1000);

//PAUSAR RELOJ
    const pausar = document.getElementById('pausar');
    pausar.addEventListener('click', () => {
        clearInterval(intervaloTiempo);
        finalDelJuego.style.display = "block";
        despuesDelJuego.style.display = "none";
    })
});
//FIN ESTRUCTURACION

//BASE DE PREGUNTAS
let baseDePreguntas = [
    {
        pregunta: `1 ¿Quién es el máximo goleador historico de la selección?`,
        respuesta: `Messi`,
        distractores: [
            `Valdano`,
            `Batistuta`,
            `Maradona`
        ]
    },
    {
        pregunta: `2 ¿Qué jugador del equipo campeón de la Copa America 2021 se tuvo que retirar recientemente por un problema en el corazón?`,
        respuesta: `Sergio Agüero`,
        distractores: [
            `Angel Di María`,
            `Rodrigo De Paul`,
            `Cristian Romero`
        ]
    },
    {
        pregunta: `3 ¿Quién fue el goleador de la Selección Argentina en las últimas eliminatorias?`,
        respuesta: `Lionel Messi y Lautaro Martinez`,
        distractores: [
            `Lautaro Martinez`,
            `Lionel Messi`,
            `Angel Di Maria`
        ]
    },
    {
        pregunta: `4 ¿Quién es el actual técnico de la Selección Argentina de Fútbol?`,
        respuesta: `Lionel Scaloni`,
        distractores: [
            `Alfio Basile`,
            `Jorge Sampaoli`,
            `Marcelo Gallardo`
        ]
    },
    {
        pregunta: `5 ¿Con qué nombre se suele llamar a la actual Selección Argentina?`,
        respuesta: `Scaloneta`,
        distractores: [
            `Messineta`,
            `Gallardoneta`,
            `Gagoneta`
        ]
    },
    {
        pregunta: `6 ¿Quién es el jugador de menor estatura dentro del equipo?`,
        respuesta: `Alejandro Gomez`,
        distractores: [
            `Lionel Messi`,
            `Julian Alvarez`,
            `Nicolas Tagliafico`
        ]
    },
    {
        pregunta: `7 ¿Quién es el jugador de mayor edad dentro del equipo?`,
        respuesta: `Franco Armani`,
        distractores: [
            `Lionel Messi`,
            `Nicolas Otamendi`,
            `Germán Pezzella`
        ]
    },
    {
        pregunta: `8 ¿Dónde nació el DT de la selección?`,
        respuesta: `Pujato`,
        distractores: [
            `Pergamino`,
            `Capital Federal`,
            `Córdoba`
        ]
    },
    {
        pregunta: `9 ¿De qué equipo es hincha (en Argentina) Lionel Messi?`,
        respuesta: `Newell´s`,
        distractores: [
            `River`,
            `Boca`,
            `Rosario Central`
        ]
    },
    {
        pregunta: `10 ¿Quién marcó el gol en la final de la Copa América 2021 vs Brasil? `,
        respuesta: `Angel Di María`,
        distractores: [
            `Lautaro Martinez`,
            `Angel Correa`,
            `Rodrigo De Paul`
        ]
    },
];

//JUEGO
let indexPregunta = 0;
puntajeFinalJuego = 0;
cargarPregunta (indexPregunta);

function cargarPregunta (index)  {
    objetoDePregunta = baseDePreguntas [index]
    opciones = [...objetoDePregunta.distractores]
    opciones.push (objetoDePregunta.respuesta)
//FUNCION MEZCLAR INDICE RESPUESTAS
    function mezclarOpciones(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
        }
        return array;
      }
mezclarOpciones (opciones);
    document.getElementById("pregunta").innerHTML = objetoDePregunta.pregunta;
    document.getElementById("opcionUno").innerHTML = opciones[0];
    document.getElementById("opcionDos").innerHTML = opciones[1];
    document.getElementById("opcionTres").innerHTML = opciones[2];
    document.getElementById("opcionCuatro").innerHTML = opciones[3];
};


/* FUNCION PARA ELEGIR LA RESPUESTA Y CONTINUAR JUGANDO */

async function selecionarOpcion (index) {
    let validezRespuesta = opciones[index] == objetoDePregunta.respuesta;
    if (validezRespuesta) {
        await Swal.fire ({
            title: `Respuesta Correcta !`,
            text: `Muy bien ${nombreUsuarioStorage}, la respuesta es correcta. Sumaste un punto`,
            icon: "success",
        });
        puntajeFinalJuego++;
    } else {
         await Swal.fire ({
            title: `Respuesta Incorrecta !`,
            text: `${nombreUsuarioStorage}, la respuesta era ${objetoDePregunta.respuesta}.`,
            icon: "error",
        });

    }
    indexPregunta++;
    if (indexPregunta >= baseDePreguntas.length){
       await Swal.fire ({
            title: `EL JUEGO HA FINALIZADO!`,
            text: `${nombreUsuarioStorage}, tu puntaje fue de: ${puntajeFinalJuego}pts/10pts`,
            icon: "success",
        });
        if (puntajeFinalJuego > 9){ //10 aciertos
            preguntasDelJuego.style.display = "none";
            despuesDelJuego.style.display = "block";
            //MOSTRAR PASAJE 10 ACIERTOS
            const mostrarPasajeGanador = document.getElementById('verPasaje');
            mostrarPasajeGanador.addEventListener('click', () => {
                finalDelJuego.style.display = "none";
                ganadorDiezPuntos.style.display = "block";
                const volverAlInicio = document.getElementById('botonDiezPuntos');
                volverAlInicio.addEventListener('click', () => {
                location.reload();
            })
})
            } else if (puntajeFinalJuego >=6 && puntajeFinalJuego<10){ //6-9 aciertos
            preguntasDelJuego.style.display = "none";
            despuesDelJuego.style.display = "block";
            //MOSTRAR PASAJE 6 A 9 ACIERTOS
            const mostrarPasajeGanador = document.getElementById('verPasaje');
            mostrarPasajeGanador.addEventListener('click', () => {
                finalDelJuego.style.display = "none";
                ganadorSeisANuevePuntos.style.display = "block";
                const volverAlInicio = document.getElementById('botonSeisANuevePuntos');
                volverAlInicio.addEventListener('click', () => {
                location.reload();
            })
})
            } else if (puntajeFinalJuego >=3 && puntajeFinalJuego<6){ //3-5 aciertos
            preguntasDelJuego.style.display = "none";
            despuesDelJuego.style.display = "block";
            //MOSTRAR PASAJE 3 A 5 ACIERTOS
            const mostrarPasajeGanador = document.getElementById('verPasaje');
            mostrarPasajeGanador.addEventListener('click', () => {
                finalDelJuego.style.display = "none";
                listaDeEspera.style.display = "block";
                const volverAlInicio = document.getElementById('botonListaDeEspera');
                volverAlInicio.addEventListener('click', () => {
                location.reload();
            })
})
           } else { //0-2 aciertos
            preguntasDelJuego.style.display = "none";
            despuesDelJuego.style.display = "block";
            //MOSTRAR PASAJE MENOS DE 3 ACIERTOS
            const mostrarPasajeGanador = document.getElementById('verPasaje');
            mostrarPasajeGanador.addEventListener('click', () => {
            finalDelJuego.style.display = "none";
                noGanador.style.display = "block";
                const volverAlInicio = document.getElementById('botonNoGanaste');
                volverAlInicio.addEventListener('click', () => {
                location.reload();
            })
})
            }
        indexPregunta = 0;
        puntajeFinalJuego = 0;
    } {
        cargarPregunta (indexPregunta); 
}
};