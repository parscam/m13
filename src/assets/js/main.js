(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('is-open', !expanded);
    });

    navAnchors.forEach((anchor) => {
      anchor.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('is-open');
      });
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const sections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window && sections.length) {
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navAnchors.forEach((anchor) => {
          anchor.classList.toggle('active', anchor.getAttribute('href') === `#${id}`);
        });
      });
    }, { rootMargin: '-35% 0px -58% 0px', threshold: 0.01 });

    sections.forEach((section) => activeObserver.observe(section));
  }

  const specSearch = document.getElementById('specSearch');
  const specRows = document.querySelectorAll('#specTable tbody tr');
  if (specSearch && specRows.length) {
    specSearch.addEventListener('input', () => {
      const query = specSearch.value.trim().toLocaleLowerCase('tr-TR');
      specRows.forEach((row) => {
        const text = row.textContent.toLocaleLowerCase('tr-TR');
        row.classList.toggle('is-hidden', query && !text.includes(query));
      });
    });
  }

  const zoomableImages = document.querySelectorAll('.image-panel img, .proof-grid img');
  if (zoomableImages.length) {
    const canUseDialog = typeof HTMLDialogElement !== 'undefined';
    const dialog = document.createElement(canUseDialog ? 'dialog' : 'div');
    dialog.className = 'image-dialog';
    dialog.innerHTML = `
      <button class="image-dialog-close" type="button" aria-label="Görseli kapat">×</button>
      <img alt="">
      <p></p>
    `;
    document.body.appendChild(dialog);

    const dialogImg = dialog.querySelector('img');
    const dialogCaption = dialog.querySelector('p');
    const closeButton = dialog.querySelector('button');

    const closeDialog = () => {
      if (canUseDialog && dialog.open) dialog.close();
      dialog.classList.remove('is-open');
      document.documentElement.classList.remove('has-dialog');
    };

    closeButton.addEventListener('click', closeDialog);
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) closeDialog();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeDialog();
    });

    const openDialog = (image) => {
      dialogImg.src = image.currentSrc || image.src;
      dialogImg.alt = image.alt || 'Büyütülmüş görsel';
      const figure = image.closest('figure');
      dialogCaption.textContent = figure?.querySelector('figcaption')?.textContent || image.alt || '';
      document.documentElement.classList.add('has-dialog');
      if (canUseDialog) dialog.showModal();
      dialog.classList.add('is-open');
    };

    zoomableImages.forEach((image) => {
      image.setAttribute('tabindex', '0');
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', `${image.alt}. Büyütmek için aç.`);
      image.addEventListener('click', () => openDialog(image));
      image.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openDialog(image);
        }
      });
    });
  }
})();
