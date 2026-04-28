document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS ---
    const btnEntrar = document.getElementById('btn-entrar-overlay');
    const overlay = document.getElementById('overlay-inicio');
    const music = document.getElementById('bg-music');
    const textoElemento = document.getElementById("maquina-escribir");
    const hands = document.querySelectorAll('.hand');
    const botonesSonido = document.querySelectorAll('.btn-sonido');
    const light = document.getElementById('light');

    // --- AUDIO ---
    const audioClick = new Audio('./img/force sound effcts.mp3');
    audioClick.volume = 1;

    const sonidoHover = new Audio('./img/forcepersuas02.wav');
    sonidoHover.volume = 0.1; 
    sonidoHover.playbackRate = 1.5;

    // --- MÁQUINA DE ESCRIBIR ---
    const fraseEscribir = "No es solo energía… es lo que conecta todo. Y en un lugar olvidado… tomó forma.";
    let charIndex = 0;

    function escribirLetra() {
        if (textoElemento && charIndex < fraseEscribir.length) {
            textoElemento.innerHTML += fraseEscribir.charAt(charIndex);
            charIndex++;
            setTimeout(escribirLetra, 30);
        }
    }

    // --- OVERLAY ---
    if (btnEntrar) {
        btnEntrar.addEventListener('click', (e) => {
            e.preventDefault();
            overlay.classList.add('fade-out');

            if (music) {
                music.volume = 0.4;
                music.play().catch(() => {});
            }

            setTimeout(escribirLetra, 1200);
        });
    }

    // --- CARDS POR SECCIÓN ---
    document.querySelectorAll('.info-section').forEach(section => {

        const cards = section.querySelectorAll('.card-personaje');
        const tituloG = section.querySelector('.titulo-grande');
        const descG = section.querySelector('.descripcion-grande');
        const contenedorG = section.querySelector('.card-grande-base');
        const gradient = section.dataset.gradient || "rgba(13, 24, 44, 0.9)";

        cards.forEach(card => {

            card.addEventListener('mouseenter', () => {
                sonidoHover.currentTime = 0;
                sonidoHover.play().catch(() => {});

                const nombre = card.dataset.nombre;
                const info = card.dataset.descripcion;
                const imagenLarga = card.dataset.fullbody;

                if (tituloG && descG && contenedorG) {
                    tituloG.classList.remove('efecto-fade');
                    descG.classList.remove('efecto-fade');

                    tituloG.innerText = nombre;
                    descG.innerText = info;

                    contenedorG.style.backgroundImage =
                        `linear-gradient(to top, ${gradient} 30%, transparent), url('${imagenLarga}')`;

                    void tituloG.offsetWidth;

                    tituloG.classList.add('efecto-fade');
                    descG.classList.add('efecto-fade');
                }
            });

            // CLICK
            card.addEventListener('click', () => {
                audioClick.currentTime = 0.4;
                audioClick.play();
            });

        });
    });

    // --- SONIDOS EXTRA ---
    hands.forEach(hand => {
        hand.addEventListener('mouseenter', () => {
            sonidoHover.currentTime = 0;
            sonidoHover.play();
        });
    });

    botonesSonido.forEach(boton => {
        boton.addEventListener('click', () => {
            audioClick.currentTime = 0.4;
            audioClick.play();
        });
    });

    // --- CURSOR LIGHT ---
    document.addEventListener('mousemove', (e) => {
        if (light) {
            requestAnimationFrame(() => {
                light.style.left = e.clientX + 'px';
                light.style.top = e.clientY + 'px';
            });
        }
    });

    // --- PRECARGA ---
    const imagenesParaPrecargar = [
        './img/the force wireframe-17.png',
        './img/obiwan-11.png',
        './img/the force wireframe-14.png',
        './img/the force wireframe-15.png',
        './img/the force wireframe-16.png',
        './img/the force wireframe-18.png'
    ];

    imagenesParaPrecargar.forEach(ruta => {
        const img = new Image();
        img.src = ruta;
    });

});