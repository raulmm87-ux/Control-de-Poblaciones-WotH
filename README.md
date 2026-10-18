# Gestión de Población · Way of the Hunter

Herramienta de gestión de manadas y descastes (mapas, años biológicos, extracciones). Una sola página web que funciona como app instalable (PWA). **Versión publicada: 1.0.0-F3, con F0–F4 probadas (iPad sin confirmar). Versión F5a (interfaz) preparada: pendiente de publicar y de prueba real.**

## Reglas de trabajo (leer al empezar cada chat)
- Conservar funciones, diseño y lógica actuales. No rehacer ni refactorizar sin necesidad.
- Cambios pequeños, útiles y verificables. Distinguir siempre: **implementado / probado / pendiente de prueba real**.
- Coste cero: no contratar ni añadir servicios sin consultar. Priorizar la opción más sencilla y de menos tokens.
- No implementar servicios externos ni cambiar la arquitectura hasta que el usuario lo indique.
- Antes de tocar datos: copia de seguridad y vía de recuperación. Exportar/Importar JSON se mantiene siempre.
- Nunca claves secretas en el navegador (solo la URL y la clave pública «publishable» de Supabase, con seguridad por fila). Nadie pega contraseñas ni claves secretas en el chat.
- `index.html` pesa unos 420 KB: no leerlo entero; trabajar por secciones (el módulo de nube está en el último bloque `<script>`, unas 150 líneas).
- Dispositivos de prueba: portátil 1080p, iPhone 13 Pro, iPad 10; navegador habitual: Chrome.

## Archivos
| Archivo | Para qué |
|---|---|
| `index.html` | La app completa (HTML, CSS y JS; Chart.js y fuentes incluidos). La lógica está en el último bloque `<script>`; el módulo de nube (login, migración, sincronización, indicador de estado) en el bloque final |
| `supabase.js` | Librería `@supabase/supabase-js` 2.117.2 (MIT), incluida en el repositorio, sin CDN |
| `manifest.webmanifest`, `icons/` | Instalación como app |
| `sw.js` | Funcionamiento sin conexión (red primero, caché de respaldo). **Subir el número de `CACHE` en cada publicación** (publicado: `woth-1.0.0-f3`; preparado: `woth-1.0.0-f5a`) |
| `_headers`, `wrangler.jsonc`, `.assetsignore` | Configuración de Cloudflare (alojamiento estático sin compilar). `.assetsignore` excluye README, configuración, `docs` y `.github` |
| `.github/workflows/keep-supabase-alive.yml` | Ping lunes y jueves a la API de Supabase contra la pausa por inactividad (**pendiente de crear a mano en GitHub**) |

## Datos
- Trabajo diario: `localStorage` (clave `wotH5`), un único documento JSON con versión de esquema `v`. Las manadas, animales y extracciones no tienen ID propio (se identifican por posición).
- Nube (Supabase): tabla `datos` (`user_id` clave primaria, `data` jsonb, `version`, `updated_at`), una fila por usuario, con seguridad por fila y permisos explícitos solo para `authenticated`. Realtime activado. Registros públicos desactivados: los usuarios se crean a mano en el panel de Supabase.
- Claves locales de sincronización: `wotH_uid`, `wotH_cv` (versión base), `wotH_dirty`, `wotH_lc` (último contacto), `wotH_auth` (sesión).
- Copias: botón ⬇ (exportar JSON) y ⬆ (importar, con validación). Copia previa `wotH5_pre_nube` antes de migrar o descargar y `wotH5_nube_previa` en conflictos. Si los datos guardados no se pueden leer, se conserva `wotH5_corrupto`.
- Cada dirección web tiene su propio almacenamiento: al cambiar de dirección se migra con Exportar → Importar.

## Plan por fases
- **F0** (hecha y probada): aviso de guardado fallido, validación de importar, versión de esquema, Chart.js y fuentes incluidos.
- **F1** (hecha y probada en portátil, iPhone 13 Pro e iPad 10 con Chrome): PWA instalable y alojada, con datos locales por dispositivo.
- **F2** (hecha y probada): Supabase con correo y contraseña. Pantalla de login con sesión persistente y «Cerrar sesión» en Ajustes → Nube. Migración local → nube (exportación obligatoria, copia previa, subida sin sobrescribir y verificación), «Descargar de la nube» y carga automática en un dispositivo sin datos propios.
- **F3** (hecha y probada): subida automática 3 s después de guardar, versión por documento, aviso de conflicto con elección, indicador de estado, tiempo real y actualización al volver a la app, aviso si pasan 5 días sin conectar (Supabase gratuito pausa a los 7 días sin actividad). Sin conexión se acumulan los cambios y se suben al volver.
- **F4** (pruebas reales): hecha y funcionando en portátil e iPhone (sesión persistente, sin conexión, dispositivo nuevo, cerrar sesión, actualización de versión, datos reales). iPad sin confirmar.
- **F5a** (interfaz; **implementada y probada solo en simulación, pendiente de publicar y de prueba real**): mensajes y avisos más cortos, login rediseñado (ver/ocultar contraseña, estado «Entrando…», indicador de comprobación), indicador de estado definitivo (*Sincronizado*, *Subiendo…*, *Sin subir*, *Sin conexión*, *Sin conexión · sin subir*, *Conflicto · toca*, con ayuda al pulsar). No cambia la lógica de sincronización.

## Incidencia conocida: bloqueos de LaLiga
En días de partido, los operadores españoles bloquean direcciones IP de Cloudflare por orden judicial. Afecta al alojamiento (`workers.dev`) y a Supabase, que también pasan por Cloudflare. No es un fallo del código.
- **Síntomas:** Safari muestra «la conexión no es privada» o «IP bloqueada»; al añadir el acceso directo no sale el icono y la app se queda en blanco; la sincronización falla.
- **Qué hacer:** no tocar el código. Comprobar en hayahora.futbol, esperar a que termine el bloqueo y repetir. El acceso directo solo se puede instalar cuando no hay bloqueo.
- **Datos:** a salvo en `localStorage`; los cambios se acumulan y se suben solos al volver la conexión.
- **Idea guardada (no publicada):** `sw.js` con espera de red de 3 s y caché de respaldo para abrir una app ya instalada aunque la red no responda (commit `0346d1e`).

## Despliegue
GitHub (este repo) → Cloudflare (importar repositorio, sin comando de compilación, directorio raíz). Cada subida a `main` publica sola.
- El conector de GitHub de Claude puede escribir archivos pequeños (`sw.js`, `.assetsignore`, `README.md`), pero no `index.html` (demasiado grande) ni `.github/workflows` (error 403). Esos se suben a mano arrastrándolos en la web de GitHub.
- Los archivos ocultos (`.assetsignore`) y los flujos (`.github/workflows/...`) se crean con «Create new file».
- En cada publicación que cambie archivos de la app, subir el número de `CACHE` en `sw.js`.

## Mantenimiento
- Supabase gratuito pausa el proyecto tras 7 días sin actividad de base de datos. Se mitiga abriendo la app a menudo (aviso a los 5 días) y con el flujo `keep-supabase-alive.yml` (lunes y jueves). No está verificado que una consulta sin sesión cuente como actividad. Plan B: función SQL pública de consulta trivial (solo con permiso del usuario).
- Los flujos programados de GitHub se desactivan tras 60 días sin actividad en el repositorio.

## Pendiente
- Publicar F5a (`index.html` y `sw.js`) y crear el flujo del ping; probarlo en portátil, iPhone e iPad.
- Confirmar F4 en iPad.
- Rendimiento con datos reales y propuestas de mejora (nuevo chat).
