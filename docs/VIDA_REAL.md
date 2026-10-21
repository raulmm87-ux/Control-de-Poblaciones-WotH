# De simulador a uso real: análisis inicial

Estado: **análisis previo (21-oct-2026), sin decisiones tomadas.** Pensado para retomarlo en una conversación nueva. No es asesoramiento legal: la normativa cinegética depende de cada comunidad autónoma y debe confirmarse con la administración o un técnico competente.

## Idea central
Hoy la herramienta es un simulador con reglas de videojuego: la genética se ve al reclamar, el año biológico es día de juego / 3, y las alertas siguen umbrales propios (ver `docs/REGLAS_Y_DECISIONES.md`). En la vida real cambian los datos y las reglas, pero la estructura sirve.

## Qué se aprovecha
- Manadas = unidades de gestión; extracciones = capturas; alertas = criterios del plan de caza.
- Modo sin conexión (campo), sincronización con la nube, Exportar/Importar JSON, copias automáticas, IDs internos.
- El modelo de **horquilla** (mínimo, más probable, máximo): es la forma natural de trabajar con estimas de población.

## Qué cambia
- **Datos:** no existe la genética visible ni la edad exacta; se trabaja con estimas de censo (batidas, transectos, fototrampeo, conteos) con incertidumbre, y con clases de edad y proporción de sexos.
- **Reglas:** el año biológico y los umbrales de genética dejarían de valer; las reglas vendrían del plan de cada coto (cupos, sexo, edad, calidad de trofeo).
- **Unidades:** mapa y región pasan a coto, cuartel y mancha, con GPS y cartografía.
- **Normativa (por comunidad):** ejemplos encontrados el 21-oct-2026:
  - Aragon: sin plan técnico aprobado no puede ejercerse la caza en el terreno; incluye censos, plan de caza y plan de mejora de hábitat.
  - Castilla-La Mancha: planes de ordenación cinegética de cinco temporadas, con memoria y planos firmados por técnico competente (Ley 3/2015 de Caza de Castilla-La Mancha).
  - Estado: Ley 1/1970 de Caza como base; los cotos presentan memoria anual de actividades y la estadística nacional se nutre de ellas.
  - Algunas comunidades exigen precintos; Castilla y León tramita un sistema telemático de control de capturas que podría ser obligatorio en 2027 (propuesta de orden, sin confirmar como definitivo).
  - Terrenos en Red Natura 2000 pueden exigir evaluación ambiental del plan.

## Qué habría que añadir
- Usuarios con roles (titular, guarda, cazador) y registro de quién cambió qué.
- Fotos y localización sin conexión.
- Informes con el formato oficial de cada comunidad.
- Importación de censos.
- Protección de datos personales (RGPD) y de ubicaciones sensibles.
- Hosting de pago cuando haya más de un usuario: el plan gratuito se pausa por inactividad.

## Riesgos
- No sustituye a un técnico competente, que es quien firma el plan.
- Hay que validar el modelo con datos reales antes de que nadie decida con él.
- Seguridad y privacidad al pasar de datos de juego a datos de personas y terrenos.

## Camino por fases (propuesto, coste cero al inicio)
1. Piloto con datos históricos de un coto real, un solo usuario.
2. Sustituir modelo y reglas por los de ese coto.
3. Multiusuario con roles.
4. Informes oficiales.

## Preguntas abiertas
- ¿Para qué uso concreto: aprendizaje y portafolio, herramienta de un coto o producto para terceros?
- ¿Qué comunidad autónoma y qué especies (caza mayor) como primer caso?
- ¿Hay acceso a datos reales de un coto para el piloto?
- ¿Un solo usuario o un equipo?
- ¿Debe convivir el modo juego con el modo real o se separan?

## Fuentes consultadas (21-oct-2026)
- Gobierno de Aragón, planificación cinegética: https://www.aragon.es/-/planificacion-cinegetica
- JCCM, plan de ordenación cinegética de un coto (2026-2031): https://www.jccm.es/servicios/tablon-de-anuncios/descarga/34517/39198
- MITECO, metodología de la Estadística Anual de Caza: https://www.miteco.gob.es/es/biodiversidad/estadisticas/5016estadisticaanualdecaza_metodologia_tcm30-287472.pdf
- Junta de Castilla y León, memoria de la propuesta de orden de control telemático de capturas: https://transparencia.jcyl.es/huellanormativa/FYM/Orden control telemático piezas caza/Memoria de ánalisis de impacto normativo 150724.pdf
