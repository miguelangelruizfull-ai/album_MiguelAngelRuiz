# CHANGELOG

## 1.0.1 — Flujo de incorporación segura · 2026-09-13

### Nuevo flujo de medios
- Se definió el proceso `ORIGINAL PRIVADO → PRESELECCIÓN → APROBACIÓN → PUBLICACIÓN`.
- Se añadió `FLUJO_MEDIA.md` con reglas para conservar originales y revisar material antes de publicarlo.
- Se preparó `2026/VIDEOS/` como ruta canónica para videos aprobados.

### Protección contra publicación accidental
- `app.js` excluye de la galería cualquier medio ubicado en rutas que contengan `_ORIGINALES` o `_PRESELECCION`.
- Estas rutas funcionan únicamente como protección de render; no convierten los archivos en privados dentro de un repositorio público.
- Se documentó que los originales deben conservarse preferentemente en una ubicación privada y que el repositorio público debe recibir solo material aprobado.

## 1.0.0 — Primera edición · 2026-09-06

Primer lanzamiento formal de `album_MiguelAngelRuiz`.

### Nuevo diseño
- Portada editorial responsive.
- Dedicatoria simplificada para reducir exposición de datos personales.
- Galería adaptable a móvil y escritorio.
- Estadísticas de fotos, videos y duplicados omitidos.
- Filtros por tipo de medio y mes.
- Lightbox con navegación por teclado y botones.

### Carga y rendimiento
- Una sola consulta al árbol GitHub del repositorio.
- Descubrimiento automático de fotos y videos sin depender de una carpeta rígida.
- Orden cronológico desde los nombres de archivo.
- `loading="lazy"` para imágenes.
- Videos con `preload="metadata"`, sin autoplay masivo.

### Duplicados
- Deduplicación exacta por SHA antes del render.
- Se priorizan rutas semánticas sin eliminar archivos históricos.
- La limpieza física queda pendiente de respaldo y verificación.

### Correcciones
- Eliminados IDs HTML duplicados.
- Eliminadas funciones JavaScript repetidas.
- Corregida la dependencia de `VideosDestacados`/`videosDestacados`.
- Eliminadas etiquetas inválidas y cierres HTML duplicados.
- `app.js` deja de contener cercas Markdown y vuelve a ser JavaScript ejecutable.

### Privacidad
- Se retiró el nombre completo del menor de la portada.
- Se añadió `noindex,nofollow,noarchive` al sitio personal.
- Se documentó que `noindex` no convierte un repositorio público en privado.
