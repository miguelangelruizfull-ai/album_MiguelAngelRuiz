# Álbum Miguel — Primera edición

Implementación personal del concepto **Album Digital**, publicada mediante GitHub Pages como archivo cronológico de fotografías y videos.

## Sitio

https://miguelangelruizfull-ai.github.io/album_MiguelAngelRuiz/

## Primera edición — 2026

El primer lanzamiento reconstruye la interfaz anterior y corrige varios problemas técnicos:

- diseño responsive completamente nuevo;
- portada dinámica con el recuerdo más reciente;
- carga automática del árbol multimedia del repositorio;
- fotografías y videos ordenados cronológicamente;
- filtros por tipo y por mes;
- visor/lightbox con navegación anterior/siguiente;
- imágenes con carga diferida;
- videos sin reproducción automática masiva;
- deduplicación exacta mediante SHA de Git;
- corrección de IDs, funciones y etiquetas HTML duplicadas;
- eliminación de dependencias de rutas rotas por mayúsculas/minúsculas;
- reducción de información identificable en la portada pública;
- `noindex` para desalentar indexación del álbum personal en buscadores.

## Flujo para nuevo material

El álbum usa un flujo de incorporación antes de publicar fotos o videos nuevos:

1. **ORIGINALES** — conservar los archivos recibidos sin alterar, renombrar ni reemplazar.
2. **PRESELECCIÓN** — revisar calidad, duplicados, privacidad, contenido y valor del recuerdo.
3. **APROBACIÓN** — únicamente el material aprobado pasa al álbum público.
4. **PUBLICACIÓN** — fotos aprobadas van a `AAAA/FOTOS/` y videos aprobados a `AAAA/VIDEOS/`.

Las carpetas o rutas que contengan los segmentos `_ORIGINALES` o `_PRESELECCION` quedan excluidas del render de la galería pública por `app.js`.

**Importante:** este repositorio es público. Excluir un archivo de la galería no lo vuelve privado si el archivo se sube al repositorio. Por ello, la conservación principal de originales debe hacerse en una ubicación privada (por ejemplo, Drive o un repositorio privado) y el repositorio público debe recibir únicamente el material aprobado.

La especificación completa del flujo está en `FLUJO_MEDIA.md`.

## Duplicados

El repositorio histórico contiene algunos mismos archivos almacenados en más de una ruta, por ejemplo entre:

- `2026/FOTOS/`
- `imagenes/`
- la raíz del repositorio
- `videosDestacados/`

La primera edición **no elimina físicamente esos archivos**. La aplicación consulta el árbol Git y, cuando dos rutas tienen el mismo SHA, muestra una sola copia.

Esta decisión evita borrar recuerdos por error. La limpieza física del repositorio debe hacerse únicamente después de contar con un respaldo y confirmar cada duplicado por SHA.

## Estructura técnica

- `index.html` — interfaz y diseño.
- `app.js` — carga del árbol GitHub, orden cronológico, filtros, deduplicación, exclusión de staging y lightbox.
- `FLUJO_MEDIA.md` — proceso seguro de originales → preselección → aprobación → publicación.
- multimedia existente — permanece en sus rutas históricas durante esta fase.

## Privacidad

Este repositorio y GitHub Pages siguen siendo públicos mientras el repositorio esté configurado como público. `noindex` reduce la indexación por buscadores, pero **no convierte el contenido en privado**.

## Proyecto reutilizable

La versión sanitizada y reutilizable del concepto vive en:

https://github.com/miguelangelruizfull-ai/Album_Digital
