window.onload = () => {
    // Crear tarjetas
    crearTarjetas(filosofos)

    // Crear handlers para los botones de control
    let botonCrearTarjeta = document.querySelector('.create-btn');
    botonCrearTarjeta.addEventListener('click', crearNuevaTarjeta);
    
    let botonGuardarTarjetas = document.querySelector('.save-btn');
    botonGuardarTarjetas.addEventListener('click', guardarTarjetas);

    let botonCargarTarjetas = document.querySelector('.load-btn');
    botonCargarTarjetas.addEventListener('click', cargarTarjetas);
    
    let botonOrdenarAZ = document.querySelector(".sort-options button:nth-child(2)")
    botonOrdenarAZ.addEventListener('click', ordenarNombreAZ);

    let botonOrdenarZA = document.querySelector(".sort-options button:nth-child(3)")
    botonOrdenarZA.addEventListener('click', ordenarNombreZA);
}

function crearTarjetas(filosofos) {
    filosofos.forEach((filosofo) => {
        // Creamos tarjeta vacía
        let tarjeta = document.createElement('div');
        tarjeta.classList.add('card');
        // Creamos imagen
        let imagen = document.createElement('img');
        imagen.src = filosofo.imagen;
        imagen.alt = `Foto de ${filosofo.nombre}`;
        imagen.classList.add("photo");
        tarjeta.append(imagen);

        // Creamos caja de informacion
        let info = document.createElement('div');
        info.classList.add('card-info');
        tarjeta.append(info);
        // Creamos título
        let titulo = document.createElement('h3');
        titulo.classList.add('nombre');
        titulo.innerHTML = filosofo.nombre;
        info.append(titulo);
        // Creamos fila de información (info-row)
        let filaInfo = document.createElement('div');
        filaInfo.classList.add('info-row');

        // Añadimos info del país a filaInfo
        let infoPais = document.createElement('div');
        infoPais.classList.add('info-pais');

        let imagenPais = document.createElement('img');
        imagenPais.src = filosofo.pais.bandera;
        imagenPais.alt = `Bandera de ${filosofo.pais.nombre}`;

        let nombrePais = document.createElement('span');
        nombrePais.classList.add('pais');
        nombrePais.innerHTML = filosofo.pais.nombre;

        infoPais.append(imagenPais);
        infoPais.append(nombrePais);

        filaInfo.append(infoPais);

        // Añadimos info de la corriente a filaInfo
        let infoCorriente = document.createElement('div');
        infoCorriente.classList.add('info-corriente');

        let tituloCorriente = document.createElement('span');
        tituloCorriente.innerHTML = "Corriente: "

        let corriente = document.createElement('span');
        corriente.classList.add('corriente');
        corriente.innerHTML = filosofo.corriente;

        infoCorriente.append(tituloCorriente);
        infoCorriente.append(corriente);

        filaInfo.append(infoCorriente);

        // Añadimos info del arma a filaInfo
        let infoArma = document.createElement('div');
        infoArma.classList.add('info-arma');

        let tituloArma = document.createElement('span');
        tituloArma.innerHTML = "Arma: "

        let arma = document.createElement('span');
        arma.classList.add('arma');
        arma.innerHTML = filosofo.arma;

        infoArma.append(tituloArma);
        infoArma.append(arma);

        filaInfo.append(infoArma);

        info.append(filaInfo);

        // Añadimos caja de habilidades
        let habilidades = document.createElement('div');
        habilidades.classList.add('skills');

        // Añadimos una a una las habilidades
        for (let infoHabilidad of filosofo.habilidades) {
            // Añadimos una caja de habilidad
            let infoSkill = document.createElement('div');
            infoSkill.classList.add('skill');

            // Añadimos contenido caja de habilidad
            // 1.Icono de habilidad
            // let iconoSkill = document.createElement('img');
            // iconoSkill.alt = `Icono de ${infoHabilidad.habilidad}`;

            // infoSkill.append(iconoSkill)

            // 2.Etiqueta de habilidad
            let nombreSkill = document.createElement('span');
            nombreSkill.classList.add('skill-name');
            nombreSkill.innerHTML = infoHabilidad.habilidad;

            infoSkill.append(nombreSkill)

            // 2.Barra de habilidad
            let infoBarraHabilidad = document.createElement('div');
            infoBarraHabilidad.classList.add('skill-bar');

            let barraHabilidad = document.createElement('div');
            barraHabilidad.classList.add('level');
            barraHabilidad.style.width = (infoHabilidad.nivel * 25) + '%';

            infoBarraHabilidad.append(barraHabilidad)
            infoSkill.append(infoBarraHabilidad)

            habilidades.append(infoSkill)
        }

        // Creacion boton para eliminar tarjeta
        info.append(habilidades);

        let deleteButton = document.createElement("div");
        deleteButton.classList.add("botonEliminar");
        deleteButton.innerHTML = "&#x2716";
        deleteButton.addEventListener('click',eliminarTarjeta);

        tarjeta.append(deleteButton)

        // Añadimos tarjeta creada al contenedor de tarjetas
        let contenedor = document.querySelector('.cards-container');
        contenedor.append(tarjeta);
    })
}

function eliminarTarjeta(event) {
    let selectedCard = event.target.parentElement;
    selectedCard.remove();
}

