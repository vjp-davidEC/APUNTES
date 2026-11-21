    const searchInput = document.getElementById('searchInput');
    const items = document.querySelectorAll('.pdf-item');
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.trim().toLowerCase();
        items.forEach(item => {
            item.style.display = item.textContent.toLowerCase().includes(term) ? 'block' : 'none';
        });
    });
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.matchMedia('(max-width: 768px)').matches;
    if (isMobile && window.location.protocol !== 'file:') {
        document.querySelectorAll('.pdf-item a[href$=".pdf" i]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const fullUrl = new URL(link.getAttribute('href'), window.location.href).href;
                window.location.href = '../../visor.html?file=' + encodeURIComponent(fullUrl);
            });
        });
    }
    // Control de Tema Claro / Oscuro sincronizado
    function aplicarTema(tema) {
        const btnIcon = document.getElementById('theme-icon');
        const btnText = document.getElementById('theme-text');
        if (tema === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            if (btnIcon) btnIcon.textContent = '☀️';
            if (btnText) btnText.textContent = 'Claro';
        } else {
            document.documentElement.removeAttribute('data-theme');
            if (btnIcon) btnIcon.textContent = '🌙';
            if (btnText) btnText.textContent = 'Oscuro';
        }
        try { localStorage.setItem('tema_apuntes', tema); } catch(e) {}
    }

    function alternarTema() {
        const actual = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        const nuevo = actual === 'light' ? 'dark' : 'light';
        aplicarTema(nuevo);
    }

    aplicarTema(localStorage.getItem('tema_apuntes') || 'dark');
