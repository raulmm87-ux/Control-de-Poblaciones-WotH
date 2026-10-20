# Registro de cambios

Formato: versión → qué incluye, con su estado: **probado** (verificado por el autor en uso real), **implementado** (hecho y con sintaxis comprobada, pendiente de prueba real) o **descartado**. La versión se controla solo con el nombre de la caché de `sw.js`.

Fuentes: historial de commits, README previo y registro de las conversaciones de trabajo. Donde los commits solo dicen «Add files via upload» y no se conserva el detalle, se indica.

---

## 1.1.0 · 20-oct-2026 · caché `woth-1.1.0`
Armonización visual con el manual de estilo (`docs/ESTILO.md`) y retoques de la vista de listas. Incluye las pruebas internas f5r → f5u.

**f5r** (probado)
- Ventana «Nuevo animal» con el mismo fondo «musgo» y botones que las ventanas de pieza y manada (antes salía blanca o con el color del sistema).
- Ficha de animal suelto: los botones muestran sus iconos (la app cambia los glifos por SVG y la ficha copiaba solo el texto).
- Curva de genética de Manadas más grande; se elimina el bloque inferior con porcentajes repetidos y texto explicativo (el texto completo sigue en el tooltip).

**f5s** (probado)
- Tokens de diseño declarados en `:root`: colores semánticos, radios, tamaños de texto, espaciado y capas.

