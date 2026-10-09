# Flujo de trabajo reutilizable con IA

Este protocolo puede copiarse a otros proyectos. Está pensado para trabajar con ChatGPT, Claude web y GitHub sin instalar herramientas ni contratar servicios adicionales.

**Antes de trabajar en una petición de desarrollo, consultar también `VENTANILLA_IA.md`.** Ese documento decide quién debe hacer cada fase y qué decirle al usuario si ha acudido al asistente menos adecuado.

## Roles

- **ChatGPT — arquitecto y coordinador:** convierte la idea en requisitos, define arquitectura y reglas de negocio, decide criterios de aceptación, prepara pruebas y realiza una revisión independiente cuando aporte valor. Puede modificar GitHub si tiene escritura autorizada.
- **Claude web — ingeniero principal e implementador:** inspecciona el código, resuelve los detalles técnicos e implementa cambios acotados, depura y analiza rendimiento. Puede crear commits/PR solo si la integración activa permite realmente escribir; el acceso de lectura no implica escritura.
- **Revisión cruzada — selectiva:** en cambios pequeños y reversibles puede bastar una implementación y una comprobación básica. En cálculos, persistencia, migraciones, seguridad o arquitectura, otra IA debe revisar el cambio antes de aceptarlo; el autor no será el único revisor.
- **GitHub — fuente de verdad:** conserva el código, la documentación y el historial de commits. Una respuesta de IA no se considera incorporada hasta que está guardada en el repositorio.
- **Usuario — propietario y verificación final:** decide qué comportamiento quiere, aprueba cambios importantes y ejecuta las pruebas reales de la aplicación cuando no haya un entorno de pruebas disponible.

## Protocolo de ventanilla

Para cada petición relacionada con el desarrollo, el asistente que la recibe debe decir brevemente:
- **Ventanilla:** correcta aquí / mejor en Claude / mejor en ChatGPT / trabajo coordinado / falta un dato clave.
- **Por qué:** explicación sencilla.
- **Siguiente paso:** qué hará o qué mensaje debe copiar el usuario al otro asistente.

Si conviene derivar, preparar un mensaje listo para copiar. No limitarse a mandar al usuario a otra herramienta. Si la petición ya está en la ventanilla adecuada, continuar sin crear pasos innecesarios. Para tareas triviales o preguntas ajenas al desarrollo, no hace falta mostrar esta clasificación.

## Flujo para cada tarea

### 1. Definir
Describir un único resultado concreto. Acordar:
- qué debe cambiar;
- qué debe permanecer intacto;
- archivos y funciones que podrían verse afectados;
- cómo se probará;
- límites de coste, dependencias, privacidad y compatibilidad.

No empezar a programar si hay una ambigüedad que pueda cambiar significativamente la solución.

### 2. Preparar contexto mínimo
Usar primero este archivo, `VENTANILLA_IA.md`, `PROJECT.md`, `ARCHITECTURE.md` y `TASKS.md`. Añadir solo los archivos o fragmentos necesarios. No volver a pegar documentación que ya esté disponible en las instrucciones o el conocimiento del proyecto.

### 3. Analizar en Claude
Enviar el prompt de análisis de `PROMPTS.md`. Pedir que inspeccione el código relevante antes de proponer cambios. En esta fase, Claude debe explicar la solución y los riesgos; no debe reescribir archivos completos si basta con una modificación localizada.

### 4. Revisar en ChatGPT
Traer la propuesta de Claude a ChatGPT cuando la tarea necesite revisión coordinada. Revisar:
- correspondencia con el objetivo;
- efectos secundarios y compatibilidad con datos guardados;
- reglas de negocio y cálculos;
- seguridad, dependencias y rendimiento;
- pruebas necesarias.

Si la propuesta está incompleta, pedir una corrección concreta, no reiniciar todo el análisis.

### 5. Aplicar en una versión aislada
Antes de tocar el archivo principal:
- comprobar que la versión actual de GitHub es la que se ha revisado;
- guardar el estado actual en un commit;
- crear una rama para cambios de código cuando sea posible;
- aplicar únicamente los cambios aprobados.

No pegar en la rama principal código generado que no se haya revisado. No sobrescribir un archivo si el resultado de Claude parte de una versión anterior.

### 6. Probar
Ejecutar las pruebas descritas en la tarea. Cuando no sea posible ejecutarlas, indicarlo expresamente y distinguir revisión estática de prueba real. Para cambios en aplicaciones con datos persistentes, probar también que los datos anteriores siguen cargándose y que las copias de seguridad funcionan.

### 7. Cerrar y registrar
Actualizar `TASKS.md` con el resultado. Anotar archivos modificados, pruebas realizadas, limitaciones y el commit correspondiente. Mantener el cambio sin fusionar si falla una prueba crítica.

## Política de cambios

- Una tarea principal por cambio.
- No hacer refactorizaciones, rediseños ni limpieza ajenos a la petición.
- No eliminar funciones ni cambiar reglas de negocio sin autorización.
- No añadir dependencias, servicios externos ni costes recurrentes sin explicar la razón y pedir aprobación.
- No afirmar que se ha probado algo que solo se ha leído.
- Si no hay certeza, declararla y proponer la comprobación mínima.
- Nunca incluir contraseñas, tokens, claves API ni datos personales reales en prompts, código público o documentación del repositorio.

## Ahorro de tokens

1. Usar un proyecto de Claude con instrucciones y documentación fija si la cuenta lo permite; así no hace falta repetirlas en cada conversación.
2. Mantener los documentos breves y actualizarlos cuando cambie la arquitectura.
3. Pedir primero análisis de las funciones relevantes y un plan breve.
4. Solicitar diffs o bloques exactos en lugar de regenerar archivos largos.
5. Evitar pedir a ambas IA que hagan el mismo análisis completo: repartir fases según `VENTANILLA_IA.md`.
6. En una nueva tarea, resumir solo el estado y la decisión pendiente, no copiar todo el historial.
7. Pedir una respuesta final estructurada: cambio, pruebas, riesgos y archivos afectados.

## Adaptación a proyectos distintos

Al copiar este protocolo a otro repositorio, actualizar `PROJECT.md`, `ARCHITECTURE.md` y `TASKS.md` con el propósito, la arquitectura, los datos sensibles y las pruebas propias de ese proyecto. Copiar y adaptar también `VENTANILLA_IA.md`. No reutilizar supuestos técnicos del dashboard actual en otra aplicación.
