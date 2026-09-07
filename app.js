const ALBUM = {
  repo: 'miguelangelruizfull-ai/album_MiguelAngelRuiz',
  branch: 'main'
};

const IMAGE_RE = /\.(jpe?g|png|webp|gif)$/i;
const VIDEO_RE = /\.(mp4|webm|mov)$/i;
const monthFormatter = new Intl.DateTimeFormat('es-MX', { month: 'long', year: 'numeric' });
const dateFormatter = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });

let media = [];
let visibleMedia = [];
let currentIndex = 0;
let duplicateCount = 0;

const $ = (id) => document.getElementById(id);

function rawUrl(path) {
  const encodedPath = path.split('/').map(encodeURIComponent).join('/');
  return `https://raw.githubusercontent.com/${ALBUM.repo}/${ALBUM.branch}/${encodedPath}`;
}

function mediaType(path) {
  if (IMAGE_RE.test(path)) return 'image';
  if (VIDEO_RE.test(path)) return 'video';
  return null;
}

function sourcePriority(item) {
  const p = item.path.toLowerCase();
  if (item.type === 'video' && p.startsWith('videosdestacados/')) return 0;
  if (p.startsWith('imagenes/')) return 1;
  if (p.startsWith('2026/fotos/')) return 2;
  if (!p.includes('/')) return 3;
  return 4;
}

