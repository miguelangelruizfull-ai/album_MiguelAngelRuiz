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
- `app.js` — carga del árbol GitHub, orden cronológico, filtros, deduplicación y lightbox.
- multimedia existente — permanece en sus rutas históricas durante esta fase.

## Privacidad

Este repositorio y GitHub Pages siguen siendo públicos mientras el repositorio esté configurado como público. `noindex` reduce la indexación por buscadores, pero **no convierte el contenido en privado**.

## Proyecto reutilizable

La versión sanitizada y reutilizable del concepto vive en:

https://github.com/miguelangelruizfull-ai/Album_Digital
