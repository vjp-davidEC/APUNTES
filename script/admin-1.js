        (function() {
            try {
                if (localStorage.getItem('tema_apuntes') === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                }
            } catch(e) {}
        })();
        window.alternarTema = function() {
            var actual = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            var nuevo = actual === 'light' ? 'dark' : 'light';
            if (window.cambiarTema) {
                window.cambiarTema(nuevo);
            } else {
                if (nuevo === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                } else {
                    document.documentElement.removeAttribute('data-theme');
                }
                var icon = document.getElementById('theme-login-icon');
                if (icon) icon.innerHTML = nuevo === 'light' ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>` : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
                try { localStorage.setItem('tema_apuntes', nuevo); } catch(e) {}
            }
        };
        window.recargarPagina = async function(btn) {
            if (btn) {
                var svg = btn.querySelector('svg');
                if (svg) svg.style.animation = 'spinReload 0.6s linear infinite';
            }
            try {
                if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
                    await fetch(window.location.href, { cache: 'reload' });
                }
            } catch (_) {}
            window.location.reload();
        };
        window.toggleVerPassword = function(inputId, btn) {
            var input = document.getElementById(inputId);
            if (!input) return;
            var mostrar = input.type === 'password';
            input.type = mostrar ? 'text' : 'password';
            if (btn) {
                btn.title = mostrar ? 'Ocultar contraseña' : 'Mostrar contraseña';
                btn.setAttribute('aria-label', btn.title);
                btn.innerHTML = mostrar
                    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>'
                    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
            }
        };
    
