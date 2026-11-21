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
                if (icon) icon.textContent = nuevo === 'light' ? '☀️' : '🌙';
                try { localStorage.setItem('tema_apuntes', nuevo); } catch(e) {}
            }
        };
    
