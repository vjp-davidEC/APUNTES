        const params = new URLSearchParams(window.location.search);
        const fileUrl = params.get('file');
        const statusEl = document.getElementById('status');
        const container = document.getElementById('pdfContainer');
        const fallbackFrame = document.getElementById('fallbackFrame');
        const downloadBtn = document.getElementById('downloadBtn');
        const fileTitle = document.getElementById('fileTitle');

        document.getElementById('backBtn').addEventListener('click', () => {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = './index.html';
            }
        });

        function showFallback(url) {
            statusEl.innerHTML = `Si tu navegador no muestra el PDF automáticamente, pulsa en <a href="${url}" style="color:#38bdf8;">abrir/descargar PDF</a>.`;
            fallbackFrame.src = url;
            fallbackFrame.style.display = 'block';
        }

        if (!fileUrl) {
            statusEl.textContent = 'No se ha especificado ningún archivo PDF.';
        } else {
            const fileName = decodeURIComponent(fileUrl.split('/').pop());
            fileTitle.textContent = fileName;
            document.title = fileName + ' · Apuntes 2º DAM';
            downloadBtn.href = fileUrl;

            if (window.pdfjsLib && window.location.protocol !== 'file:') {
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
    
