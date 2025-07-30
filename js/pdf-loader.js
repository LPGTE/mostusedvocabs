// pdf-loader.js

function loadPDF(pdfFileName, containerId = 'pdf-viewer') {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Conteneur #${containerId} introuvable.`);
    return;
  }

  const url = `pdfs/${pdfFileName}`;

  const loadingTask = pdfjsLib.getDocument(url);
  loadingTask.promise.then(function (pdf) {
    container.innerHTML = ''; // Clear existing content

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      pdf.getPage(pageNumber).then(function (page) {
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
        const context = canvas.getContext('2d');

        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        page.render(renderContext);
      });
    }
  }).catch(function (error) {
    container.innerHTML = `<p style="color:red;">Erreur de chargement du PDF : ${error.message}</p>`;
  });
}