function ordenarNombreAZ() {
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaA.querySelector('h3').innerHTML;
        let nombre2 = tarjetaB.querySelector('h3').innerHTML;
        return nombre1.localeCompare(nombre2);
    });

    insertarTarjetasOrdenadas(tarjetasOrdenadas)
}

function ordenarNombreZA() {
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaB.querySelector('h3').innerHTML;
        let nombre2 = tarjetaA.querySelector('h3').innerHTML;
        return nombre1.localeCompare(nombre2);
    });

    insertarTarjetasOrdenadas(tarjetasOrdenadas)
}

function insertarTarjetasOrdenadas(tarjetasOrdenadas) {
    // Eliminar totes les targetes de l'array 'tarjeta'
    let contenedor = document.querySelector('.cards-container');
    contenedor.innerHTML = ""

    // Afegir 'tarjetasOrdenadas' al contenidor de cards
    tarjetasOrdenadas.forEach(card => {
        contenedor.append(card);
    });
}

function crearNuevaTarjeta(event) {
    event.preventDefault();
    let nuevoFilosofo = {};
    nuevoFilosofo.nombre = document.querySelector('.create-card-form .nombre').value;
    nuevoFilosofo.imagen = document.querySelector('.create-card-form .foto').value;
    nuevoFilosofo.pais = {};
    nuevoFilosofo.pais.nombre = document.querySelector('.create-card-form .pais').value;

    // Completar la función
    nuevoFilosofo.pais.bandera = document.querySelector('.create-card-form .bandera').value;
    nuevoFilosofo.corriente = document.querySelector('.create-card-form .corriente').value;
    nuevoFilosofo.arma = document.querySelector('.create-card-form .arma').value;
    
    let skills = document.querySelectorAll('.create-card-form .skills');
    let habilidades = [
        {habilidad: "Sabiduría", nivel: 0}, 
        {habilidad: "Oratoria", nivel: 0},
        {habilidad: "Lógica", nivel: 0},
        {habilidad: "Innovación", nivel: 0}]
    
    for (let i = 0; i < skills.length; i++) {
        habilidades[i].nivel = skills[i].value
    }

    nuevoFilosofo.habilidades = habilidades

    let listaFilosofos = [];
    listaFilosofos.push(nuevoFilosofo)

    crearTarjetas(listaFilosofos);
}

function parsearTarjetas(tarjetas){
    let filosofosParseados = [];
    for (let tarjeta of tarjetas){
        let filosofo = {};
        filosofo.nombre = tarjeta.querySelector('.nombre').innerHTML;
        filosofo.imagen = tarjeta.querySelector('.photo').src;
        filosofo.pais = {};
        // Completar funció
        filosofo.pais.nombre = tarjeta.querySelector(".pais").innerHTML;
        filosofo.pais.bandera = tarjeta.querySelector(".info-pais img").src;

        filosofo.corriente = tarjeta.querySelector(".corriente").innerHTML;

        filosofo.arma = tarjeta.querySelector(".arma").innerHTML;

        filosofo.habilidades = [];

        let habilidades = tarjeta.querySelectorAll('.skill');
        for (let habilidad of habilidades){
            let habilidadParaGuardar = {};

            // Completar funció
            habilidadParaGuardar.habilidad = habilidad.querySelector(".skill-name").innerHTML;

            let widthHabilidad = habilidad.querySelector(".level").style.width;
            habilidadParaGuardar.nivel = (parseInt(widthHabilidad) / 25);

            filosofo.habilidades.push(habilidadParaGuardar);
        }

        filosofosParseados.push(filosofo);
    }
    return filosofosParseados;
}

function guardarTarjetas(){
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    localStorage.setItem('tarjetas',JSON.stringify(parsearTarjetas(tarjetas)));
}

function cargarTarjetas() {
    let tarjetasGuardadas = JSON.parse(localStorage.getItem('tarjetas'));

    let contenedor = document.querySelector('.cards-container');
    contenedor.innerHTML = "";

    crearTarjetas(tarjetasGuardadas)
}

const filosofos = [
    {
        nombre: "Platón",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clemetino_Inv305.jpg/1200px-Plato_Pio-Clemetino_Inv305.jpg",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Idealismo",
        arma: "Dialéctica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 4
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 4
        }
        ]
    },
    {
        nombre: "Aristóteles",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXUwy_fFGOJ2vwOMpwtJPyXc9HVb06HSRsbembn7IPKq6D1YitIra2WFM4Gu2rm6yHRs&usqp=CAU",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Naturalismo",
        arma: "Lógica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 4
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Descartes",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/800px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg",
        pais: {
            nombre: "Francia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png"
        },
        corriente: "Racionalismo",
        arma: "Meditación",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Kant",
        imagen: "https://i.pinimg.com/736x/20/89/7f/20897f915acb5124893a278c395382ed.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Trascendentalismo",
        arma: "Crítica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Hume",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiFZYg2MiOQSXbkBvFP-T3vW9pnhLW5qDioA&s",
        pais: {
            nombre: "Escocia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/640px-Flag_of_Scotland.svg.png"
        },
        corriente: "Empirismo",
        arma: "Escepticismo",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Arendt",
        imagen: "https://efeminista.com/wp-content/uploads/2021/09/Arendt-Hannah-1-e1576158475623.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Fenomenología",
        arma: "Parresía",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    }
]