# Gestión de Población · Way of the Hunter

Herramienta de gestión de manadas y descastes para *Way of the Hunter* (mapas, años biológicos, extracciones, genética estimada). Una sola página web que funciona como app instalable (PWA), con datos locales y sincronización opcional con Supabase.

**Versión 1.1.0 (cerrada)** · caché `woth-1.1.0-f5v` · App: https://control-de-poblaciones-woth.raulmm87.workers.dev/

## Estado
- **Probado por el autor:** F0–F4 (datos locales, PWA, nube, sincronización, pruebas reales en portátil, iPhone 13 Pro e iPad 10 con Chrome), interfaz F5 y armonización visual completa hasta f5v. La 1.1.0 está aprobada y publicada.
- **Pendiente menor:** ver el final de `CHANGELOG.md`.
- **Siguiente línea de trabajo:** llevar la herramienta de simulador a utilidad real de gestión cinegética. Análisis inicial en `docs/VIDA_REAL.md` (sin decisiones tomadas).

## Estructura del repositorio
```
index.html                  App completa (HTML + CSS + JS, Chart.js y fuentes incluidos)
supabase.js                 Librería @supabase/supabase-js (copia local)
sw.js                       Service worker (el nombre de CACHE es la versión)
manifest.webmanifest        Instalación como app
icons/                      Iconos de la app
_headers  wrangler.jsonc    Configuración de Cloudflare
.assetsignore               Lo que NO se publica (README, CHANGELOG, docs, .github…)
.github/workflows/          Ping a Supabase contra la pausa por inactividad
CHANGELOG.md                Registro de modificaciones por versión
docs/
  ARQUITECTURA.md           Cómo está hecha la app, datos, nube, service worker
  REGLAS_Y_DECISIONES.md    Reglas de descaste, genética, IDs y decisiones de producto
  ESTILO.md                 Manual de estilo: colores, botones, escalas, componentes
  DESPLIEGUE.md             Cómo publicar, versiones, copias, incidencias y mantenimiento
  PRUEBAS.md                Checklists de prueba por dispositivo
  VIDA_REAL.md              Análisis para llevar la herramienta a la gestión cinegética real
```

## Documentación
| Si quieres… | Lee |
|---|---|
| Saber qué cambió en cada versión | `CHANGELOG.md` |
| Entender cómo funciona por dentro | `docs/ARQUITECTURA.md` |
| Conocer las reglas del juego aplicadas | `docs/REGLAS_Y_DECISIONES.md` |
| Añadir algo respetando el diseño | `docs/ESTILO.md` |
| Publicar una versión | `docs/DESPLIEGUE.md` |
| Probar antes de publicar | `docs/PRUEBAS.md` |
| Pensar el salto a la vida real | `docs/VIDA_REAL.md` |

## Reglas de trabajo (leer al empezar cada chat)
- Conservar funciones, diseño y lógica actuales; cambios pequeños y verificables. Distinguir siempre **implementado / probado / pendiente de prueba real**. Solo se comprueba sintaxis con `node --check`.
- Coste cero: no contratar ni añadir servicios sin consultar. Sin cambios de arquitectura salvo que lo indique el autor.
- Antes de tocar datos: copia de seguridad y vía de recuperación; Exportar/Importar JSON se mantiene. Nunca claves secretas en el navegador ni en el chat.
- **Nunca sustituciones de texto globales dentro de `index.html`** (se corrompió una vez la fuente incrustada). Cambios con anclas únicas y comprobaciones. No leer `index.html` entero: descargarlo y trabajar por secciones.
- Todo elemento nuevo sigue `docs/ESTILO.md`: tokens, escalas y componentes existentes.
- Máximo una pregunta por turno. El archivo de cambios de cada versión se actualiza al final, cuando el autor aprueba la versión.
- El conector de GitHub de Claude escribe archivos pequeños (README, CHANGELOG, `docs/`, `sw.js`, `.assetsignore`), pero no `index.html` ni `.github/workflows` (se suben a mano).

## Despliegue
GitHub (`main`) → Cloudflare, sin compilación. Cada subida a `main` publica sola. Al publicar, subir el nombre de `CACHE` en `sw.js` y subir `index.html` y `sw.js` a la vez. Detalle en `docs/DESPLIEGUE.md`.

## Incidencia conocida
En días de partido de LaLiga se bloquean IP de Cloudflare en España (afecta a la web y a Supabase). No es un fallo del código; ver `docs/DESPLIEGUE.md`.
