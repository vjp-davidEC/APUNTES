        (function() {
            try {
                if (localStorage.getItem('tema_apuntes') === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                }
            } catch(e) {}
        })();
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
    
