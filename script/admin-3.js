        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
        import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
        import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject, listAll } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

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
        const storage = getStorage(app);

        // ⚠️ CAMBIA ESTOS DOS CORREOS POR LOS VUESTROS (LOS DOS ADMINS)
        const ADMINS = [
            "jatarrerom01@informatica.iesvalledeljerteplasencia.es",
            "descuderoc03@informatica.iesvalledeljerteplasencia.es"
        ];

        // Función para Iniciar Sesión en el Panel Admin
        window.iniciarSesionAdmin = function() {
            const email = document.getElementById('admin-email-input').value.trim();
            const password = document.getElementById('admin-pass-input').value;
            const errorMsg = document.getElementById('error-msg');

            errorMsg.style.color = "#f87171";
            errorMsg.innerText = "";

            if (!email || !password) {
                errorMsg.innerText = "Por favor, rellena todos los campos.";
                return;
            }

            // Comprobar si el correo está en la lista de admins antes de dejar pasar
            if (!ADMINS.includes(email)) {
                errorMsg.innerText = "Acceso denegado: Este correo no tiene privilegios de administrador.";
                return;
            }

            signInWithEmailAndPassword(auth, email, password)
                .catch((error) => {
                    errorMsg.innerText = "Contraseña incorrecta o usuario no encontrado.";
                });
        };

        // Control de Tema Claro / Oscuro con persistencia en localStorage
        function aplicarTema(tema) {
            const loginIcon = document.getElementById('theme-login-icon');
            if (tema === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
                document.getElementById('btnModoClaro')?.classList.add('active');
                document.getElementById('btnModoOscuro')?.classList.remove('active');
                if (loginIcon) loginIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a485ff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
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

        // Función para Cerrar Sesión
        window.cerrarSesionAdmin = function() {
            signOut(auth).then(() => {
                window.location.reload();
            });
        };

        // Vigilar estado de la sesión
        onAuthStateChanged(auth, (user) => {
            const loginScreen = document.getElementById('login-screen');
            const adminContainer = document.getElementById('admin-container');

            if (user && ADMINS.includes(user.email)) {
                // Es un admin válido: Ocultar login, mostrar panel
                loginScreen.style.display = 'none';
                adminContainer.style.display = 'block';
                document.getElementById('admin-email-display').innerText = user.email;
                aplicarTema(localStorage.getItem('tema_apuntes') || 'dark');
            } else {
                // No autenticado o no es admin: Mostrar login, ocultar panel
                loginScreen.style.display = 'block';
                adminContainer.style.display = 'none';
            }
        });

        // Manejo de archivo seleccionado del ordenador
        const archivoLocalInput = document.getElementById('archivoLocalInput');
        const moduloSelect = document.getElementById('moduloSelect');

        function actualizarRutaLocal(nombreArchivo) {
            const modulo = moduloSelect.value;
            const ruta = `./modulos/${modulo}/Temas-${modulo}/${nombreArchivo}`;
            document.getElementById('enlaceApunte').value = ruta;
            const aviso = document.getElementById('aviso-carpeta-local');
            if (aviso) {
                aviso.innerHTML = `💡 <em>Para usarlo localmente en GitHub, guarda este archivo en <code>modulos/${modulo}/Temas-${modulo}/${nombreArchivo}</code></em>`;
            }
        }

        archivoLocalInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;

            document.getElementById('nombre-archivo-seleccionado').innerText = file.name;
            document.getElementById('tamano-archivo').innerText = `(${(file.size / (1024 * 1024)).toFixed(2)} MB)`;
            document.getElementById('archivo-local-info').style.display = 'block';

            // Auto-seleccionar tipo PDF o HTML según la extensión
            const ext = file.name.split('.').pop().toLowerCase();
            const tipoSelect = document.getElementById('tipoApunte');
            if (ext === 'pdf') {
                tipoSelect.value = 'PDF';
            } else if (ext === 'html' || ext === 'htm') {
                tipoSelect.value = 'HTML';
            }

            // Auto-completar título si está vacío
            const tituloInput = document.getElementById('tituloApunte');
            if (!tituloInput.value.trim()) {
                const nombreSinExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                tituloInput.value = nombreSinExt;
            }

            // Auto-generar ruta relativa en el campo de enlace
            actualizarRutaLocal(file.name);
        });

        // Actualizar la ruta si se cambia de módulo
        moduloSelect.addEventListener('change', function() {
            if (archivoLocalInput.files && archivoLocalInput.files[0]) {
                const enlaceActual = document.getElementById('enlaceApunte').value;
                if (enlaceActual.startsWith('./modulos/')) {
                    actualizarRutaLocal(archivoLocalInput.files[0].name);
                }
            }
        });

        function construirBloqueLi(enlace, titulo, tipo, indent = '                ') {
            return `${indent}<li class="pdf-item">\n${indent}    <a href="${enlace}">\n${indent}        <span>${titulo}</span>\n${indent}        <span class="pdf-tag">${tipo}</span>\n${indent}    </a>\n${indent}</li>`;
        }

        function insertarApunteEnIndexHtml(htmlText, modulo, enlace, titulo, tipo) {
            const escapedEnlace = enlace.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            if (new RegExp(`href=["']${escapedEnlace}["']`, 'i').test(htmlText)) {
                return { updated: htmlText, alreadyExists: true };
            }

            const bloqueLi = construirBloqueLi(enlace, titulo, tipo, '                ');
            const sectionRegex = new RegExp(`(<section[^>]*data-module=["']${modulo}(?:\\s[^"']*)?["'][\\s\\S]*?<ul class=["']pdf-list["']>[\\s\\S]*?)([ \\t]*</ul>)`, 'i');

            if (!sectionRegex.test(htmlText)) {
                return { updated: null, alreadyExists: false };
            }

            const updated = htmlText.replace(sectionRegex, (_, g1, g2) => `${g1}${bloqueLi}\n${g2}`);
            return { updated, alreadyExists: false };
        }

        function insertarApunteEnModuloHtml(htmlText, enlaceRelativoModulo, titulo, tipo) {
            const escaped = enlaceRelativoModulo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            if (new RegExp(`href=["']${escaped}["']`, 'i').test(htmlText)) {
                return htmlText;
            }
            const bloqueLi = `            <li class="pdf-item"><a href="${enlaceRelativoModulo}"><span>${titulo}</span><span class="pdf-tag">${tipo}</span></a></li>`;
            return htmlText.replace(/(<ul class=["']pdf-list["']>[\s\S]*?)([ \t]*<\/ul>)/i, (_, g1, g2) => `${g1}${bloqueLi}\n${g2}`);
        }

        function fileToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const res = String(reader.result || '');
                    const idx = res.indexOf(',');
                    resolve(idx >= 0 ? res.slice(idx + 1) : res);
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }

        function utf8ToBase64(str) {
            const bytes = new TextEncoder().encode(str);
            let bin = '';
            for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
            return btoa(bin);
        }

        function base64ToUtf8(b64) {
            const bin = atob(b64.replace(/\s/g, ''));
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            return new TextDecoder().decode(bytes);
        }

        function getGithubConfig() {
            return {
                repo: (localStorage.getItem('gh_repo') || 'vjp-davidEC/APUNTES').trim(),
                branch: (localStorage.getItem('gh_branch') || 'main').trim(),
                token: (localStorage.getItem('gh_token') || '').trim()
            };
        }

        function actualizarEstadoGithubUI() {
            const cfg = getGithubConfig();
            const rIn = document.getElementById('githubRepoInput');
            const bIn = document.getElementById('githubBranchInput');
            const tIn = document.getElementById('githubTokenInput');
            const badge = document.getElementById('githubStatusBadge');
            if (rIn) rIn.value = cfg.repo;
            if (bIn) bIn.value = cfg.branch;
            if (tIn && cfg.token) tIn.value = cfg.token;
            if (badge) {
                if (cfg.token) {
                    badge.style.display = 'none';
                    badge.innerText = '';
                } else {
                    badge.style.display = 'block';
                    badge.style.color = 'var(--text-muted)';
                    badge.innerText = 'Sin token configurado';
                }
            }
        }
        actualizarEstadoGithubUI();

        function detectarDispositivo() {
            const ua = navigator.userAgent || '';
            const esIPhone = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
            const esMovil = esIPhone || /Android/i.test(ua);
            const esFirefoxPC = !esMovil && /Firefox/i.test(ua);
            const navegador = esIPhone
                ? (/FxiOS/i.test(ua) ? 'Firefox' : /CriOS/i.test(ua) ? 'Chrome' : 'Safari')
                : (/Firefox/i.test(ua) ? 'Firefox' : /Edg/i.test(ua) ? 'Edge' : /Chrome/i.test(ua) ? 'Chrome' : 'Navegador');
            return { esIPhone, esFirefoxPC, navegador };
        }

        function actualizarBannerDispositivo() {
            const el = document.getElementById('device-mode-badge');
            if (!el) return;
            const { esIPhone, esFirefoxPC, navegador } = detectarDispositivo();
            const tieneToken = Boolean(getGithubConfig().token);

            el.style.display = 'block';
            if (esIPhone) {
                if (tieneToken) {
                    el.style.color = '#4ade80';
                    el.innerText = `📱 iPhone (${navegador}) detectado · Modo GitHub activo`;
                } else {
                    el.style.color = '#fbbf24';
                    el.innerText = `📱 iPhone (${navegador}) detectado · Configura tu Token en Ajustes`;
                }
            } else if (esFirefoxPC) {
                if (tieneToken) {
                    el.style.color = '#4ade80';
                    el.innerText = `🦊 Firefox (PC) detectado · Modo GitHub activo`;
                } else {
                    el.style.color = '#fbbf24';
                    el.innerText = `🦊 Firefox (PC) detectado · Configura tu Token en Ajustes`;
                }
            } else {
                if (tieneToken) {
                    el.style.color = '#4ade80';
                    el.innerText = `💻 ${navegador} (PC) detectado · Modo GitHub activo`;
                } else {
                    el.style.color = '#38bdf8';
                    el.innerText = `💻 ${navegador} (PC) detectado · Configura tu Token en Ajustes`;
                }
            }
        }

        window.guardarConfigGithub = function() {
            const repo = (document.getElementById('githubRepoInput')?.value || 'vjp-davidEC/APUNTES').trim();
            const branch = (document.getElementById('githubBranchInput')?.value || 'main').trim();
            const token = (document.getElementById('githubTokenInput')?.value || '').trim();
            localStorage.setItem('gh_repo', repo);
            localStorage.setItem('gh_branch', branch);
            localStorage.setItem('gh_token', token);
            actualizarEstadoGithubUI();
            actualizarBannerDispositivo();
        };
        actualizarBannerDispositivo();

        async function githubGetFile(path, cfg) {
            const resp = await fetch(`https://api.github.com/repos/${cfg.repo}/contents/${path}?ref=${encodeURIComponent(cfg.branch)}`, {
                headers: {
                    'Authorization': `Bearer ${cfg.token}`,
                    'Accept': 'application/vnd.github+json'
                },
                cache: 'no-store'
            });
            if (!resp.ok) {
                if (resp.status === 404) return null;
                const err = await resp.json().catch(() => ({}));
                throw new Error(err.message || `Error GitHub ${resp.status}`);
            }
            const data = await resp.json();
            return { sha: data.sha, text: base64ToUtf8(data.content || '') };
        }

        async function githubPutFile(path, base64Content, message, cfg, sha = null) {
            const body = { message, content: base64Content, branch: cfg.branch };
            if (sha) body.sha = sha;
            const resp = await fetch(`https://api.github.com/repos/${cfg.repo}/contents/${path}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${cfg.token}`,
                    'Accept': 'application/vnd.github+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            if (!resp.ok) {
                const err = await resp.json().catch(() => ({}));
                throw new Error(err.message || `Error subiendo ${path} (${resp.status})`);
            }
            return resp.json();
        }

        async function githubDeleteFile(path, message, cfg, sha) {
            const resp = await fetch(`https://api.github.com/repos/${cfg.repo}/contents/${path}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${cfg.token}`,
                    'Accept': 'application/vnd.github+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message, sha, branch: cfg.branch })
            });
            if (!resp.ok) {
                const err = await resp.json().catch(() => ({}));
                throw new Error(err.message || `Error eliminando ${path} (${resp.status})`);
            }
            return resp.json();
        }

        // Función para guardar el archivo en su carpeta y ponerlo automáticamente en index.html
        window.publicarApunte = async function() {
            const modulo = document.getElementById('moduloSelect').value;
            const titulo = document.getElementById('tituloApunte').value.trim();
            const enlace = document.getElementById('enlaceApunte').value.trim();
            const tipo = document.getElementById('tipoApunte').value;
            const statusMsg = document.getElementById('status-msg');
            const localFile = archivoLocalInput.files && archivoLocalInput.files[0];

            statusMsg.style.color = "#f87171";
            statusMsg.innerText = "";

            if (!titulo || !enlace) {
                statusMsg.innerText = "Por favor, rellena el título y el enlace o importa un archivo.";
                return;
            }

            if (!getGithubConfig().token && typeof window.showDirectoryPicker === 'function') {
                try {
                    if (!localProjectHandle) {
                        localProjectHandle = await window.showDirectoryPicker({
                            id: 'apuntes_folder',
                            mode: 'readwrite'
                        });
                    }

                    // Verificar que se seleccionó la carpeta raíz APUNTES (la que contiene index.html)
                    let indexHandle;
                    try {
                        indexHandle = await localProjectHandle.getFileHandle('index.html', { create: false });
                    } catch (_) {
                        localProjectHandle = null;
                        statusMsg.style.color = "#fbbf24";
                        statusMsg.innerText = "Debes seleccionar la carpeta principal 'APUNTES' (donde está index.html) para guardar el fichero y crear el <li> automáticamente.";
                        return;
                    }

                    // 1. Si hay un archivo importado, guardarlo en modulos/<MODULO>/Temas-<MODULO>/
                    if (localFile) {
                        const modulosDir = await localProjectHandle.getDirectoryHandle('modulos', { create: false });
                        const modDir = await modulosDir.getDirectoryHandle(modulo, { create: false });
                        const temasDir = await modDir.getDirectoryHandle(`Temas-${modulo}`, { create: false });
                        const destHandle = await temasDir.getFileHandle(localFile.name, { create: true });
                        const writableFile = await destHandle.createWritable();
                        await writableFile.write(localFile);
                        await writableFile.close();
                    }

                    // 2. Insertar el <li> en index.html principal
                    const indexFile = await indexHandle.getFile();
                    const htmlText = await indexFile.text();
                    const res = insertarApunteEnIndexHtml(htmlText, modulo, enlace, titulo, tipo);

                    if (!res.updated) {
                        statusMsg.style.color = "#f87171";
                        statusMsg.innerText = `No se encontró la sección de ${modulo} en index.html.`;
                        return;
                    }

                    if (!res.alreadyExists) {
                        const writableIndex = await indexHandle.createWritable();
                        await writableIndex.write(res.updated);
                        await writableIndex.close();
                    }

                    // 3. Insertar el <li> también en modulos/<MODULO>/index.html
                    let modActualizado = false;
                    try {
                        const modulosDir = await localProjectHandle.getDirectoryHandle('modulos', { create: false });
                        const modDir = await modulosDir.getDirectoryHandle(modulo, { create: false });
                        const modIndexHandle = await modDir.getFileHandle('index.html', { create: false });
                        const modIndexFile = await modIndexHandle.getFile();
                        const modHtmlText = await modIndexFile.text();
                        const enlaceMod = localFile ? `./Temas-${modulo}/${localFile.name}` : enlace.replace(`./modulos/${modulo}/`, './');
                        const modUpdated = insertarApunteEnModuloHtml(modHtmlText, enlaceMod, titulo, tipo);
                        const writableMod = await modIndexHandle.createWritable();
                        await writableMod.write(modUpdated);
                        await writableMod.close();
                        modActualizado = true;
                    } catch (e) {
                        console.warn('No se actualizó el index.html del módulo:', e);
                    }

                    statusMsg.style.color = "#4ade80";
                    statusMsg.innerText = res.alreadyExists
                        ? `✓ Fichero guardado en modulos/${modulo}/Temas-${modulo}/ y el enlace ya existía en index.html${modActualizado ? ` y en modulos/${modulo}/index.html` : ''}.`
                        : `✓ ¡Fichero guardado en modulos/${modulo}/Temas-${modulo}/ y <li> creado automáticamente en index.html${modActualizado ? ` y en modulos/${modulo}/index.html` : ''}!`;
                    return;
                } catch (err) {
                    if (err.name === 'AbortError') {
                        statusMsg.style.color = "#fbbf24";
                        statusMsg.innerText = "Operación cancelada. Selecciona la carpeta APUNTES para guardar el fichero y añadir el <li>.";
                        return;
                    }
                    console.error("Error al guardar en carpeta local:", err);
                    statusMsg.style.color = "#f87171";
                    statusMsg.innerText = "Error al guardar: " + err.message;
                    return;
                }
            }

            // 2. Modo iPhone / Móvil (Safari, Chrome, Firefox en iOS) usando API de GitHub
            const ghCfg = getGithubConfig();
            if (ghCfg.token) {
                try {
                    statusMsg.style.color = "#38bdf8";
                    statusMsg.innerText = "Subiendo apunte a GitHub y actualizando los index.html...";

                    if (localFile) {
                        const filePath = `modulos/${modulo}/Temas-${modulo}/${localFile.name}`;
                        const existingFile = await githubGetFile(filePath, ghCfg);
                        const fileB64 = await fileToBase64(localFile);
                        await githubPutFile(filePath, fileB64, `Subir ${localFile.name} a ${modulo}`, ghCfg, existingFile?.sha || null);
                    }

                    const ghIndex = await githubGetFile('index.html', ghCfg);
                    if (!ghIndex) throw new Error('No se encontró index.html en el repositorio de GitHub.');
                    const resIndex = insertarApunteEnIndexHtml(ghIndex.text, modulo, enlace, titulo, tipo);
                    if (!resIndex.updated) throw new Error(`No se encontró la sección de ${modulo} en index.html.`);
                    if (!resIndex.alreadyExists) {
                        await githubPutFile('index.html', utf8ToBase64(resIndex.updated), `Añadir ${titulo} a index.html`, ghCfg, ghIndex.sha);
                    }

                    let modActualizado = false;
                    try {
                        const modPath = `modulos/${modulo}/index.html`;
                        const ghMod = await githubGetFile(modPath, ghCfg);
                        if (ghMod) {
                            const enlaceMod = localFile ? `./Temas-${modulo}/${localFile.name}` : enlace.replace(`./modulos/${modulo}/`, './');
                            const modUpdated = insertarApunteEnModuloHtml(ghMod.text, enlaceMod, titulo, tipo);
                            if (modUpdated !== ghMod.text) {
                                await githubPutFile(modPath, utf8ToBase64(modUpdated), `Añadir ${titulo} a ${modPath}`, ghCfg, ghMod.sha);
                            }
                            modActualizado = true;
                        }
                    } catch (_) {}

                    statusMsg.style.color = "#4ade80";
                    statusMsg.innerText = `✓ ¡Subido a GitHub! Fichero guardado en modulos/${modulo}/Temas-${modulo}/ y añadido a index.html${modActualizado ? ` y modulos/${modulo}/index.html` : ''}.`;
                    return;
                } catch (errGh) {
                    console.error("Error GitHub:", errGh);
                    statusMsg.style.color = "#f87171";
                    statusMsg.innerText = "Error con GitHub: " + errGh.message;
                    return;
                }
            }

            // Fallback si el navegador no soporta showDirectoryPicker ni hay token/servidor
            statusMsg.style.color = "#fbbf24";
            statusMsg.innerText = "Para subir ficheros desde iPhone o Firefox, configura tu Token de GitHub en ⚙️ Ajustes (arriba a la derecha).";
        };

        // ==========================================
        // GESTOR Y ELIMINACIÓN DE ARCHIVOS (PDF / HTML)
        // ==========================================

        window.abrirModalEliminarArchivos = function() {
            const menu = document.getElementById('menuAjustes');
            if (menu) menu.classList.remove('show');
            const modal = document.getElementById('modalEliminarArchivos');
            if (modal) {
                modal.style.display = 'flex';
                cargarApuntesDeIndexHtml();
            }
        };

        window.cerrarModalEliminarArchivos = function(event) {
            if (event && event.target && event.target.id !== 'modalEliminarArchivos' && !event.target.classList.contains('modal-close-btn')) {
                return;
            }
            const modal = document.getElementById('modalEliminarArchivos');
            if (modal) modal.style.display = 'none';
        };

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.getElementById('modalEliminarArchivos');
                if (modal && modal.style.display === 'flex') {
                    modal.style.display = 'none';
                }
            }
        });

        window.cambiarTabEliminar = function(tab) {
            document.getElementById('tabBtnLocal')?.classList.toggle('active', tab === 'local');
            document.getElementById('tabBtnFirebase')?.classList.toggle('active', tab === 'firebase');
            document.getElementById('tabBtnIndex')?.classList.toggle('active', tab === 'index');

            const pLocal = document.getElementById('panelTabLocal');
            const pFirebase = document.getElementById('panelTabFirebase');
            const pIndex = document.getElementById('panelTabIndex');

            if (pLocal) pLocal.style.display = tab === 'local' ? 'block' : 'none';
            if (pFirebase) pFirebase.style.display = tab === 'firebase' ? 'block' : 'none';
            if (pIndex) pIndex.style.display = tab === 'index' ? 'block' : 'none';

            if (tab === 'firebase' && (!window._firebaseFilesList || window._firebaseFilesList.length === 0)) {
                cargarArchivosFirebase();
            } else if (tab === 'index') {
                cargarApuntesDeIndexHtml();
            }
        };

        function formatearTamano(bytes) {
            if (!bytes || bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        // --- 1. GESTIÓN LOCAL (Archivos en modulos/) ---
        let localProjectHandle = null;
        let localFilesList = [];
        let localFilesFiltrados = [];

        window.conectarCarpetaLocal = async function() {
            if (typeof window.showDirectoryPicker !== 'function') {
                alert("Tu navegador actual no admite la API de acceso al sistema de archivos local.\nPara eliminar archivos de tu disco sin usar Visual Studio, por favor abre esta web con Google Chrome o Microsoft Edge.");
                return;
            }
            try {
                const dirHandle = await window.showDirectoryPicker({
                    id: 'apuntes_folder',
                    mode: 'readwrite'
                });
                localProjectHandle = dirHandle;
                const estado = document.getElementById('txtEstadoCarpetaLocal');
                if (estado) {
                    estado.innerHTML = `<span style="color: #4ade80; font-weight: 600;">✓ Carpeta conectada: ${dirHandle.name}</span>`;
                }
                const btn = document.getElementById('btnConectarCarpeta');
                if (btn) btn.innerText = "📂 Cambiar Carpeta";
                const controles = document.getElementById('controlesFiltroLocal');
                if (controles) controles.style.display = 'block';
                await escanearArchivosLocales();
            } catch(err) {
                if (err.name !== 'AbortError') {
                    console.error("Error al conectar carpeta:", err);
                    alert("No se pudo conectar la carpeta: " + err.message);
                }
            }
        };

        window.escanearArchivosLocales = async function() {
            if (!localProjectHandle) return;
            const container = document.getElementById('listaArchivosLocales');
            if (container) {
                container.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--text-muted);">Escaneando archivos en modulos/...</div>';
            }
            localFilesList = [];

            async function walk(dirHandle, currentPath = '') {
                for await (const [name, handle] of dirHandle.entries()) {
                    if (name.startsWith('.') || name === 'node_modules' || name === 'img') continue;
                    const fullPath = currentPath ? `${currentPath}/${name}` : name;
                    if (handle.kind === 'file') {
                        const ext = name.split('.').pop().toLowerCase();
                        if (ext === 'pdf' || ext === 'html' || ext === 'htm') {
                            if (name === 'admin.html' || name === 'visor.html' || (fullPath === 'index.html' && !currentPath)) {
                                continue;
                            }
                            let size = 0;
                            try {
                                const f = await handle.getFile();
                                size = f.size;
                            } catch(e) {}

                            let modulo = '';
                            const match = fullPath.match(/modulos\/([^/]+)/i);
                            if (match) modulo = match[1].toUpperCase();

                            localFilesList.push({
                                name,
                                path: fullPath,
                                handle,
                                parentHandle: dirHandle,
                                size,
                                ext: ext === 'htm' ? 'html' : ext,
                                modulo: modulo || 'Otros'
                            });
                        }
                    } else if (handle.kind === 'directory') {
                        await walk(handle, fullPath);
                    }
                }
            }

            try {
                await walk(localProjectHandle, '');
                filtrarArchivosLocales();
            } catch(e) {
                console.error("Error al escanear carpeta:", e);
                if (container) {
                    container.innerHTML = `<div style="text-align: center; padding: 2rem; color: #f87171;">Error al escanear carpeta: ${e.message}</div>`;
                }
            }
        };

        window.filtrarArchivosLocales = function() {
            const texto = (document.getElementById('filtroLocalTexto')?.value || '').trim().toLowerCase();
            const modulo = (document.getElementById('filtroLocalModulo')?.value || '').trim().toUpperCase();
            const tipo = (document.getElementById('filtroLocalTipo')?.value || '').trim().toLowerCase();

            localFilesFiltrados = localFilesList.filter(f => {
                const coincideTexto = !texto || f.name.toLowerCase().includes(texto) || f.path.toLowerCase().includes(texto);
                const coincideModulo = !modulo || f.modulo === modulo;
                const coincideTipo = !tipo || f.ext === tipo;
                return coincideTexto && coincideModulo && coincideTipo;
            });

            const contador = document.getElementById('contadorArchivosLocales');
            if (contador) contador.innerText = `${localFilesFiltrados.length} archivo(s) encontrado(s)`;

            renderizarArchivosLocales();
        };

        function renderizarArchivosLocales() {
            const container = document.getElementById('listaArchivosLocales');
            if (!container) return;

            if (localFilesFiltrados.length === 0) {
                container.innerHTML = `<div style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
                    No se han encontrado archivos que coincidan con el filtro.
                </div>`;
                return;
            }

            container.innerHTML = localFilesFiltrados.map((file, idx) => {
                const badgeClass = file.ext === 'pdf' ? 'badge-pdf' : 'badge-html';
                return `
                    <div class="file-item-card">
                        <div class="file-item-info">
                            <span class="file-icon-badge ${badgeClass}">${file.ext.toUpperCase()}</span>
                            <div style="min-width: 0; flex: 1;">
                                <div class="file-name-text" title="${file.name}">${file.name}</div>
                                <div class="file-path-subtext" title="${file.path}">${file.path} &bull; ${formatearTamano(file.size)}</div>
                            </div>
                        </div>
                        <div class="file-actions-group">
                            <button type="button" class="btn-delete-file" onclick="eliminarArchivoLocal(${idx})" title="Eliminar este archivo del disco">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                                <span>Eliminar</span>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        window.eliminarArchivoLocal = async function(idx) {
            const file = localFilesFiltrados[idx];
            if (!file) return;

            if (!confirm(`¿Estás seguro de que deseas eliminar permanentemente del disco el archivo "${file.name}"?\n\nRuta: ${file.path}`)) {
                return;
            }

            try {
                await file.parentHandle.removeEntry(file.name);

                let quitadoDeIndex = false;
                try {
                    const indexHandle = await localProjectHandle.getFileHandle('index.html');
                    const fileObj = await indexHandle.getFile();
                    let html = await fileObj.text();

                    if (html.includes(file.name)) {
                        const regex = new RegExp(`[ \\t]*<li class="pdf-item">[\\s\\S]*?${file.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?<\\/li>\\s*`, 'gi');
                        if (regex.test(html)) {
                            if (confirm(`El archivo "${file.name}" está enlazado en index.html.\n\n¿Deseas quitar también automáticamente su enlace de index.html para que no quede roto?`)) {
                                html = html.replace(regex, '\n');
                                const writable = await indexHandle.createWritable();
                                await writable.write(html);
                                await writable.close();
                                quitadoDeIndex = true;
                            }
                        }
                    }
                } catch(e) {
                    console.warn("No se pudo comprobar index.html:", e);
                }

                alert(`✓ Archivo "${file.name}" eliminado correctamente.` + (quitadoDeIndex ? '\n✓ Enlace retirado de index.html con éxito.' : ''));
                await escanearArchivosLocales();
            } catch(err) {
                console.error("Error al eliminar archivo local:", err);
                alert("Error al eliminar el archivo: " + err.message);
            }
        };

        // --- 2. GESTIÓN FIREBASE STORAGE ---
        const MODULOS_LIST = ["AD", "PMYDM", "DI", "PSP", "SSGE", "DIGIT", "SOST", "OPTATIVA"];
        window._firebaseFilesList = [];
        let firebaseFilesFiltrados = [];

        window.cargarArchivosFirebase = async function() {
            const container = document.getElementById('listaArchivosFirebase');
            if (container) {
                container.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--text-muted);">Consultando archivos en Firebase Storage...</div>';
            }

            const todos = [];
            try {
                for (const mod of MODULOS_LIST) {
                    try {
                        const folderRef = ref(storage, `apuntes/${mod}`);
                        const res = await listAll(folderRef);
                        for (const itemRef of res.items) {
                            let url = '';
                            try {
                                url = await getDownloadURL(itemRef);
                            } catch(e) {}
                            todos.push({
                                name: itemRef.name,
                                fullPath: itemRef.fullPath,
                                modulo: mod,
                                url: url,
                                ext: itemRef.name.split('.').pop().toLowerCase()
                            });
                        }
                    } catch(e) {}
                }
                window._firebaseFilesList = todos;
                filtrarArchivosFirebase();
            } catch(err) {
                console.error("Error al listar Firebase:", err);
                if (container) {
                    container.innerHTML = `<div style="text-align: center; padding: 2rem; color: #f87171;">
                        Error al consultar Firebase Storage. Revisa los permisos y reglas en Firebase Console.<br>
                        <small style="color: var(--text-muted);">${err.message}</small>
                    </div>`;
                }
            }
        };

        window.filtrarArchivosFirebase = function() {
            const texto = (document.getElementById('filtroFirebaseTexto')?.value || '').trim().toLowerCase();
            const modulo = (document.getElementById('filtroFirebaseModulo')?.value || '').trim().toUpperCase();

            firebaseFilesFiltrados = (window._firebaseFilesList || []).filter(f => {
                const coincideTexto = !texto || f.name.toLowerCase().includes(texto) || f.fullPath.toLowerCase().includes(texto);
                const coincideModulo = !modulo || f.modulo === modulo;
                return coincideTexto && coincideModulo;
            });

            renderizarArchivosFirebase();
        };

        function renderizarArchivosFirebase() {
            const container = document.getElementById('listaArchivosFirebase');
            if (!container) return;

            if (firebaseFilesFiltrados.length === 0) {
                container.innerHTML = `<div style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
                    No se encontraron archivos en Firebase Storage (o no coinciden con el filtro).
                </div>`;
                return;
            }

            container.innerHTML = firebaseFilesFiltrados.map((file, idx) => {
                const badgeClass = file.ext === 'pdf' ? 'badge-pdf' : 'badge-html';
                return `
                    <div class="file-item-card">
                        <div class="file-item-info">
                            <span class="file-icon-badge ${badgeClass}">${file.ext.toUpperCase()}</span>
                            <div style="min-width: 0; flex: 1;">
                                <div class="file-name-text" title="${file.name}">${file.name}</div>
                                <div class="file-path-subtext">${file.modulo} &bull; ${file.fullPath}</div>
                            </div>
                        </div>
                        <div class="file-actions-group">
                            ${file.url ? `<a href="${file.url}" target="_blank" class="btn-view-file">Ver</a>` : ''}
                            <button type="button" class="btn-delete-file" onclick="eliminarArchivoFirebase(${idx})" title="Eliminar de Firebase Storage">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                                <span>Eliminar</span>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        window.eliminarArchivoFirebase = async function(idx) {
            const file = firebaseFilesFiltrados[idx];
            if (!file) return;

            if (!confirm(`¿Estás seguro de que deseas eliminar permanentemente el archivo "${file.name}" de Firebase Storage?\n\nRuta en la nube: ${file.fullPath}`)) {
                return;
            }

            try {
                const fileRef = ref(storage, file.fullPath);
                await deleteObject(fileRef);
                alert(`✓ Archivo "${file.name}" eliminado de Firebase Storage.`);
                await cargarArchivosFirebase();
            } catch(err) {
                console.error("Error al eliminar de Firebase:", err);
                alert("Error al eliminar de Firebase Storage: " + err.message);
            }
        };

        // --- 3. GESTIÓN ENLACES DE INDEX.HTML ---
        let apuntesIndexList = [];
        let apuntesIndexFiltrados = [];

        window.cargarApuntesDeIndexHtml = async function() {
            const container = document.getElementById('listaApuntesIndex');
            if (container) {
                container.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--text-muted);">Leyendo index.html...</div>';
            }

            let htmlText = '';
            if (localProjectHandle) {
                try {
                    const h = await localProjectHandle.getFileHandle('index.html');
                    const f = await h.getFile();
                    htmlText = await f.text();
                } catch(e) {
                    console.warn("No se pudo leer index.html del handle:", e);
                }
            }

            if (!htmlText) {
                const ghCfg = getGithubConfig();
                if (ghCfg.token) {
                    try {
                        const ghIndex = await githubGetFile('index.html', ghCfg);
                        if (ghIndex) htmlText = ghIndex.text;
                    } catch (e) {
                        console.warn("No se pudo leer index.html de GitHub:", e);
                    }
                }
            }

            if (!htmlText) {
                try {
                    const resp = await fetch('index.html', { cache: 'no-store' });
                    if (resp.ok) htmlText = await resp.text();
                } catch(e) {}
            }

            if (!htmlText) {
                if (container) {
                    container.innerHTML = `<div style="text-align: center; padding: 2rem; color: var(--text-muted);">
                        No se pudo leer <code>index.html</code>. Pulsa en "Quitar" en cualquier enlace o asegúrate de abrir la web desde un servidor local / Live Server.
                    </div>`;
                }
                return;
            }

            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');
            const cards = doc.querySelectorAll('.card');
            apuntesIndexList = [];

            cards.forEach(card => {
                const cardTitle = card.querySelector('.card-title')?.textContent?.trim() || '';
                const badge = card.querySelector('.badge')?.textContent?.trim() || '';
                const items = card.querySelectorAll('.pdf-item');
                items.forEach(li => {
                    const a = li.querySelector('a');
                    if (!a) return;
                    const href = a.getAttribute('href') || '';
                    const titleSpan = a.querySelector('span:first-child');
                    const tagSpan = a.querySelector('.pdf-tag');
                    const titulo = titleSpan ? titleSpan.textContent.trim() : a.textContent.trim();
                    const tipo = tagSpan ? tagSpan.textContent.trim() : (href.toLowerCase().endsWith('.pdf') ? 'PDF' : 'HTML');

                    apuntesIndexList.push({
                        modulo: badge || cardTitle,
                        titulo: titulo,
                        href: href,
                        tipo: tipo
                    });
                });
            });

            filtrarApuntesIndex();
        };

        window.filtrarApuntesIndex = function() {
            const texto = (document.getElementById('filtroIndexTexto')?.value || '').trim().toLowerCase();
            const modulo = (document.getElementById('filtroIndexModulo')?.value || '').trim().toUpperCase();

            apuntesIndexFiltrados = apuntesIndexList.filter(item => {
                const coincideTexto = !texto || item.titulo.toLowerCase().includes(texto) || item.href.toLowerCase().includes(texto);
                const coincideModulo = !modulo || item.modulo.trim().toUpperCase() === modulo;
                return coincideTexto && coincideModulo;
            });

            renderizarApuntesIndex();
        };

        function renderizarApuntesIndex() {
            const container = document.getElementById('listaApuntesIndex');
            if (!container) return;

            if (apuntesIndexFiltrados.length === 0) {
                container.innerHTML = `<div style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
                    No se han encontrado enlaces en index.html con los filtros aplicados.
                </div>`;
                return;
            }

            container.innerHTML = apuntesIndexFiltrados.map((item, idx) => {
                const badgeClass = item.tipo.toLowerCase() === 'pdf' ? 'badge-pdf' : 'badge-html';
                return `
                    <div class="file-item-card">
                        <div class="file-item-info">
                            <span class="file-icon-badge ${badgeClass}">${item.tipo}</span>
                            <div style="min-width: 0; flex: 1;">
                                <div class="file-name-text" title="${item.titulo}">${item.titulo}</div>
                                <div class="file-path-subtext">${item.modulo} &bull; ${item.href}</div>
                            </div>
                        </div>
                        <div class="file-actions-group">
                            <a href="${item.href}" target="_blank" class="btn-view-file">Abrir</a>
                            <button type="button" class="btn-delete-file" onclick="eliminarApunteDeIndex(${idx})" title="Quitar este apunte de index.html">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                                <span>Quitar</span>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        window.eliminarApunteDeIndex = async function(idx) {
            const item = apuntesIndexFiltrados[idx];
            if (!item) return;

            if (getGithubConfig().token || (!localProjectHandle && typeof window.showDirectoryPicker !== 'function')) {
                const ghCfg = getGithubConfig();
                if (!ghCfg.token) {
                    alert("Para eliminar apuntes desde iPhone o Firefox, configura tu Token de GitHub en ⚙️ Ajustes.");
                    return;
                }
                if (!confirm(`¿Estás seguro de que deseas eliminar este apunte en GitHub?\n\nSe quitará el <li> de index.html, de modulos/${item.modulo}/index.html y se borrará el archivo del repositorio.\n\nTítulo: ${item.titulo}\nEnlace: ${item.href}`)) {
                    return;
                }
                try {
                    const quitarLi = (sourceHtml, debeBorrarHref) => {
                        let eliminado = false;
                        const nuevoHtml = sourceHtml.replace(
                            /[ \t]*<li class="pdf-item">(?:(?!<\/li>)[\s\S])*?<\/li>[ \t]*\r?\n?/gi,
                            (bloqueLi) => {
                                const m = bloqueLi.match(/href=["']([^"']+)["']/i);
                                if (m && debeBorrarHref(m[1])) {
                                    eliminado = true;
                                    return '';
                                }
                                return bloqueLi;
                            }
                        );
                        return { nuevoHtml, eliminado };
                    };

                    const targetHrefNorm = decodeURIComponent(item.href).trim();
                    const ghIndex = await githubGetFile('index.html', ghCfg);
                    let quitadoPrincipal = false;
                    if (ghIndex) {
                        const resP = quitarLi(ghIndex.text, (h) => h.trim() === item.href.trim() || decodeURIComponent(h).trim() === targetHrefNorm);
                        if (resP.eliminado) {
                            await githubPutFile('index.html', utf8ToBase64(resP.nuevoHtml), `Quitar ${item.titulo} de index.html`, ghCfg, ghIndex.sha);
                            quitadoPrincipal = true;
                        }
                    }

                    const cleanHref = item.href.replace(/^\.\//, '');
                    const fileName = decodeURIComponent(cleanHref.split('/').pop() || '');
                    const moduloTarget = item.modulo.trim();
                    let modActualizado = false;
                    if (moduloTarget) {
                        const modPath = `modulos/${moduloTarget}/index.html`;
                        const ghMod = await githubGetFile(modPath, ghCfg);
                        if (ghMod) {
                            const resM = quitarLi(ghMod.text, (h) => {
                                const dec = decodeURIComponent(h).trim();
                                return h.trim() === item.href.trim() || (fileName !== '' && (dec.split('/').pop() || '') === fileName);
                            });
                            if (resM.eliminado) {
                                await githubPutFile(modPath, utf8ToBase64(resM.nuevoHtml), `Quitar ${item.titulo} de ${modPath}`, ghCfg, ghMod.sha);
                                modActualizado = true;
                            }
                        }
                    }

                    let archivoBorrado = false;
                    if (!/^https?:\/\//i.test(item.href)) {
                        const repoFilePath = cleanHref.split('/').filter(Boolean).map(p => decodeURIComponent(p)).join('/');
                        const ghFile = await githubGetFile(repoFilePath, ghCfg);
                        if (ghFile) {
                            await githubDeleteFile(repoFilePath, `Eliminar ${fileName}`, ghCfg, ghFile.sha);
                            archivoBorrado = true;
                        }
                    }

                    alert(`✓ Eliminado en GitHub:\n${quitadoPrincipal ? '• Quitada entrada de index.html\n' : ''}${modActualizado ? `• Quitada entrada de modulos/${moduloTarget}/index.html\n` : ''}${archivoBorrado ? `• Archivo "${fileName}" borrado del repositorio` : ''}`);
                    await cargarApuntesDeIndexHtml();
                } catch (errGh) {
                    alert("Error al eliminar en GitHub: " + errGh.message);
                }
                return;
            }

            if (!localProjectHandle) {
                try {
                    localProjectHandle = await window.showDirectoryPicker({
                        id: 'apuntes_folder',
                        mode: 'readwrite'
                    });
                } catch(err) {
                    return;
                }
            }

            if (!confirm(`¿Estás seguro de que deseas eliminar este apunte?\n\nSe quitará el <li> de index.html, de los index.html de módulos y se borrará el archivo físico.\n\nTítulo: ${item.titulo}\nEnlace: ${item.href}`)) {
                return;
            }

            try {
                // 1. Quitar <li> de index.html principal
                function quitarSoloEsteLi(sourceHtml, debeBorrarHref) {
                    let eliminado = false;
                    const nuevoHtml = sourceHtml.replace(
                        /[ \t]*<li class="pdf-item">(?:(?!<\/li>)[\s\S])*?<\/li>[ \t]*\r?\n?/gi,
                        (bloqueLi) => {
                            const m = bloqueLi.match(/href=["']([^"']+)["']/i);
                            if (m && debeBorrarHref(m[1])) {
                                eliminado = true;
                                return '';
                            }
                            return bloqueLi;
                        }
                    );
                    return { nuevoHtml, eliminado };
                }

                // 1. Quitar solo ese <li> de index.html principal
                const handle = await localProjectHandle.getFileHandle('index.html');
                const f = await handle.getFile();
                const html = await f.text();

                const targetHrefNorm = decodeURIComponent(item.href).trim();
                const resPrincipal = quitarSoloEsteLi(html, (hrefActual) => {
                    return hrefActual.trim() === item.href.trim() || decodeURIComponent(hrefActual).trim() === targetHrefNorm;
                });

                let quitadoPrincipal = false;
                if (resPrincipal.eliminado) {
                    const writable = await handle.createWritable();
                    await writable.write(resPrincipal.nuevoHtml);
                    await writable.close();
                    quitadoPrincipal = true;
                }

                // 2. Quitar solo ese <li> del index.html dentro de modulos/<MODULO>/index.html
                const cleanHref = item.href.replace(/^\.\//, '');
                const fileName = decodeURIComponent(cleanHref.split('/').pop() || '');
                const moduloTarget = item.modulo.trim();

                let modulosActualizados = 0;
                try {
                    const modulosDir = await localProjectHandle.getDirectoryHandle('modulos', { create: false });
                    const modDirs = [];
                    if (moduloTarget) {
                        try {
                            modDirs.push(await modulosDir.getDirectoryHandle(moduloTarget, { create: false }));
                        } catch (_) {}
                    }
                    if (modDirs.length === 0) {
                        for await (const [, entryHandle] of modulosDir.entries()) {
                            if (entryHandle.kind === 'directory') modDirs.push(entryHandle);
                        }
                    }

                    for (const entryHandle of modDirs) {
                        try {
                            const modIndexHandle = await entryHandle.getFileHandle('index.html', { create: false });
                            const modFile = await modIndexHandle.getFile();
                            const modHtml = await modFile.text();
                            const resMod = quitarSoloEsteLi(modHtml, (hrefActual) => {
                                const hrefDec = decodeURIComponent(hrefActual).trim();
                                const fileActual = hrefDec.split('/').pop() || '';
                                return hrefActual.trim() === item.href.trim() || (fileName !== '' && fileActual === fileName);
                            });
                            if (resMod.eliminado) {
                                const writableMod = await modIndexHandle.createWritable();
                                await writableMod.write(resMod.nuevoHtml);
                                await writableMod.close();
                                modulosActualizados++;
                            }
                        } catch (_) {}
                    }
                } catch (_) {}

                // 3. Eliminar el fichero físico si es una ruta local del proyecto
                let archivoEliminado = false;
                if (!/^https?:\/\//i.test(item.href)) {
                    try {
                        const parts = cleanHref.split('/').filter(Boolean).map(p => decodeURIComponent(p));
                        if (parts.length > 0) {
                            let dirCursor = localProjectHandle;
                            for (let i = 0; i < parts.length - 1; i++) {
                                dirCursor = await dirCursor.getDirectoryHandle(parts[i], { create: false });
                            }
                            await dirCursor.removeEntry(parts[parts.length - 1]);
                            archivoEliminado = true;
                        }
                    } catch (errFile) {
                        console.warn("No se pudo eliminar el archivo físico (puede que ya no exista):", errFile);
                    }
                }

                if (quitadoPrincipal || modulosActualizados > 0 || archivoEliminado) {
                    const detalles = [
                        quitadoPrincipal ? '✓ Quitada entrada de index.html' : null,
                        modulosActualizados > 0 ? `✓ Quitada entrada en ${modulosActualizados} index.html de módulo` : null,
                        archivoEliminado ? `✓ Archivo "${fileName}" borrado del disco` : 'ℹ El archivo físico no existía o era un enlace externo'
                    ].filter(Boolean).join('\n');
                    alert(`Apunte "${item.titulo}" eliminado:\n\n${detalles}`);
                    await cargarApuntesDeIndexHtml();
                } else {
                    alert("No se pudo localizar el bloque HTML exacto en index.html.");
                }
            } catch(err) {
                console.error("Error al eliminar el apunte:", err);
                alert("Error al eliminar el apunte: " + err.message);
            }
        };
    
