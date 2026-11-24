    const searchInput = document.getElementById('searchInput');
    const toggleHiddenBtn = document.getElementById('toggleHiddenBtn');
    const hiddenSection = document.getElementById('hiddenSection');
    const visibleList = document.getElementById('visibleList') || document.querySelector('main.card > ul.pdf-list');
    const hiddenList = document.getElementById('hiddenList') || (hiddenSection ? hiddenSection.querySelector('ul.pdf-list') : null);
    const STORAGE_HIDDEN_KEY = 'ocultos_SOST';

    function applyAdminHiddenOverrides() {
        if (!visibleList || !hiddenList) return;
        let savedMap = {};
        try {
            const raw = localStorage.getItem(STORAGE_HIDDEN_KEY);
            if (raw) savedMap = JSON.parse(raw);
        } catch (_) {}

        document.querySelectorAll('.pdf-item').forEach(li => {
            const link = li.querySelector('a');
            const href = link ? (link.getAttribute('href') || '').trim() : '';
            if (!href) return;
            if (Object.prototype.hasOwnProperty.call(savedMap, href)) {
                const shouldHide = Boolean(savedMap[href]);
                if (shouldHide && !hiddenList.contains(li)) {
                    hiddenList.appendChild(li);
                } else if (!shouldHide && !visibleList.contains(li)) {
                    visibleList.appendChild(li);
                }
            }
        });
    }

    applyAdminHiddenOverrides();

    if (toggleHiddenBtn && hiddenSection) {
        toggleHiddenBtn.addEventListener('click', () => {
            if (hiddenList && hiddenList.querySelectorAll('.pdf-item').length === 0) return;
            hiddenSection.classList.toggle('visible');
            toggleHiddenBtn.classList.toggle('active');
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.trim().toLowerCase();
            document.querySelectorAll('.pdf-item').forEach(item => {
                item.style.display = item.textContent.toLowerCase().includes(term) ? 'block' : 'none';
            });
        });
    }

    document.querySelectorAll('.pdf-item a').forEach(link => {
        link.addEventListener('click', (e) => {
            const rawHref = link.getAttribute('href');
            if (!rawHref || rawHref.startsWith('#')) return;
            if (/\.(pdf|html|htm)($|\?)/i.test(rawHref) || !/^https?:\/\//i.test(rawHref)) {
                e.preventDefault();
                const cleanHref = rawHref.replace(/^\.\//, '');
                const relFromRoot = './modulos/SOST/' + cleanHref;
                window.location.href = '../../visor.html?file=' + encodeURIComponent(relFromRoot) + '&modulo=SOST&from=' + encodeURIComponent('./modulos/SOST/index.html');
            }
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
            if (btnIcon) btnIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-3px"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
            if (btnText) btnText.textContent = 'Oscuro';
        }
        try { localStorage.setItem('tema_apuntes', tema); } catch(e) {}
    }

    window.alternarTema = function() {
        const actual = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        const nuevo = actual === 'light' ? 'dark' : 'light';
        aplicarTema(nuevo);
    };

    aplicarTema(localStorage.getItem('tema_apuntes') || 'dark');
