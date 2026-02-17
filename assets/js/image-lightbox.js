// Ampliador de imágenes para posts usando PhotoSwipe
// Hace que todas las imágenes en los posts sean clicables y se abran en un lightbox

(function() {
  'use strict';

  // Esperar a que PhotoSwipe esté disponible
  function waitForPhotoSwipe(callback, maxAttempts = 50) {
    let attempts = 0;
    const checkPhotoSwipe = function() {
      attempts++;
      if (typeof PhotoSwipe !== 'undefined' || typeof window.PhotoSwipe !== 'undefined') {
        callback();
      } else if (attempts < maxAttempts) {
        setTimeout(checkPhotoSwipe, 100);
      } else {
        console.warn('PhotoSwipe no está disponible después de varios intentos.');
      }
    };
    checkPhotoSwipe();
  }

  function initImageLightbox() {
    const PhotoSwipeLib = window.PhotoSwipe || PhotoSwipe;

    // Seleccionar todas las imágenes en el contenido de los artículos
    // Excluir imágenes que ya están en galerías PhotoSwipe
    const articleImages = document.querySelectorAll('.article-content img:not(.pswp__img), .article-entry img:not(.pswp__img), article img:not(.pswp__img)');
    
    if (articleImages.length === 0) {
      return;
    }

    // Preparar los datos para PhotoSwipe
    const items = [];

    articleImages.forEach((img, index) => {
      // Obtener la URL de la imagen
      let imgSrc = img.src;
      
      // Si tiene srcset, usar la imagen más grande
      if (img.srcset) {
        const srcsetParts = img.srcset.split(',');
        if (srcsetParts.length > 0) {
          const largest = srcsetParts[srcsetParts.length - 1].trim().split(' ')[0];
          imgSrc = largest;
        }
      }

      // Obtener el ancho y alto
      const width = img.naturalWidth || img.width || 1920;
      const height = img.naturalHeight || img.height || 1080;

      items.push({
        src: imgSrc,
        w: width,
        h: height,
        title: img.alt || img.title || ''
      });

      // Hacer la imagen clicable
      img.style.cursor = 'pointer';
      img.setAttribute('data-pswp-index', index);
      
      // Evitar múltiples listeners
      if (!img.hasAttribute('data-lightbox-initialized')) {
        img.setAttribute('data-lightbox-initialized', 'true');
        img.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          openLightbox(index);
        });
      }
    });

    // Función para abrir el lightbox
    function openLightbox(index) {
      const options = {
        dataSource: items,
        index: index,
        bgOpacity: 0.9,
        showHideAnimationType: 'zoom',
        zoomAnimationDuration: 366,
        spacing: 0.1,
        loop: true,
        pinchToClose: true,
        closeOnVerticalDrag: true,
        escKey: true,
        arrowKeys: true,
        returnFocus: true,
        preload: [1, 3]
      };

      const gallery = new PhotoSwipeLib(options);
      
      // Añadir botón de descarga personalizado
      gallery.on('uiRegister', function() {
        gallery.ui.registerElement({
          name: 'download-button',
          order: 9,
          isButton: true,
          html: {
            isCustomSVG: true,
            inner: '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1-1.5-1.6zm-5.2-1.6L12 19.5l-3.3-6.8 1.4-.7 1.8 3.7 1.8-3.7 1.4.7z"/>',
            outlineID: 'pswp__icn-download'
          },
          onInit: (el, pswp) => {
            el.setAttribute('title', 'Descargar imagen');
            el.onclick = () => {
              const item = pswp.currItem;
              const link = document.createElement('a');
              link.href = item.src;
              link.download = item.title || 'imagen';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            };
          }
        });
      });
      
      gallery.init();
    }
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      waitForPhotoSwipe(initImageLightbox);
    });
  } else {
    waitForPhotoSwipe(initImageLightbox);
  }
})();
