# Despliegue, versiones y mantenimiento

## Cadena
GitHub (este repositorio, rama `main`) → Cloudflare (importar repositorio, sin comando de compilación, directorio raíz). Cada subida a `main` publica sola.
App: https://control-de-poblaciones-woth.raulmm87.workers.dev/ · Dispositivos de uso: Chrome en portátil, iPhone 13 Pro e iPad 10.

## Publicar una versión
1. Preparar `index.html` y, si cambia, `sw.js`.
2. Subir el nombre de `CACHE` en `sw.js`. Esquema: **versión publicada `woth-X.Y.Z`**; pruebas internas `woth-X.Y.Z-fNN`.
3. Subir los archivos a `main`. `index.html` y `.github/workflows/*` se suben a mano arrastrándolos en la web de GitHub (el conector de Claude no puede escribir `index.html`, por tamaño, ni los flujos, error 403). El resto (README, CHANGELOG, `docs/`, `sw.js`, `.assetsignore`) puede escribirlo el conector.
4. Los archivos ocultos (`.assetsignore`) y los flujos se crean con «Create new file».
5. Recargar la app y comprobar la caché nueva; si sigue la antigua, cerrar y reabrir la PWA.
6. Registrar la versión en `CHANGELOG.md` cuando se apruebe.

## Copias de seguridad y recuperación
Antes de tocar datos: **Exportar JSON**. Se mantiene siempre Exportar/Importar. Cada dirección web tiene su propio almacenamiento: al cambiar de dirección, migrar con Exportar → Importar.

## Incidencia conocida: bloqueos de LaLiga
En días de partido, los operadores españoles bloquean direcciones IP de Cloudflare por orden judicial. Afecta a `workers.dev` y a Supabase.
- **Síntomas:** Safari muestra «conexión no privada» o «IP bloqueada»; al añadir el acceso directo no sale el icono y la app queda en blanco; falla la sincronización.
- **Qué hacer:** no tocar el código. Comprobar en hayahora.futbol, esperar y repetir. El acceso directo solo se instala sin bloqueo.
- **Datos:** a salvo en `localStorage`; los cambios se acumulan y se suben solos al volver.
- `sw.js` con espera de red de 3 s y caché de respaldo permite abrir una app ya instalada aunque la red no responda.

## Mantenimiento de Supabase gratuito
El proyecto se pausa tras 7 días sin actividad de base de datos. Mitigación: abrir la app a menudo (aviso a los 5 días) y el flujo `keep-supabase-alive.yml` (lunes y jueves). Está sin verificar que una consulta sin sesión cuente como actividad; plan B: función SQL pública de consulta trivial (solo con permiso del autor). Los flujos programados de GitHub se desactivan tras 60 días sin actividad en el repositorio.

## Coste cero
No contratar ni añadir servicios sin consultar. Sin cambios de arquitectura hasta que lo indique el autor.
