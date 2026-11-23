    /**
     * Gestión de tema claro / oscuro (sincronizable con el visor).
     */
    function applyTheme(t) {
      const isLight = t === "light";
      if (isLight) {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
        document.documentElement.setAttribute("data-theme", "light");
        document.documentElement.dataset.theme = "light";
      } else {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
        document.documentElement.setAttribute("data-theme", "dark");
        document.documentElement.dataset.theme = "dark";
      }
      try { localStorage.setItem("tema_apuntes", isLight ? "light" : "dark"); } catch (e) {}
    }
    window.applyTheme = applyTheme;

    function toggleTheme() {
      const isDark = document.documentElement.classList.contains("dark");
      applyTheme(isDark ? "light" : "dark");
    }
    window.toggleTheme = toggleTheme;

    // Inicializar tema de inmediato
    const savedTheme = localStorage.getItem("tema_apuntes") || "dark";
    applyTheme(savedTheme);

    // Si está embebido en visor.html, ocultar botón de tema interno
    if (window.self !== window.top) {
      document.addEventListener("DOMContentLoaded", () => {
        const btn = document.getElementById("theme-toggle");
        if (btn) btn.style.setProperty("display", "none", "important");
      });
    }
