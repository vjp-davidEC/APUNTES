    const searchInput = document.getElementById('searchInput');
    const items = document.querySelectorAll('.pdf-item');
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.trim().toLowerCase();
        items.forEach(item => {
            item.style.display = item.textContent.toLowerCase().includes(term) ? 'block' : 'none';
        });
    });
        document.querySelectorAll('.pdf-item a[href$=".pdf" i]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const rawHref = link.getAttribute('href').replace(/^\.\//, '');
            const relFromRoot = './modulos/PMYDM/' + rawHref;
            window.location.href = '../../visor.html?file=' + encodeURIComponent(relFromRoot);
        });
    });
    // Control de Tema Claro / Oscuro sincronizado
    function aplicarTema(tema) {
        const btnIcon = document.getElementById('theme-icon');
        const btnText = document.getElementById('theme-text');
        if (tema === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            if (btnIcon) btnIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-3px"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
            if (btnText) btnText.textContent = 'Claro';
        } else {
            document.documentElement.removeAttribute('data-theme');
            if (btnIcon) btnIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a485ff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-3px"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
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
