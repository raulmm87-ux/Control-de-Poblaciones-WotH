# Gestión de Población · Way of the Hunter

Herramienta de gestión de manadas y descastes (mapas, años biológicos, extracciones). Una sola página web que funciona como app instalable (PWA). **Versión actual: 1.0.0-F1.**

## Reglas de trabajo (leer al empezar cada chat)
- Conservar funciones, diseño y lógica actuales. No rehacer ni refactorizar sin necesidad.
- Cambios pequeños, útiles y verificables. Distinguir siempre: **implementado / probado / pendiente de prueba real**.
- Coste cero: no contratar ni añadir servicios sin consultar. Priorizar la opción más sencilla y de menos tokens.
- No implementar servicios externos ni cambiar la arquitectura hasta que el usuario lo indique.
- Antes de tocar datos: copia de seguridad y vía de recuperación. Exportar/Importar JSON se mantiene siempre.
- Nunca claves secretas en el navegador (solo la URL y la clave pública de Supabase, con seguridad por fila).
- Dispositivos de prueba: portátil 1080p, iPhone 13 Pro, iPad 10; navegador habitual: Chrome.

## Archivos
| Archivo | Para qué |
|---|---|
| `index.html` | La app completa (HTML, CSS y JS; Chart.js y fuentes incluidos, sin dependencias externas) |
| `manifest.webmanifest`, `icons/` | Instalación como app |
| `sw.js` | Funcionamiento sin conexión (red primero, caché de respaldo). **Subir el número de `CACHE` en cada publicación** |
| `_headers`, `wrangler.jsonc`, `.assetsignore` | Configuración de Cloudflare (alojamiento estático sin compilar) |

## Datos
- Hoy: `localStorage` (clave `wotH5`), un único documento JSON con versión de esquema `v`. Las manadas, animales y extracciones no tienen ID propio (se identifican por posición).
- Copias: botón ⬇ (exportar JSON) y ⬆ (importar, con validación). Si los datos guardados no se pueden leer, se conserva una copia en `wotH5_corrupto`.
- Cada dirección web tiene su propio almacenamiento: al cambiar de dirección se migra con Exportar → Importar.

## Plan por fases
- **F0** (hecha y probada en Chromium): aviso de guardado fallido, validación de importar, versión de esquema, Chart.js y fuentes incluidos.
- **F1** (esta): PWA instalable y alojada, con datos locales por dispositivo. Probado en local: service worker, instalabilidad, recarga sin conexión. **Pendiente: prueba real en los dispositivos.**
- **F2**: Supabase (cuenta gratuita ya creada): correo y contraseña, registros públicos desactivados, tabla `datos` (una fila por usuario: JSON + versión + fecha) con seguridad por fila y permisos explícitos. Migración local → nube con copia previa.
- **F3**: sincronización automática (versión por documento, aviso de conflicto con elección), estado de guardado visible, tiempo real, aviso semanal para evitar la pausa de Supabase gratuito (7 días sin actividad).
- **F4**: pruebas reales en los tres dispositivos.

## Despliegue
GitHub (este repo) → Cloudflare (importar repositorio, sin comando de compilación, directorio raíz). Cada subida a `main` publica sola.
Los archivos grandes (`index.html`, imágenes) se suben arrastrándolos en la web de GitHub; los pequeños de texto los sube Claude con el conector.

## Pendiente de prueba real (no verificado)
Instalación y almacenamiento de la PWA con Chrome en iPhone/iPad (en iOS Chrome usa el motor de Apple); actualización de versión en dispositivo; rendimiento con datos reales.
