/* ==========================================================================
   ut-theme.js — Botón flotante abajo a la izquierda (solo icono) para
   alternar entre Modo Oscuro y Modo Claro en las Unidades Temáticas.
   ========================================================================== */
(function () {
  "use strict";
  const STORAGE_KEY = "tema_apuntes";

  const SVG_SUN = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const SVG_MOON = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

  function getSavedTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) || localStorage.getItem("teoriaKotlin.theme") || "dark";
    } catch (e) {
      return "dark";
    }
  }

  function applyTheme(theme) {
    const isLight = theme === "light";
    const root = document.documentElement;
    if (isLight) {
      root.setAttribute("data-theme", "light");
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.setAttribute("data-theme", "dark");
      root.classList.add("dark");
      root.classList.remove("light");
    }
    const btn = document.getElementById("ut-floating-theme-btn");
    if (btn) {
      btn.innerHTML = isLight ? SVG_MOON : SVG_SUN;
      btn.title = isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro";
      btn.setAttribute("aria-label", btn.title);
    }
    try {
      localStorage.setItem(STORAGE_KEY, isLight ? "light" : "dark");
      localStorage.setItem("teoriaKotlin.theme", isLight ? "light" : "dark");
      localStorage.setItem("psp-theme", isLight ? "light" : "dark");
    } catch (e) {}
  }

  function toggleTheme() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    applyTheme(isLight ? "dark" : "light");
  }

  // Aplicar tema de inmediato para evitar parpadeo
  applyTheme(getSavedTheme());

  function mountButton() {
    if (window.self !== window.top) {
      // Si estamos dentro de un iframe (visor.html), no montar botón duplicado
      return;
    }
    let btn = document.getElementById("ut-floating-theme-btn");
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "ut-floating-theme-btn";
      btn.type = "button";
      btn.className = "ut-floating-theme-btn";
      document.body.appendChild(btn);
    }
    btn.onclick = toggleTheme;
    applyTheme(getSavedTheme());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountButton);
  } else {
    mountButton();
  }

  window.toggleTheme = toggleTheme;
  window.applyTheme = applyTheme;
})();
