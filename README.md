# Gestión de Población · Way of the Hunter

Herramienta de gestión de manadas y descastes (mapas, años biológicos, extracciones). Una sola página web que funciona como app instalable (PWA). **Versión actual: 1.0.0-F3 (sincronización automática, pendiente de prueba real).**

## Reglas de trabajo (leer al empezar cada chat)
- Conservar funciones, diseño y lógica actuales. No rehacer ni refactorizar sin necesidad.
- Cambios pequeños, útiles y verificables. Distinguir siempre: **implementado / probado / pendiente de prueba real**.
- Coste cero: no contratar ni añadir servicios sin consultar. Priorizar la opción más sencilla y de menos tokens.
- No implementar servicios externos ni cambiar la arquitectura hasta que el usuario lo indique.
- Antes de tocar datos: copia de seguridad y vía de recuperación. Exportar/Importar JSON se mantiene siempre.
- Nunca claves secretas en el navegador (solo la URL y la clave pública «publishable» de Supabase, con seguridad por fila).
- Dispositivos de prueba: portátil 1080p, iPhone 13 Pro, iPad 10; navegador habitual: Chrome.

## Archivos
| Archivo | Para qué |
|---|---|
| `index.html` | La app completa (HTML, CSS y JS; Chart.js y fuentes incluidos). La lógica está en el último bloque `<script>`; el módulo de nube (login, migración) en el bloque final |
| `supabase.js` | Librería `@supabase/supabase-js` 2.117.2 (MIT), incluida en el repositorio, sin CDN |
| `manifest.webmanifest`, `icons/` | Instalación como app |
| `sw.js` | Funcionamiento sin conexión (red primero, caché de respaldo). **Subir el número de `CACHE` en cada publicación** |
| `_headers`, `wrangler.jsonc`, `.assetsignore` | Configuración de Cloudflare (alojamiento estático sin compilar) |

## Datos
- Trabajo diario: `localStorage` (clave `wotH5`), un único documento JSON con versión de esquema `v`. Las manadas, animales y extracciones no tienen ID propio (se identifican por posición).
- Nube (Supabase, F2): tabla `datos` (`user_id` clave primaria, `data` jsonb, `version`, `updated_at`), una fila por usuario, con seguridad por fila y permisos explícitos solo para `authenticated`. Registros públicos desactivados: los usuarios se crean a mano en el panel de Supabase.
- Copias: botón ⬇ (exportar JSON) y ⬆ (importar, con validación). Copia previa `wotH5_pre_nube` antes de migrar o descargar. Si los datos guardados no se pueden leer, se conserva `wotH5_corrupto`.
- Cada dirección web tiene su propio almacenamiento: al cambiar de dirección se migra con Exportar → Importar.

## Plan por fases
- **F0** (hecha y probada): aviso de guardado fallido, validación de importar, versión de esquema, Chart.js y fuentes incluidos.
- **F1** (hecha y probada en portátil, iPhone 13 Pro e iPad 10 con Chrome): PWA instalable y alojada, con datos locales por dispositivo.
- **F2** (hecha y probada por el usuario): Supabase con correo y contraseña. Pantalla de login con sesión persistente y «Cerrar sesión» en Ajustes → Nube. Migración local → nube (exportación obligatoria, copia previa, subida sin sobrescribir y verificación), «Descargar de la nube» y carga automática en un dispositivo sin datos propios.
- **F3** (implementada, **pendiente de prueba real**): subida automática 3 s después de guardar, versión por documento, aviso de conflicto con elección (copias `wotH5_nube_previa` / `wotH5_pre_nube`), indicador de estado, tiempo real (requiere activar Realtime en la tabla `datos`) y actualización al volver a la app, aviso si pasan 5 días sin conectar (Supabase gratuito pausa a los 7 días sin actividad). Sin conexión se acumulan los cambios y se suben al volver. El enlace «Continuar sin iniciar sesión» solo aparece sin conexión o si no se puede comprobar la sesión.
- **F4**: pruebas reales en los tres dispositivos.

## Despliegue
GitHub (este repo) → Cloudflare (importar repositorio, sin comando de compilación, directorio raíz). Cada subida a `main` publica sola.
Todo se sube arrastrando archivos en la web de GitHub (el conector solo permite leer; escribir da 403). Los archivos ocultos (`.assetsignore`) se crean con «Create new file».

## Pendiente de prueba real (no verificado)
Login y sesión persistente en Chrome (portátil, iPhone, iPad) y en la app instalada de iOS; migración, descarga y carga automática en un dispositivo nuevo; funcionamiento sin conexión con sesión guardada; actualización de versión en dispositivo; rendimiento con datos reales.
