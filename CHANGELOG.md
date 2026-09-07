# CHANGELOG

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
