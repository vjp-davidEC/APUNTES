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
            if (loginIcon) loginIcon.textContent = '☀️';
        } else {
            document.documentElement.removeAttribute('data-theme');
            document.getElementById('btnModoOscuro')?.classList.add('active');
            document.getElementById('btnModoClaro')?.classList.remove('active');
            if (loginIcon) loginIcon.textContent = '🌙';
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

    // Abrir PDFs en el visor integrado en móviles
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.matchMedia('(max-width: 768px)').matches;
    if (isMobile && window.location.protocol !== 'file:') {
        document.querySelectorAll('.pdf-item a[href$=".pdf" i]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const fullUrl = new URL(link.getAttribute('href'), window.location.href).href;
                window.location.href = './visor.html?file=' + encodeURIComponent(fullUrl);
            });
        });
    }