function parseDate(path) {
  const name = path.split('/').pop();
  const match = name.match(/(20\d{2})(\d{2})(\d{2})(?:[_-]?(\d{2})(\d{2})(\d{2}))?/);
  if (!match) return null;
  const [, y, m, d, hh = '12', mm = '00', ss = '00'] = match;
  const date = new Date(`${y}-${m}-${d}T${hh}:${mm}:${ss}`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function normalizeTree(tree) {
  const candidates = tree
    .filter(item => item.type === 'blob' && mediaType(item.path))
    .map(item => ({
      path: item.path,
      sha: item.sha,
      size: item.size || 0,
      type: mediaType(item.path),
      date: parseDate(item.path)
    }))
    .sort((a, b) => sourcePriority(a) - sourcePriority(b));

  const unique = new Map();
  for (const item of candidates) {
    if (!unique.has(item.sha)) unique.set(item.sha, item);
  }

  duplicateCount = candidates.length - unique.size;

  return [...unique.values()]
    .map(item => ({ ...item, url: rawUrl(item.path) }))
    .sort((a, b) => {
      const da = a.date ? a.date.getTime() : 0;
      const db = b.date ? b.date.getTime() : 0;
      return db - da || a.path.localeCompare(b.path);
    });
}

async function loadTree() {
  const url = `https://api.github.com/repos/${ALBUM.repo}/git/trees/${ALBUM.branch}?recursive=1`;
  const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
  if (!response.ok) throw new Error(`GitHub API ${response.status}`);
  const data = await response.json();
  return data.tree || [];
}

function setStats() {
  const photos = media.filter(item => item.type === 'image').length;
  const videos = media.filter(item => item.type === 'video').length;
  $('photoCount').textContent = photos.toLocaleString('es-MX');
  $('videoCount').textContent = videos.toLocaleString('es-MX');
  $('duplicateCount').textContent = duplicateCount.toLocaleString('es-MX');
}

function setHero() {
  const latestImage = media.find(item => item.type === 'image');
  if (!latestImage) return;
  $('hero').style.setProperty('--hero-image', `url("${latestImage.url}")`);
  $('hero').classList.add('has-image');
}

function buildMonthFilter() {
  const months = [...new Set(media
    .filter(item => item.date)
    .map(item => `${item.date.getFullYear()}-${String(item.date.getMonth() + 1).padStart(2, '0')}`))];

  $('monthFilter').innerHTML = '<option value="all">Todos los meses</option>';
  months.forEach(key => {
    const [year, month] = key.split('-').map(Number);
    const option = document.createElement('option');
    option.value = key;
    option.textContent = monthFormatter.format(new Date(year, month - 1, 1));
    $('monthFilter').appendChild(option);
  });
}

function formatDate(item) {
  return item.date ? dateFormatter.format(item.date) : 'Fecha no disponible';
}

function matchesFilters(item) {
  const type = document.querySelector('.filter-chip.active')?.dataset.type || 'all';
  const month = $('monthFilter').value;
  const typeOk = type === 'all' || item.type === type;
  const monthKey = item.date ? `${item.date.getFullYear()}-${String(item.date.getMonth() + 1).padStart(2, '0')}` : 'unknown';
  const monthOk = month === 'all' || month === monthKey;
  return typeOk && monthOk;
}

function renderGallery() {
  visibleMedia = media.filter(matchesFilters);
  const gallery = $('gallery');
  gallery.innerHTML = '';
  $('visibleCount').textContent = visibleMedia.length.toLocaleString('es-MX');

  if (!visibleMedia.length) {
    gallery.innerHTML = '<div class="empty-state">No hay archivos para este filtro.</div>';
    return;
  }

  visibleMedia.forEach((item, index) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = `media-card ${item.type}`;
    card.setAttribute('aria-label', `${item.type === 'image' ? 'Abrir fotografía' : 'Abrir video'} del ${formatDate(item)}`);

    if (item.type === 'image') {
      const img = document.createElement('img');
      img.src = item.url;
      img.alt = `Recuerdo del ${formatDate(item)}`;
      img.loading = 'lazy';
      img.decoding = 'async';
      card.appendChild(img);
    } else {
      const video = document.createElement('video');
      video.src = item.url;
      video.preload = 'metadata';
      video.muted = true;
      video.playsInline = true;
      card.appendChild(video);
      const play = document.createElement('span');
      play.className = 'play-badge';
      play.textContent = '▶';
      card.appendChild(play);
    }

    const meta = document.createElement('span');
    meta.className = 'media-meta';
    meta.innerHTML = `<strong>${item.type === 'image' ? 'Foto' : 'Video'}</strong><small>${formatDate(item)}</small>`;
    card.appendChild(meta);
    card.addEventListener('click', () => openLightbox(index));
    gallery.appendChild(card);
  });
}

function openLightbox(index) {
  if (!visibleMedia.length) return;
  currentIndex = (index + visibleMedia.length) % visibleMedia.length;
  const item = visibleMedia[currentIndex];
  const stage = $('lightboxStage');
  stage.innerHTML = '';

  if (item.type === 'image') {
    const img = document.createElement('img');
    img.src = item.url;
    img.alt = `Recuerdo del ${formatDate(item)}`;
    stage.appendChild(img);
  } else {
    const video = document.createElement('video');
    video.src = item.url;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    stage.appendChild(video);
  }

  $('lightboxDate').textContent = formatDate(item);
  $('lightboxPosition').textContent = `${currentIndex + 1} / ${visibleMedia.length}`;
  $('lightbox').classList.add('open');
  document.body.classList.add('modal-open');
}

function closeLightbox() {
  $('lightbox').classList.remove('open');
  $('lightboxStage').innerHTML = '';
  document.body.classList.remove('modal-open');
}

function moveLightbox(delta) {
  openLightbox(currentIndex + delta);
}

function bindControls() {
  document.querySelectorAll('.filter-chip').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      renderGallery();
    });
  });

  $('monthFilter').addEventListener('change', renderGallery);
  $('closeLightbox').addEventListener('click', closeLightbox);
  $('prevMedia').addEventListener('click', () => moveLightbox(-1));
  $('nextMedia').addEventListener('click', () => moveLightbox(1));
  $('lightbox').addEventListener('click', event => {
    if (event.target === $('lightbox')) closeLightbox();
  });

  document.addEventListener('keydown', event => {
    if (!$('lightbox').classList.contains('open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') moveLightbox(-1);
    if (event.key === 'ArrowRight') moveLightbox(1);
  });
}

async function initAlbum() {
  bindControls();
  try {
    const tree = await loadTree();
    media = normalizeTree(tree);
    setStats();
    setHero();
    buildMonthFilter();
    renderGallery();
    $('loadingState').hidden = true;
    $('albumContent').hidden = false;
  } catch (error) {
    console.error(error);
    $('loadingState').innerHTML = '<strong>No fue posible cargar el álbum.</strong><br>Actualiza la página en unos minutos.';
  }
}

initAlbum();
