  (function () {
    "use strict";
    const $ = (s, el = document) => el.querySelector(s);
    const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const TEMAS = window.TEMAS || [];

    const SVG = {
      kotlin: `<svg class="ic-svg" viewBox="0 0 24 24"><defs><linearGradient id="kt-g2" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="#7F52FF"/><stop offset="50%" stop-color="#C711E1"/><stop offset="100%" stop-color="#F88909"/></linearGradient></defs><polygon fill="url(#kt-g2)" points="2,2 22,2 12,12 22,22 2,22"/></svg>`,
      android: `<svg class="ic-svg" viewBox="0 0 24 24"><path fill="#3DDC84" d="M17.6 11.48 L19.44 8.3 a0.63 0.63 0 0 0 -1.09 -0.63 l-1.88 3.24 a11.43 11.43 0 0 0 -8.94 0 L5.65 7.67 a0.63 0.63 0 0 0 -1.09 0.63 L6.4 11.48 A10.81 10.81 0 0 0 1 20 h22 A10.81 10.81 0 0 0 17.6 11.48 Z M7 17.25 A1.25 1.25 0 1 1 8.25 16 A1.25 1.25 0 0 1 7 17.25 Z M17 17.25 A1.25 1.25 0 1 1 18.25 16 A1.25 1.25 0 0 1 17 17.25 Z"/></svg>`,
      compose: `<svg class="ic-svg" viewBox="0 0 24 24"><path fill="#4285F4" d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z" opacity="0.24"/><path fill="none" stroke="#4285F4" stroke-width="1.8" d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z"/><path fill="#3DDC84" d="M12 6.2L17 9.1V14.9L12 17.8L7 14.9V9.1L12 6.2Z"/><circle cx="12" cy="12" r="2.3" fill="#073042"/></svg>`
    };

    /* ---------------- Tema Claro / Oscuro ---------------- */
    const THEME_KEY = "teoriaKotlin.theme";
    function applyTheme(t) {
      document.documentElement.dataset.theme = t;
      document.documentElement.setAttribute('data-theme', t);
      if (t === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
      const btnTema = $("#btn-tema");
      if (btnTema) {
        btnTema.innerHTML = t === "dark" ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>` : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
      }
      try { localStorage.setItem("tema_apuntes", t); } catch (e) {}
    }
    window.applyTheme = applyTheme;
    applyTheme(localStorage.getItem("tema_apuntes") || localStorage.getItem(THEME_KEY) || "dark");
    const btnTemaEl = $("#btn-tema");
    if (btnTemaEl) {
      if (window.self !== window.top) {
        btnTemaEl.style.setProperty("display", "none", "important");
      }
      btnTemaEl.addEventListener("click", () => {
        const t = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        localStorage.setItem(THEME_KEY, t);
        applyTheme(t);
      });
    }

    /* ---------------- Progreso de lectura y botón arriba ---------------- */
    window.addEventListener("scroll", () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop || document.body.scrollTop;
      const max = (h.scrollHeight - h.clientHeight) || 1;
      $("#progress-bar").style.width = Math.min(100, (scrolled / max) * 100) + "%";
      $("#btn-top").classList.toggle("show", scrolled > 380);
    }, { passive: true });
    $("#btn-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    /* ---------------- Sidebar ---------------- */
    function renderSidebar(route) {
      let h = `
        <a class="nav-home ${route.view === "inicio" ? "active" : ""}" href="#/inicio">
          ${SVG.kotlin}<span>Portada e Índice General</span>
        </a>
        <a class="nav-home ${route.view === "todo" ? "active" : ""}" href="#/todo">
          ${SVG.android}<span>Toda la Teoría Continua</span>
        </a>
        <div class="nav-divider"><span>Temario Oficial (3 – 8)</span><span>${TEMAS.length} temas</span></div>
      `;

      TEMAS.forEach((t) => {
        const cur = route.tema === t.id || route.view === "todo";
        const ic = SVG[t.icon] || SVG.kotlin;
        h += `<div class="nav-tema ${cur ? "open" : ""} ${route.tema === t.id ? "current" : ""}" data-tema="${t.id}" data-tech="${t.tech}">
          <button type="button">
            <span class="t-icon-box">${ic}<span class="t-num">${t.numero}</span></span>
            <span class="t-title">Tema ${t.numero}: ${esc(t.titulo)}</span>
            <span class="chev"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-2px"><polyline points="9 18 15 12 9 6"></polyline></svg></span>
          </button>
          <ul>
            ${t.secciones.map((s) => `
              <li>
                <a href="#/${t.id}/${s.id}" class="${route.sec === s.id ? "active" : ""}">
                  <span>${esc(s.titulo)}</span>
                </a>
              </li>`).join("")}
          </ul>
        </div>`;
      });

      const sb = $("#sidebar");
      sb.innerHTML = h;
      $$(".nav-tema > button", sb).forEach((b) =>
        b.addEventListener("click", () => b.parentElement.classList.toggle("open"))
      );
      const act = $("a.active", sb);
      if (act && act.scrollIntoView) act.scrollIntoView({ block: "nearest" });
    }

    /* ---------------- Vista Inicio ---------------- */
    function viewInicio() {
      const totalSecs = TEMAS.reduce((a, t) => a + t.secciones.length, 0);
      const totalCodes = TEMAS.reduce((a, t) => a + t.secciones.reduce((b, s) => b + s.codes, 0), 0);
      const totalTables = TEMAS.reduce((a, t) => a + t.secciones.reduce((b, s) => b + s.tables, 0), 0);

      return `
        <section class="hero-banner">
          <div class="hero-grid">
            <div>
              <div class="hero-pills">
                <span class="tech-pill">${SVG.kotlin}<span>Kotlin 2.0</span></span>
                <span class="tech-pill">${SVG.android}<span>Android SDK</span></span>
                <span class="tech-pill">${SVG.compose}<span>Jetpack Compose & Material 3</span></span>
              </div>
              <h1>Manual de Teoría <span class="grad-text">Kotlin</span> & <span class="grad-and-text">Android</span></h1>
              <p>Toda la teoría oficial de la carpeta <strong>ApuntesKotlin</strong> (Temas 3 al 8): sintaxis del lenguaje Kotlin, Logcat, arquitectura de una App Android, ciclo de vida de una Activity, diseño declarativo con Jetpack Compose, Material Design 3, componentes, estados, listas Lazy, navegación con Navigation Compose e Intents implícitos.</p>
              <div class="hero-actions">
                <a class="btn primary" href="#/${TEMAS[0].id}/${TEMAS[0].secciones[0].id}">
                  ${SVG.kotlin}<span>Empezar por el Tema 3</span>
                </a>
                <a class="btn and-pill" href="#/todo">
                  ${SVG.android}<span>Leer los 6 Temas Seguidos</span>
                </a>
              </div>
            </div>
            <div class="hero-art">
              <div class="hero-emblem kt-emblem" title="Kotlin">${SVG.kotlin}</div>
              <div class="hero-emblem and-emblem" title="Android">${SVG.android}</div>
            </div>
          </div>
        </section>

        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-ic">${SVG.kotlin}</div>
            <div class="stat-info"><strong>${TEMAS.length} Temas</strong><span>Temas 3, 4, 5, 6, 7 y 8</span></div>
          </div>
          <div class="stat-card">
            <div class="stat-ic">${SVG.android}</div>
            <div class="stat-info"><strong>${totalSecs} Apartados</strong><span>100% Teoría estructurada</span></div>
          </div>
          <div class="stat-card">
            <div class="stat-ic">${SVG.compose}</div>
            <div class="stat-info"><strong>${totalCodes} Ejemplos</strong><span>Snippets listos para copiar</span></div>
          </div>
          <div class="stat-card">
            <div class="stat-ic">${SVG.kotlin}</div>
            <div class="stat-info"><strong>${totalTables} Tablas</strong><span>Resúmenes y parámetros</span></div>
          </div>
        </div>

        <div class="section-heading">
          <h2>${SVG.kotlin}<span>Índice Completo de Temas y Apartados</span></h2>
        </div>

        <div class="temas-grid">
          ${TEMAS.map((t) => {
            const ic = SVG[t.icon] || SVG.kotlin;
            const codes = t.secciones.reduce((a, s) => a + s.codes, 0);
            return `
              <article class="tema-card" data-tech="${t.tech}">
                <div>
                  <div class="tc-top">
                    <span class="tc-badge">${ic}<span>${esc(t.badge)}</span></span>
                    <span class="tc-num">TEMA 0${t.numero}</span>
                  </div>
                  <h3><a href="#/${t.id}/${t.secciones[0].id}">${esc(t.titulo)}</a></h3>
                  <p>${esc(t.resumen)}</p>
                  <ul class="tc-secs">
                    ${t.secciones.map((s) => `
                      <li>
                        <a href="#/${t.id}/${s.id}">
                          <span class="dot"></span>
                          <span>${esc(s.titulo)}</span>
                        </a>
                      </li>`).join("")}
                  </ul>
                </div>
                <div class="tc-foot">
                  <span>${t.secciones.length} apartados teóricos</span>
                  <span>${codes} bloques de código</span>
                </div>
              </article>
            `;
          }).join("")}
        </div>
      `;
    }

    /* ---------------- Vista Sección Individual ---------------- */
    function viewSeccion(tema, sec) {
      const all = TEMAS.flatMap((t) => t.secciones.map((s) => ({ t, s })));
      const idx = all.findIndex((x) => x.s.id === sec.id);
      const prev = all[idx - 1], next = all[idx + 1];
      const ic = SVG[tema.icon] || SVG.kotlin;

      const subToc = sec.subs && sec.subs.length
        ? `<div class="sub-toc">
            <span class="sub-toc-label">En este apartado:</span>
            ${sec.subs.map((sub) => `<a class="sub-chip" href="javascript:void(0)" data-scroll="${esc(sub.id)}">${esc(sub.titulo)}</a>`).join("")}
           </div>`
        : "";

      return `
        <header class="sec-header" data-tech="${tema.tech}">
          <nav class="crumbs">
            <a href="#/inicio">Inicio</a>
            <span>›</span>
            <a href="#/${tema.id}/${tema.secciones[0].id}">Tema ${tema.numero} · ${esc(tema.titulo)}</a>
          </nav>
          <div class="sec-title-row">
            <h1>${esc(sec.titulo)}</h1>
            <span class="tech-pill">${ic}<span>Tema ${tema.numero} · ${esc(tema.badge)}</span></span>
          </div>
          ${subToc}
        </header>

        <article class="section-card">
          <div class="section-body">${sec.html}</div>
        </article>

        <nav class="pager">
          ${prev ? `<a class="prev" href="#/${prev.t.id}/${prev.s.id}"><small><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-2px"><polyline points="15 18 9 12 15 6"></polyline></svg> Apartado anterior (Tema ${prev.t.numero})</small><strong>${esc(prev.s.titulo)}</strong></a>` : "<span></span>"}
          ${next ? `<a class="next" href="#/${next.t.id}/${next.s.id}"><small>Siguiente apartado (Tema ${next.t.numero}) <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-2px"><polyline points="9 18 15 12 9 6"></polyline></svg></small><strong>${esc(next.s.titulo)}</strong></a>` : ""}
        </nav>
      `;
    }

    /* ---------------- Vista Todo Continuo ---------------- */
    function viewTodo() {
      let out = `
        <header class="sec-header">
          <nav class="crumbs"><a href="#/inicio">Inicio</a><span>›</span><span>Modo Lectura Completa</span></nav>
          <div class="sec-title-row">
            <h1>Toda la Teoría de Kotlin y Android (Temas 3 al 8)</h1>
            <div style="display:flex;gap:.5rem">
              <span class="tech-pill">${SVG.kotlin}<span>Kotlin</span></span>
              <span class="tech-pill">${SVG.android}<span>Android</span></span>
            </div>
          </div>
        </header>
      `;

      TEMAS.forEach((t) => {
        const ic = SVG[t.icon] || SVG.kotlin;
        out += `
          <div class="tema-banner" id="${t.id}">
            <div class="tb-icon">${ic}</div>
            <div class="tb-info">
              <span>TEMA ${t.numero} · ${esc(t.badge)}</span>
              <h2>${esc(t.titulo)}</h2>
              <p>${esc(t.resumen)}</p>
            </div>
          </div>
        `;
        t.secciones.forEach((s) => {
          out += `
            <article class="section-card" id="${s.id}">
              <div class="crumbs" style="margin-bottom:.35rem"><span>Tema ${t.numero}</span><span>›</span><span>${esc(t.titulo)}</span></div>
              <h2 style="margin:0 0 1.2rem;font-size:1.5rem">${esc(s.titulo)}</h2>
              <div class="section-body">${s.html}</div>
            </article>
          `;
        });
      });
      return out;
    }

    /* ---------------- Router ---------------- */
    function parseRoute() {
      const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
      if (!parts.length || parts[0] === "inicio") return { view: "inicio" };
      if (parts[0] === "todo") return { view: "todo" };
      return { view: "seccion", tema: parts[0], sec: parts[1] };
    }

    function render() {
      const route = parseRoute();
      const main = $("#contenido");
      let html = "";
      if (route.view === "todo") {
        html = viewTodo();
      } else if (route.view === "seccion") {
        const tema = TEMAS.find((t) => t.id === route.tema) || TEMAS[0];
        const sec = tema.secciones.find((s) => s.id === route.sec) || tema.secciones[0];
        route.tema = tema.id;
        route.sec = sec.id;
        html = viewSeccion(tema, sec);
      } else {
        html = viewInicio();
      }
      renderSidebar(route);
      main.innerHTML = html;
      window.scrollTo(0, 0);
      $("#sidebar").classList.remove("open");
      $("#overlay").classList.remove("show");
    }

    window.addEventListener("hashchange", render);

    /* ---------------- Eventos delegados (Copiar, Tabs, Scroll a H3) ---------------- */
    document.addEventListener("click", (e) => {
      const scrollBtn = e.target.closest("[data-scroll]");
      if (scrollBtn) {
        const target = document.getElementById(scrollBtn.dataset.scroll);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      const copy = e.target.closest(".copy");
      if (copy) {
        const code = copy.closest(".code").querySelector("pre").innerText;
        const span = copy.querySelector("span");
        const done = () => {
          if (span) span.textContent = "¡Copiado!";
          setTimeout(() => { if (span) span.textContent = "Copiar"; }, 1500);
        };
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(code).then(done, () => fallbackCopy(code, done));
        } else {
          fallbackCopy(code, done);
        }
        return;
      }

      const tab = e.target.closest(".tab");
      if (tab) {
        const box = tab.closest(".tabs");
        $$(":scope > .tab-heads > .tab", box).forEach((b) => b.classList.toggle("active", b === tab));
        $$(":scope > .tab-body", box).forEach((b) => b.classList.toggle("active", b.dataset.i === tab.dataset.i));
      }
    });

    function fallbackCopy(text, done) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); done(); } catch (err) {}
      ta.remove();
    }

    /* ---------------- Menú móvil y buscador móvil ---------------- */
    $("#btn-menu").addEventListener("click", () => {
      $("#sidebar").classList.toggle("open");
      $("#overlay").classList.toggle("show");
    });
    $("#overlay").addEventListener("click", () => {
      $("#sidebar").classList.remove("open");
      $("#overlay").classList.remove("show");
    });

    const cajaBuscar = $("#caja-buscar");
    const btnBuscarMovil = $("#btn-buscar-movil");
    const btnCerrarBuscar = $("#cerrar-buscar");
    function toggleMobileSearch(open) {
      if (!cajaBuscar) return;
      cajaBuscar.classList.toggle("open", open);
      if (open) {
        input.focus();
        input.select();
      } else {
        input.value = "";
        box.hidden = true;
        input.blur();
      }
    }
    if (btnBuscarMovil) btnBuscarMovil.addEventListener("click", () => toggleMobileSearch(!cajaBuscar.classList.contains("open")));
    if (btnCerrarBuscar) btnCerrarBuscar.addEventListener("click", () => toggleMobileSearch(false));

    /* ---------------- Buscador instantáneo ---------------- */
    let index = null;
    function buildIndex() {
      const tmp = document.createElement("div");
      index = [];
      TEMAS.forEach((t) => t.secciones.forEach((s) => {
        tmp.innerHTML = s.html;
        index.push({ t, s, text: (s.titulo + " " + tmp.textContent).replace(/\s+/g, " ") });
      }));
    }
    const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const input = $("#buscador"), box = $("#resultados");

    input.addEventListener("input", () => {
      const q = input.value.trim();
      if (q.length < 2) { box.hidden = true; return; }
      if (!index) buildIndex();
      const nq = norm(q);
      const res = index.filter((x) => norm(x.text).includes(nq)).slice(0, 20);
      box.innerHTML = res.length ? res.map((x, i) => {
        const pos = norm(x.text).indexOf(nq);
        const frag = x.text.slice(Math.max(0, pos - 38), pos + q.length + 62);
        const fpos = norm(frag).indexOf(nq);
        const snip = esc(frag.slice(0, fpos)) + "<mark>" + esc(frag.slice(fpos, fpos + q.length)) + "</mark>" + esc(frag.slice(fpos + q.length));
        const ic = SVG[x.t.icon] || SVG.kotlin;
        return `<a href="#/${x.t.id}/${x.s.id}" class="${i === 0 ? "sel" : ""}">
          <div class="sr-head">${ic}<span>${esc(x.s.titulo)}</span></div>
          <small>Tema ${x.t.numero} (${esc(x.t.titulo)}) · …${snip}…</small>
        </a>`;
      }).join("") : `<a href="javascript:void(0)">Sin resultados para «${esc(q)}»</a>`;
      box.hidden = false;
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const a = $("a.sel", box);
        if (a && a.getAttribute("href") && a.getAttribute("href").startsWith("#")) {
          location.hash = a.getAttribute("href");
          box.hidden = true;
          input.blur();
        }
      }
      if (e.key === "Escape") { box.hidden = true; input.blur(); if (cajaBuscar) cajaBuscar.classList.remove("open"); }
    });
    box.addEventListener("click", () => { box.hidden = true; if (cajaBuscar) cajaBuscar.classList.remove("open"); });
    document.addEventListener("click", (e) => { if (!e.target.closest(".search")) box.hidden = true; });
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });

    render();
  })();
  