**f5t** (probado)
- «Editar» unificado en azul-verdoso (`--edit`) en filas de tabla, panel de manada, barra «Seleccionar» y fichas; hover en el mismo tono.
- Radios a la escala 6/10/14/999 (7→6; 8, 9, 12→10; 16→14).
- Tamaños de texto a la escala (11,5→11; 12,5→13; 13,5→14; 14,5→15; 17→16; 19→20).
- Colores casi duplicados unificados (crema #f3ecdc, rojo oscuro #8f2f0d, texto oscuro #1d2a23). Musgo de ventanas como token `--moss`.
- Capas (z-index) conservadas tal cual por el orden entre ventanas.

**f5u / 1.1.0** (implementado, pendiente de prueba real)
- Las ventanas «Nuevo animal», «Nueva pieza» y «Nueva manada» ya no llevan emoticono en el título (criterio único: ninguna lleva símbolo).
- El botón de la tabla «+ Agregar pieza (ficha de caza)» pasa a «+ Registrar extracción», igual que el botón flotante; actualizado también el texto de la ayuda.
- Porcentajes de la curva de Manadas un punto más grandes.
- Se quita «Barlow Condensed» de las pilas tipográficas (no estaba incrustada; caía a Oswald).
- Caché de `sw.js`: `woth-1.1.0`.

---

## 1.0.x · Fase 5 · interfaz y vista de listas (18–19 oct 2026)
Partiendo de F4. Detalle por pruebas internas f5a → f5q; los commits no conservan el desglose, solo lo registrado en las conversaciones.

**f5a** (probado)
- Mensajes y avisos más cortos; login rediseñado (ver/ocultar contraseña, «Entrando…», indicador de comprobación).
- Indicador de estado de sincronización definitivo: *Sincronizado*, *Subiendo…*, *Sin subir*, *Sin conexión*, *Sin conexión · sin subir*, *Conflicto · toca*.

**Mejoras de la tanda del 18-oct** (probadas la primera tanda; el resto, aprobadas y aplicadas por tandas)
- Exportar con fecha y hora, estado de los datos, «Revisar datos», botones de 44 px.
- IDs internos para animales y extracciones (`ensureIds`), para no depender de la posición.
- Mejoras de utilidad cinegética, de `sw.js` y del historial en la nube (aprobadas el 18-oct; el desglose exacto no se conserva).

**f5d** (base estable)
**f5e** (descartada el 18-oct): fichas compactas, filas reducidas y barra de salto; resultó desastrosa en móvil (botones superiores movidos, fichas desordenadas, scroll lateral). Se vuelve a f5d.

**f5d → f5q** (19-oct, por iteraciones; implementado y usado, retocado hasta f5o)
- Vista común a todos los anchos de pantalla (las tablas originales quedan ocultas y una capa JS las lee ya filtradas y ordenadas).
- Extracciones y Animales: filas de dos alturas, máximo 6 visibles con scroll interno, botón «▦ Ver tabla» a pantalla completa, modo «Seleccionar» con Editar/Eliminar por ID interno y fichas oscuras al tocar la fila (nombre científico e impacto genético de la extracción).
- Manadas: filas con ID, alertas, especie/sector, composición, curva de genética y botones.
- Botón flotante + con arco de tres botones (individuo, extracción, manada).
- Ventana flotante «Nuevo animal» (f5p) y su versión compacta (f5q), pendientes entonces de prueba y probadas el 20-oct.

---

## 1.0.0 · Fases F0–F4 (16–17 oct 2026)
**F0** (probado, 16-oct): aviso de guardado fallido, validación de Importar, versión de esquema (`v`), Chart.js y fuentes incluidos (sin CDN).
**F1** (probado en portátil, iPhone 13 Pro e iPad 10 con Chrome, 16-oct): PWA instalable, alojada en Cloudflare con despliegue automático desde GitHub; `manifest.webmanifest`, `icons/`, `sw.js` (`woth-1.0.0-f3`), `_headers`, `wrangler.jsonc`, `.assetsignore`.
**F2** (probado, 16-oct): Supabase con correo y contraseña (registros públicos desactivados), sesión persistente, «Cerrar sesión», migración local → nube (exportación obligatoria, copia previa, subida sin sobrescribir y verificación), «Descargar de la nube» y carga automática en un dispositivo nuevo.
**F3** (probado, 17-oct): subida automática 3 s después de guardar, versión por documento, aviso de conflicto con elección, indicador de estado, tiempo real, aviso a los 5 días sin conectar; cambios acumulados sin conexión.
**F4** (probado en portátil e iPhone; iPad confirmado después, 17–18 oct): pruebas reales en los tres dispositivos.
- Incidencia: acceso directo en blanco en iPhone/iPad por el bloqueo de IP de LaLiga a Cloudflare en días de partido (no era fallo del código; ver `docs/DESPLIEGUE.md`).
- `sw.js` f4b (desactivador temporal) y f4c (caché sin conexión con espera de red de 3 s). Durante el bloqueo se volvió a la versión F3; `diag.html` temporal creado y borrado. Después, `sw.js` con espera de 3 s quedó definitivo.
- Flujo `keep-supabase-alive.yml` (lunes y jueves) creado el 18-oct contra la pausa por inactividad del plan gratuito.

---

## Pre-1.0 · prototipo (8–16 oct 2026)
- **8–9 oct:** versión inicial del dashboard en un único HTML («Gestión de Población · Way of the Hunter»). Documentos de protocolo de trabajo con IAs (arquitectura, tareas, flujo, prompts), eliminados el 16-oct al reorganizar el repositorio.
- **10 oct:** cabecera móvil mejorada, diferenciación de Alce Occidental, prioridad a rangos nuevos al migrar especies, nombres de especies y etiquetas de filtros corregidos.
- **Funcionalidad base acumulada** (según conversaciones): manadas por mapa con ID prefijado, año biológico, alertas de manada, ficha de caza, ficha de manada, modelo de genética con horquilla por región y hábitat, sectores e IDs tipo `NP-PB-01P`, catálogo editable de nombres, copias automáticas, orden de tablas, cabecera compacta y barra superior fija, logo propio, datos de prueba (detalle en `docs/REGLAS_Y_DECISIONES.md`).
- **15 oct:** auditoría de la v0.9-dev y revisiones del artefacto (rev05–rev08): acciones separadas en «Todos los animales», motivos de extracción, hover en todo lo clicable, listados con «Ver todos», copias automáticas (10). Se descarta la propuesta de reorganizar en `src/`.
- **16 oct:** reorganización del repositorio a `index.html` + PWA; borrado de documentos de protocolo, carpeta `Iconos/` y HTML antiguo; alta de `.assetsignore` y `.gitignore`.

---

## Pendiente conocido
- Validar la lista de nombres científicos y el umbral (±1 punto) del impacto genético en las fichas.
- Revisar que no queden rutas de borrado por posición (usar IDs internos).
- Decidir si se cambia la dirección web (hoy `workers.dev`). Cada dirección tiene su propio almacenamiento: migrar con Exportar → Importar.
- Comprobar si una consulta sin sesión cuenta como actividad para Supabase (el ping semanal está creado).
