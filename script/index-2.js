    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
    import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

    const firebaseConfig = {
        apiKey: "AIzaSyBFZam148XYpCwQCY95HrxLXW1lG5mhOWk",
        authDomain: "webapuntes-53c06.firebaseapp.com",
        projectId: "webapuntes-53c06",
        storageBucket: "webapuntes-53c06.firebasestorage.app",
        messagingSenderId: "753987489106",
        appId: "1:753987489106:web:7021e3b276d3cef8053e8b"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // Función de Iniciar Sesión
    window.iniciarSesion = function() {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const errorMsg = document.getElementById('error-msg');

        errorMsg.style.color = "#f87171";
        errorMsg.innerText = "";

        if (!email || !password) {
            errorMsg.innerText = "Por favor, rellena todos los campos.";
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                errorMsg.innerText = "Acceso denegado: Correo no autorizado o contraseña incorrecta.";
            });
    };

    // NUEVA FUNCIÓN: Solicitar Registro
    window.solicitarRegistro = function() {
        const email = document.getElementById('email').value.trim();
        const errorMsg = document.getElementById('error-msg');

        errorMsg.style.color = "#f87171";
        errorMsg.innerText = "";

        if (!email) {
            errorMsg.innerText = "Por favor, escribe tu correo arriba para solicitar el acceso.";
            return;
        }

        //Cambiuar correo de recuperacion
        const correoAdmin = "jatarrerom01@informatica.iesvalledeljerteplasencia.es"; 
        const asunto = encodeURIComponent("Solicitud de acceso a Apuntes 2º DAM");
        const cuerpo = encodeURIComponent(`Hola,\n\nQuisiera solicitar acceso a la web de apuntes con el correo: ${email}\n\n¡Gracias!`);

        // Abre el cliente de correo del usuario con los datos prellenados
        window.location.href = `mailto:${correoAdmin}?subject=${asunto}&body=${cuerpo}`;
    };

    // Función de Recuperar Contraseña
    window.recuperarPassword = function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value.trim();
        const errorMsg = document.getElementById('error-msg');

        errorMsg.style.color = "#f87171";
        errorMsg.innerText = "";

        if (!email) {
            errorMsg.innerText = "Escribe tu correo arriba primero para recuperar la contraseña.";
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                errorMsg.style.color = "#38bdf8";
                errorMsg.innerText = "¡Correo enviado! Revisa tu bandeja de entrada.";
            })
            .catch((error) => {
                errorMsg.style.color = "#f87171";
                errorMsg.innerText = "No se ha podido enviar. Comprueba que el correo sea correcto.";
            });
    };

    // Control de Tema Claro / Oscuro con persistencia en localStorage
    function aplicarTema(tema) {
        const loginIcon = document.getElementById('theme-login-icon');
        if (tema === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            document.getElementById('btnModoClaro')?.classList.add('active');
            document.getElementById('btnModoOscuro')?.classList.remove('active');
            if (loginIcon) loginIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
        } else {
            document.documentElement.removeAttribute('data-theme');
            document.getElementById('btnModoOscuro')?.classList.add('active');
            document.getElementById('btnModoClaro')?.classList.remove('active');
            if (loginIcon) loginIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
        }
        try {
            localStorage.setItem('tema_apuntes', tema);
        } catch(e) {}
    }

    // Inicializar tema guardado
    const temaInicial = localStorage.getItem('tema_apuntes') || 'dark';
    aplicarTema(temaInicial);

    window.cambiarTema = function(tema) {
        aplicarTema(tema);
    };

    window.alternarTema = function() {
        const actual = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        const nuevo = actual === 'light' ? 'dark' : 'light';
        aplicarTema(nuevo);
    };

    // Control del Menú de Ajustes
    window.toggleMenuAjustes = function(event) {
        event.stopPropagation();
        const menu = document.getElementById('menuAjustes');
        if (menu) {
            menu.classList.toggle('show');
        }
    };

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener('click', (e) => {
        const menu = document.getElementById('menuAjustes');
        const btn = document.getElementById('btnAjustes');
        if (menu && menu.classList.contains('show')) {
            if (!menu.contains(e.target) && !btn?.contains(e.target)) {
                menu.classList.remove('show');
            }
        }
    });

    // Función de Cerrar Sesión
    window.cerrarSesion = function() {
        signOut(auth);
    };

    const ADMINS_PERMITIDOS = [
        "descuderoc03@informatica.iesvalledeljerteplasencia.es",
        "jatarrerom01@informatica.iesvalledeljerteplasencia.es"
    ];

    // Escucha el estado de la sesión de manera automática
    onAuthStateChanged(auth, (user) => {
        const loginScreen = document.getElementById('login-screen');
        const mainContainer = document.getElementById('main-container');
        const adminMenuSection = document.getElementById('adminMenuSection');

        if (user) {
            loginScreen.style.display = 'none';
            mainContainer.style.display = 'block';
            const email = (user.email || '').toLowerCase();
            if (adminMenuSection) {
                adminMenuSection.style.display = ADMINS_PERMITIDOS.includes(email) ? 'block' : 'none';
            }
        } else {
            loginScreen.style.display = 'block';
            mainContainer.style.display = 'none';
            if (adminMenuSection) {
                adminMenuSection.style.display = 'none';
            }
        }
    });

    // Ocultar en index.html cualquier documento que esté en la sección #hiddenSection de modulos/*/index.html o en localStorage
    async function sincronizarOcultosConModulos() {
        const cardsList = Array.from(document.querySelectorAll('.card'));
        await Promise.all(cardsList.map(async (card) => {
            const badgeText = card.querySelector('.badge')?.textContent?.trim() || '';
            const dataMod = (card.getAttribute('data-module') || '').split(' ')[0];
            const mod = (badgeText || dataMod || '').toUpperCase();
            if (!mod) return;

            let savedMap = {};
            try {
                const raw = localStorage.getItem(`ocultos_${mod}`);
                if (raw) savedMap = JSON.parse(raw);
            } catch (_) {}

            // Leer también modulos/<MOD>/index.html para detectar qué enlaces están dentro de #hiddenSection
            const hiddenHrefsInFile = new Set();
            try {
                const resp = await fetch(`./modulos/${mod}/index.html?t=${Date.now()}`, { cache: 'no-store' });
                if (resp.ok) {
                    const modHtml = await resp.text();
                    const parser = new DOMParser();
                    const modDoc = parser.parseFromString(modHtml, 'text/html');
                    const hiddenSec = modDoc.getElementById('hiddenSection') || modDoc.querySelector('.hidden-section');
                    if (hiddenSec) {
                        hiddenSec.querySelectorAll('.pdf-item a').forEach(a => {
                            const h = (a.getAttribute('href') || '').trim();
                            if (h) {
                                hiddenHrefsInFile.add(h);
                                hiddenHrefsInFile.add(decodeURIComponent(h).split('/').pop() || '');
                            }
                        });
                    }
                }
            } catch (_) {}

            card.querySelectorAll('.pdf-item').forEach(li => {
                const a = li.querySelector('a');
                if (!a) return;
                const href = (a.getAttribute('href') || '').trim();
                const relHref = href.replace(new RegExp(`^\\.?\\/modulos\\/${mod}\\/`, 'i'), './');
                const fileName = decodeURIComponent(href).split('/').pop() || '';
                const hiddenByStorage = savedMap[relHref] === true || savedMap[href] === true;
                const shownByStorage = savedMap[relHref] === false || savedMap[href] === false;
                const hiddenInModHtml = !shownByStorage && (hiddenHrefsInFile.has(relHref) || (fileName && hiddenHrefsInFile.has(fileName)));

                if (hiddenByStorage || hiddenInModHtml) {
                    li.remove();
                }
            });
        }));
    }
    sincronizarOcultosConModulos();

    // Filtro en tiempo real por tema o asignatura
    const searchInput = document.getElementById('searchInput');
    const cards = document.querySelectorAll('.card');

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.trim().toLowerCase();

        cards.forEach(card => {
            const moduleText = (card.dataset.module || '').toLowerCase();
            const moduleMatches = term === '' || moduleText.includes(term);

            const items = card.querySelectorAll('.pdf-item');
            let visibleCount = 0;

            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                const show = moduleMatches || text.includes(term);
                item.style.display = show ? 'block' : 'none';
                if (show) visibleCount++;
            });

            card.style.display = visibleCount > 0 ? 'block' : 'none';
        });
    });

    // Abrir todos los documentos (PDF y HTML) en el visor integrado para mostrar toolbar, módulo y volver al inicio
    document.querySelectorAll('.pdf-item a').forEach(link => {
        link.addEventListener('click', (e) => {
            const rawHref = link.getAttribute('href');
            if (!rawHref || rawHref.startsWith('#')) return;

            const isDoc = /\.(pdf|html|htm)($|\?)/i.test(rawHref) || !/^https?:\/\//i.test(rawHref);
            if (!isDoc) return;

            e.preventDefault();
            const card = link.closest('.card');
            const badgeText = card?.querySelector('.badge')?.textContent?.trim() || '';
            const dataMod = (card?.getAttribute('data-module') || '').split(' ')[0];
            const mod = badgeText || dataMod || '';
            const modQuery = mod ? '&modulo=' + encodeURIComponent(mod) : '';

            window.location.href = './visor.html?file=' + encodeURIComponent(rawHref) + modQuery + '&from=' + encodeURIComponent('./index.html');
        });
    });
