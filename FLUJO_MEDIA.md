# Flujo de incorporación de fotos y videos

Objetivo: agregar nuevo material al álbum sin perder originales y evitando publicaciones accidentales.

## 1. Originales

- Conservar cada archivo exactamente como fue recibido.
- No editar, recomprimir, sobrescribir ni sustituir el original.
- Mantener una copia privada fuera del repositorio público, preferentemente en Google Drive o en un repositorio privado.
- Registrar la fecha o sesión de ingreso cuando sea útil.

## 2. Preselección

Antes de publicar, revisar cada foto y video considerando:

- nitidez y calidad técnica;
- duplicados o tomas casi idénticas;
- contenido privado o identificable;
- valor del recuerdo;
- orientación y encuadre;
- duración y utilidad de videos;
- fecha correcta cuando pueda determinarse.

La preselección NO equivale a publicación.

## 3. Aprobación

Solo los archivos aprobados pasan al álbum público.

No borrar los originales rechazados únicamente porque no se publiquen. El descarte de publicación y la conservación del original son decisiones independientes.

## 4. Publicación canónica

Usar por año:

- `AAAA/FOTOS/` para fotografías aprobadas.
- `AAAA/VIDEOS/` para videos aprobados.

Mantener el nombre original cuando ya contiene una fecha útil. Si es necesario renombrar una copia publicada, nunca renombrar ni sustituir el original conservado.

## 5. Rutas de trabajo excluidas del sitio

`app.js` ignora cualquier medio cuya ruta contenga uno de estos segmentos:

- `_ORIGINALES`
- `_PRESELECCION`

Esto evita que material de trabajo aparezca en la galería.

Advertencia: el repositorio es público. Un archivo colocado en `_ORIGINALES` o `_PRESELECCION` seguiría siendo accesible desde GitHub aunque no aparezca en GitHub Pages. Estas rutas son un seguro contra publicación accidental, no un mecanismo de privacidad.

## Flujo operativo recomendado

`ORIGINAL PRIVADO → PRESELECCIÓN → APROBACIÓN → COPIA PUBLICABLE → AAAA/FOTOS o AAAA/VIDEOS → VERIFICACIÓN EN GITHUB PAGES`

## Reglas de seguridad

- No eliminar originales durante una incorporación normal.
- No publicar automáticamente toda una carga.
- No considerar un archivo publicado hasta verificarlo en el sitio.
- No borrar duplicados históricos sin respaldo y comprobación por SHA.
- No mover material privado al repositorio público solo para poder preseleccionarlo.
