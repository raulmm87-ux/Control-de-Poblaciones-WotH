# Prompts reutilizables para ChatGPT y Claude

Usar solo el prompt que corresponda a la fase actual. Sustituir los campos entre corchetes y evitar pegar el historial completo. Para elegir fase y asistente, consultar `VENTANILLA_IA.md`.

## 0. Clasificar una petición (para el asistente que la recibe)

> Antes de trabajar en esta petición de desarrollo, clasifícala según `VENTANILLA_IA.md`: ventanilla correcta aquí, mejor en el otro asistente, trabajo coordinado o falta un dato clave.
>
> Dime en breve por qué y cuál es el siguiente paso. Si debo acudir al otro asistente, prepara un mensaje listo para copiar con el contexto mínimo. Si puedo continuar aquí, sigue con la tarea. No me hagas repetir información que ya está en la documentación del proyecto.

## 1. Definir tarea en ChatGPT

> Quiero hacer este cambio: [resultado concreto].
>
> Usa las instrucciones y documentación de este repositorio como fuente principal. Antes de proponer código, identifica el alcance, los archivos o funciones probablemente afectados, qué debe permanecer intacto y los criterios de aceptación.
>
> No inventes requisitos ni cambies otras partes por iniciativa propia. Si falta un dato imprescindible, pregúntame. Devuélveme un brief corto que pueda pasar a Claude y una lista de pruebas.

## 2. Análisis inicial en Claude web

> Trabaja sobre el código actual del repositorio seleccionado y sigue `VENTANILLA_IA.md`, `PROJECT.md`, `ARCHITECTURE.md`, `TASKS.md` y `AI_WORKFLOW.md`.
>
> Objetivo: [objetivo].
> Debe permanecer intacto: [restricciones].
> Criterios de aceptación: [pruebas/resultado esperado].
>
> Primero inspecciona únicamente los archivos y funciones relevantes. Resume cómo funciona ahora y plantea el cambio mínimo. No escribas todavía el archivo completo ni hagas refactorizaciones ajenas. Indica riesgos, dudas y cómo probarías la solución. Si no puedes acceder a la versión actual del código, dilo antes de continuar.

## 3. Implementar en Claude web

> Implementa únicamente el cambio aprobado: [resumen del cambio].
>
> Parte de esta versión: [rama/commit o indicación de que se ha sincronizado GitHub].
> No cambies ninguna otra funcionalidad, regla, texto ni estilo que no sea necesario.
>
> Devuelve:
> 1. archivos afectados;
> 2. un diff o instrucciones de edición exactas, con suficiente contexto para identificar el lugar;
> 3. explicación breve de por qué el cambio cumple los criterios;
> 4. pruebas realizadas y no realizadas;
> 5. riesgos o dudas pendientes.
>
> No afirmes que el código se ha guardado en GitHub a menos que lo hayas hecho realmente y puedas identificar el commit. Si necesitas reescribir un archivo completo por una limitación técnica, avísame primero.

## 4. Revisar propuesta de Claude en ChatGPT

> Revisa la propuesta de Claude para la tarea [nombre]. Comprueba que cumple el objetivo y las restricciones del brief. Busca errores lógicos, efectos secundarios, cambios no solicitados, incompatibilidades con datos existentes, problemas de seguridad y pruebas ausentes.
>
> No aceptes la propuesta por defecto. Distingue errores confirmados de riesgos posibles. Si necesita corrección, escribe las instrucciones precisas para Claude. No apliques cambios todavía.

## 5. Aplicar el cambio aprobado en GitHub

> Aplica en GitHub el cambio revisado y aprobado para [tarea], usando como base la versión actual del repositorio [repositorio y rama].
>
> Antes de escribir, vuelve a leer el archivo actual y comprueba que coincide con la versión revisada. Si ha cambiado, detente y compara las diferencias. Trabaja en una rama separada si la herramienta lo permite. Modifica solo los archivos acordados.
>
> Después verifica el contenido guardado y devuelve la rama, el commit, los archivos cambiados y las comprobaciones realizadas. No digas que la aplicación se ha probado en un navegador si no se ha ejecutado.

## 6. Preparar pruebas

> Crea una lista breve de pruebas manuales para [cambio]. Para cada una, indica pasos, resultado esperado y qué fallo detectaría. Incluye regresiones de las funciones relacionadas y, cuando proceda, persistencia, importación/exportación y compatibilidad con datos existentes. No des por realizadas las pruebas.

## 7. Cerrar una tarea

> Cierra la tarea [nombre] usando solo los resultados comprobados. Resume qué cambió, archivos afectados, pruebas realmente ejecutadas, pruebas pendientes, riesgos y commit. Propón las actualizaciones necesarias para `TASKS.md` y `ARCHITECTURE.md`. No marques como verificado aquello que solo se ha revisado estáticamente.

## 8. Reanudar tras una pausa

> Retomemos [proyecto/tarea]. Consulta primero la documentación y el estado actual del repositorio. Resume en un máximo de 8 puntos: objetivo, estado confirmado, último commit relevante, decisiones tomadas, restricciones, pruebas pendientes y siguiente paso. No repitas análisis ya documentados ni asumas que el código sigue igual sin comprobarlo.
