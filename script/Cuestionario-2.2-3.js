try {
  pdf2htmlEX.defaultViewer = new pdf2htmlEX.Viewer({});
  function fitMobilePdf() {
    if (window.innerWidth <= 960 && pdf2htmlEX.defaultViewer && typeof pdf2htmlEX.defaultViewer.fit_width === "function") {
      try { pdf2htmlEX.defaultViewer.fit_width(); } catch (err) {}
    }
  }
  window.addEventListener("load", function() {
    setTimeout(fitMobilePdf, 120);
    setTimeout(fitMobilePdf, 500);
  });
  window.addEventListener("resize", fitMobilePdf);
} catch (e) {}
