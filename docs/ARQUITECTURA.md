# Arquitectura

Aplicación de una sola página, sin compilación ni dependencias de ejecución externas. Todo se sirve como archivos estáticos.

## Archivos
| Archivo | Contenido |
|---|---|
| `index.html` (~470 KB) | App completa: HTML, CSS y JS. Chart.js y las fuentes (Anton, Oswald, en woff2 base64) van incluidos |
| `supabase.js` | `@supabase/supabase-js` 2.117.2 (MIT), copia local, sin CDN |
| `sw.js` | Service worker: red primero con espera máxima de 3 s y caché de respaldo |
| `manifest.webmanifest`, `icons/` | Instalación como app (PWA) |
| `_headers` | Cabeceras de Cloudflare (`nosniff`, `Referrer-Policy`, `sw.js` sin caché) |
| `wrangler.jsonc` | Despliegue estático en Cloudflare, directorio raíz |
| `.assetsignore` | Excluye de la publicación: README, CHANGELOG, configuración, `docs`, `.github` |
| `.github/workflows/keep-supabase-alive.yml` | Ping lunes y jueves a la API de Supabase |
| `docs/` | Documentación (no se publica) |

## `index.html` por dentro
- **`<style>`**: fuentes incrustadas al inicio, variables de tema (claro/oscuro), componentes y, al final, **bloques por versión** con comentario `/* ===== fXX: … ===== */` (f5p ventana «Nuevo animal», f5r, f5s tokens, f5t, f5u). Todo CSS nuevo va en un bloque nuevo al final.
- **`<script>`** (cuatro bloques, en este orden): Chart.js 4.4.1 incluido, `supabase.js` externo, lógica de la app (~120 KB) y, el **último**, el módulo de nube (~12 KB: login, migración, sincronización, indicador de estado).
- **Vista común de listas (`mx*`)**: CSS + JS que leen las tablas originales ya filtradas y ordenadas (quedan ocultas) y pintan filas de dos alturas, fichas, modo «Seleccionar», «Ver tabla», botón flotante + y ventana «Nuevo animal» (`#fa`).
- **Iconos**: un observador global sustituye glifos (✂ ✎ 🗑 📣…) por SVG (`.ic`, sprite `#i-*`). **Regla:** al copiar botones por JS usar `innerHTML`, nunca `textContent` (daría vacío).
- **Tokens de diseño**: ver `docs/ESTILO.md`.

## Datos
- **Local:** `localStorage`, clave `wotH5`, un único JSON con versión de esquema `v` (actualmente 1). Contiene mapa activo, día de juego por mapa, manadas, animales (`S.a`), extracciones (`S.x`), histórico (`S.hist`) y configuración (`S.cfg`).
- **IDs internos:** `ensureIds()` asigna un `id` único a animales y extracciones; las acciones de editar/eliminar deben usar ese ID, no la posición.
- **Claves auxiliares:** `wotH_uid`, `wotH_cv` (versión base), `wotH_dirty`, `wotH_lc` (último contacto), `wotH_auth` (sesión), `wotH_tb`, `wotH_lexp`.
- **Copias:** Exportar/Importar JSON (con validación); `wotH5_pre_nube` (antes de migrar o descargar), `wotH5_nube_previa` (en conflictos), `wotH5_corrupto` (si los datos no se pueden leer); copias automáticas (hasta 10, solo al añadir o borrar animales o manadas).
- **Nube (Supabase):** tabla `datos` (`user_id` PK, `data` jsonb, `version`, `updated_at`), una fila por usuario, seguridad por fila, permisos solo para `authenticated`, tiempo real activado, registros públicos desactivados. La app solo contiene la URL y la clave pública *publishable*.

## Sincronización (F3)
Subida automática 3 s tras guardar; versión por documento; aviso de conflicto con elección entre versión local y de la nube; tiempo real y actualización al volver a la app; aviso a los 5 días sin conectar; sin conexión los cambios se acumulan y se suben al volver.

## Service worker
Red primero con límite de espera de 3 s y caché como respaldo; solo archivos propios (mismo origen); reconstruye respuestas redirigidas (Safari/iOS las rechaza). `CORE` = `./`, `index.html`, `supabase.js`, `manifest.webmanifest`; iconos opcionales. **La versión es el nombre de `CACHE`**; subirlo en cada publicación.

## Capas (z-index) vigentes
`#hp` 20 · `#hl` 25 · `#fo` 30 · `#st` 35 · `#fdo` 37 · `#fd` 38 · `#ts` 40 · `#dg` 50 · `#nbi` 60 · `#sw` 70 · `#lg` 300. Fichas: `.mxsc` 40, `.mxsh` 41, `.mxpop` 60. Botón + 26, menú 27, `#va` 28. No se han colapsado para no alterar el orden entre ventanas.

## Qué NO hacer
- No sustituciones de texto globales dentro de `index.html` (una vez se corrompió la fuente woff2 incrustada). Cada cambio con anclas únicas y comprobaciones; la fuente base64 se verifica por huella antes y después.
- No leer `index.html` entero: descargarlo y trabajar por secciones.
- No poner claves secretas en el navegador ni en el chat.
