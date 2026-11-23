        const params = new URLSearchParams(window.location.search);
        const fileUrl = params.get('file');
        const statusEl = document.getElementById('status');
        const container = document.getElementById('pdfContainer');
        const fallbackFrame = document.getElementById('fallbackFrame');
        const downloadBtn = document.getElementById('downloadBtn');
        const downloadText = document.getElementById('downloadText');
        const fileTitle = document.getElementById('fileTitle');
        const moduleBadge = document.getElementById('moduleBadge');
        const faviconEl = document.getElementById('favicon');
        const backBtn = document.getElementById('backBtn');

        const fromParam = params.get('from');
        if (fromParam && backBtn) {
            backBtn.href = fromParam;
        } else if (document.referrer && document.referrer.includes(window.location.hostname) && backBtn) {
            backBtn.href = document.referrer;
        }

        const MODULE_ICONS = {
            AD: {
                title: 'Acceso a Datos',
                color: '#a485ff',
                bg: 'rgba(127, 82, 255, 0.16)',
                border: 'rgba(127, 82, 255, 0.35)',
                mode: 'stroke',
                svgInner: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>'
            },
            PMYDM: {
                title: 'Programación Multimedia y Dispositivos Móviles',
                color: '#3DDC84',
                bg: 'rgba(61, 220, 132, 0.16)',
                border: 'rgba(61, 220, 132, 0.38)',
                mode: 'fill',
                svgInner: '<path fill="#3DDC84" d="M17.6 11.48 L19.44 8.3 a0.63 0.63 0 0 0 -1.09 -0.63 l-1.88 3.24 a11.43 11.43 0 0 0 -8.94 0 L5.65 7.67 a0.63 0.63 0 0 0 -1.09 0.63 L6.4 11.48 A10.81 10.81 0 0 0 1 20 h22 A10.81 10.81 0 0 0 17.6 11.48 Z M7 17.25 A1.25 1.25 0 1 1 8.25 16 A1.25 1.25 0 0 1 7 17.25 Z M17 17.25 A1.25 1.25 0 1 1 18.25 16 A1.25 1.25 0 0 1 17 17.25 Z"/>'
            },
            DI: {
                title: 'Desarrollo de Interfaces',
                color: '#e879f9',
                bg: 'rgba(199, 17, 225, 0.16)',
                border: 'rgba(199, 17, 225, 0.35)',
                mode: 'stroke',
                svgInner: '<rect x="3" y="3" width="18" height="18" rx="2.5"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>'
            },
            PSP: {
                title: 'Programación de Servicios y Procesos',
                color: '#fb923c',
                bg: 'rgba(248, 137, 9, 0.16)',
                border: 'rgba(248, 137, 9, 0.38)',
                mode: 'stroke',
                svgInner: '<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><line x1="9" y1="2" x2="9" y2="5"/><line x1="15" y1="2" x2="15" y2="5"/><line x1="9" y1="19" x2="9" y2="22"/><line x1="15" y1="19" x2="15" y2="22"/><line x1="19" y1="9" x2="22" y2="9"/><line x1="19" y1="15" x2="22" y2="15"/><line x1="2" y1="9" x2="5" y2="9"/><line x1="2" y1="15" x2="5" y2="15"/>'
            },
            SSGE: {
                title: 'Sistemas de Gestión Empresarial',
                color: '#38bdf8',
                bg: 'rgba(56, 189, 248, 0.16)',
                border: 'rgba(56, 189, 248, 0.38)',
                mode: 'stroke',
                svgInner: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="3" y1="20" x2="21" y2="20"/>'
            },
            DIGIT: {
                title: 'Digitalización',
                color: '#a485ff',
                bg: 'rgba(127, 82, 255, 0.16)',
                border: 'rgba(127, 82, 255, 0.35)',
                mode: 'stroke',
                svgInner: '<circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3a14.5 14.5 0 0 1 4 9 14.5 14.5 0 0 1-4 9 14.5 14.5 0 0 1-4-9 14.5 14.5 0 0 1 4-9z"/>'
            },
            SOST: {
                title: 'Sostenibilidad',
                color: '#3DDC84',
                bg: 'rgba(61, 220, 132, 0.16)',
                border: 'rgba(61, 220, 132, 0.38)',
                mode: 'stroke',
                svgInner: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>'
            },
            OPTATIVA: {
                title: 'Optativa',
                color: '#fb923c',
                bg: 'rgba(248, 137, 9, 0.16)',
                border: 'rgba(248, 137, 9, 0.38)',
                mode: 'stroke',
                svgInner: '<rect x="2" y="4" width="20" height="16" rx="2.5"/><polyline points="7 9 10 12 7 15"/><line x1="12" y1="15" x2="17" y2="15"/>'
            }
        };

        function buildInlineSvg(mod, size) {
            if (mod.mode === 'fill') {
                return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">${mod.svgInner}</svg>`;
            }
            return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${mod.color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${mod.svgInner}</svg>`;
        }

        function buildFaviconHref(mod) {
            const inner = mod.mode === 'fill'
                ? `<g transform="translate(6,6) scale(0.833)">${mod.svgInner}</g>`
                : `<g transform="translate(6,6) scale(0.833)" fill="none" stroke="${mod.color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${mod.svgInner}</g>`;
            const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><defs><linearGradient id='g' x1='0' y1='1' x2='1' y2='0'><stop offset='0%' stop-color='#2563eb'/><stop offset='52%' stop-color='#3b82f6'/><stop offset='100%' stop-color='#06b6d4'/></linearGradient></defs><rect width='32' height='32' rx='8' fill='#0f172a' stroke='url(#g)' stroke-width='1.8'/>${inner}</svg>`;
            return 'data:image/svg+xml,' + encodeURIComponent(svg);
        }

        function detectModuleFromPath(url, fileName) {
            // 0. Si viene en los parámetros de la URL (?modulo=DI o ?mod=DI)
            const explicitMod = (params.get('modulo') || params.get('mod') || '').toUpperCase();
            if (explicitMod && MODULE_ICONS[explicitMod]) {
                return explicitMod;
            }

            const decoded = decodeURIComponent(url || '');
            // 1. Buscar en la ruta /modulos/<MOD>/ o Temas-<MOD>
            const pathMatch = decoded.match(/(?:modulos[\/\\]|Temas-)(AD|PMYDM|DI|PSP|SSGE|DIGIT|SOST|OPTATIVA)\b/i);
            if (pathMatch) {
                return pathMatch[1].toUpperCase();
            }
            // 2. Buscar por prefijo del nombre del archivo (ej. DI-UT3.pdf, DI-UT01.html, PSP-UT01.html, AD-UT1.html)
            const nameMatch = (fileName || '').match(/^(AD|PMYDM|DI|PSP|SSGE|DIGIT|SOST|OPTATIVA)[\s\-_]/i);
            if (nameMatch) {
                return nameMatch[1].toUpperCase();
            }
            // 3. Buscar coincidencia de clave de módulo en la ruta completa
            const keys = Object.keys(MODULE_ICONS);
            for (const key of keys) {
                const regex = new RegExp(`\\b${key}\\b`, 'i');
                if (regex.test(decoded)) {
                    return key;
                }
            }
            return null;
        }

        function applyModuleBranding(modKey, fileName) {
            const mod = MODULE_ICONS[modKey];
            if (!mod) return;

            // Actualizar icono de la pestaña / ventana del navegador (favicon)
            const favHref = buildFaviconHref(mod);
            if (faviconEl) {
                faviconEl.setAttribute('href', favHref);
            } else {
                const link = document.createElement('link');
                link.id = 'favicon';
                link.rel = 'icon';
                link.type = 'image/svg+xml';
                link.href = favHref;
                document.head.appendChild(link);
            }

            // Mostrar insignia e icono del módulo en la barra superior junto al nombre del fichero
            if (moduleBadge) {
                moduleBadge.style.display = 'inline-flex';
                moduleBadge.style.background = mod.bg;
                moduleBadge.style.borderColor = mod.border;
                moduleBadge.style.color = mod.color;
                moduleBadge.title = mod.title;
                moduleBadge.innerHTML = `${buildInlineSvg(mod, 17)}<span>${modKey}</span>`;
            }

            document.title = `${fileName} · ${modKey} · Apuntes 2º DAM`;
        }

        function showFallback(url) {
            statusEl.style.display = 'none';
            if (container) container.style.display = 'none';
            fallbackFrame.src = url;
            fallbackFrame.style.display = 'block';
        }

        function showHtmlDocument(url) {
            statusEl.style.display = 'none';
            if (container) container.style.display = 'none';
            document.body.classList.add('html-mode');
            fallbackFrame.src = url;
            fallbackFrame.style.display = 'block';

            fallbackFrame.addEventListener('load', () => {
                try {
                    const doc = fallbackFrame.contentDocument || fallbackFrame.contentWindow.document;
                    if (doc) {
                        const syncTheme = () => {
                            const curTheme = document.documentElement.getAttribute('data-theme');
                            const isLight = curTheme === 'light' || (!curTheme && localStorage.getItem('tema_apuntes') === 'light');
                            const targetTheme = isLight ? 'light' : 'dark';

                            if (isLight) {
                                doc.documentElement.setAttribute('data-theme', 'light');
                                doc.documentElement.dataset.theme = 'light';
                                doc.documentElement.classList.remove('dark');
                                doc.documentElement.classList.add('light');
                            } else {
                                doc.documentElement.setAttribute('data-theme', 'dark');
                                doc.documentElement.dataset.theme = 'dark';
                                doc.documentElement.classList.add('dark');
                                doc.documentElement.classList.remove('light');
                            }

                            try {
                                if (typeof fallbackFrame.contentWindow.applyTheme === 'function') {
                                    fallbackFrame.contentWindow.applyTheme(targetTheme);
                                }
                            } catch (_) {}
                        };
                        syncTheme();

                        // Inyectar estilos para ocultar botones redundantes de volver y temas
                        let overrideStyle = doc.getElementById('visor-injected-overrides');
                        if (!overrideStyle) {
                            overrideStyle = doc.createElement('style');
                            overrideStyle.id = 'visor-injected-overrides';
                            overrideStyle.textContent = `
                                #ut-floating-theme-btn,
                                .ut-floating-theme-btn,
                                #btn-tema,
                                #theme-toggle,
                                button[onclick*="toggleTheme"],
                                .ut-top-bar,
                                .top-bar {
                                    display: none !important;
                                }
                            `;
                            (doc.head || doc.documentElement).appendChild(overrideStyle);
                        }

                        // Ocultar botones y barras directamente en el DOM
                        const hideElements = [
                            '#ut-floating-theme-btn',
                            '.ut-floating-theme-btn',
                            '#btn-tema',
                            '#theme-toggle',
                            'button[onclick*="toggleTheme"]',
                            '.ut-top-bar',
                            '.top-bar'
                        ];
                        hideElements.forEach(selector => {
                            doc.querySelectorAll(selector).forEach(el => {
                                el.style.setProperty('display', 'none', 'important');
                            });
                        });

                        const observer = new MutationObserver(syncTheme);
                        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
                    }
                } catch (e) {
                    // Ignorar si hay restricción cross-origin
                }
            });
        }

        if (!fileUrl) {
            statusEl.textContent = 'No se ha especificado ningún archivo para visualizar.';
        } else {
            const fileName = decodeURIComponent(fileUrl.split('/').pop().split('?')[0]);
            fileTitle.textContent = fileName;
            downloadBtn.href = fileUrl;
            downloadBtn.setAttribute('download', fileName);

            const isHtml = /\.(html|htm)($|\?)/i.test(fileUrl);
            if (downloadText) {
                downloadText.textContent = isHtml ? 'Descargar HTML' : 'Descargar PDF';
            }

            const detectedMod = detectModuleFromPath(fileUrl, fileName);
            if (detectedMod) {
                applyModuleBranding(detectedMod, fileName);
            } else {
                document.title = fileName + ' · Apuntes 2º DAM';
            }

            if (isHtml) {
                // Modo HTML: Mostrar directamente en el iframe integrado con toolbar y branding
                showHtmlDocument(fileUrl);
            } else {
                // Modo PDF: en ordenador usamos visor nativo de PDF en iframe, en móvil pdfjs
                const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.matchMedia('(max-width: 768px)').matches;
                if (!isMobile) {
                    showFallback(fileUrl);
                } else if (window.pdfjsLib && window.location.protocol !== 'file:') {
                    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

                    pdfjsLib.getDocument(fileUrl).promise.then(async (pdf) => {
                        statusEl.style.display = 'none';
                        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                            const page = await pdf.getPage(pageNum);
                            const viewport = page.getViewport({ scale: 1.6 });
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d');
                            canvas.width = viewport.width;
                            canvas.height = viewport.height;
                            container.appendChild(canvas);
                            await page.render({ canvasContext: ctx, viewport }).promise;
                        }
                    }).catch(() => {
                        showFallback(fileUrl);
                    });
                } else {
                    showFallback(fileUrl);
                }
            }
        }
