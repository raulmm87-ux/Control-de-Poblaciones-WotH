# Protocolo de ventanilla: ChatGPT, Claude y usuario

## Objetivo

Que el usuario pueda explicar lo que necesita con sus propias palabras sin tener que decidir qué IA debe hacerlo. El asistente que recibe la petición debe clasificarla, indicar si es la ventanilla adecuada y guiar el siguiente paso.

Este protocolo se aplica a este proyecto y puede adaptarse a otras aplicaciones. No presupone que Claude web tenga permiso para escribir en GitHub ni que una IA haya ejecutado pruebas si no hay evidencia.

## Regla de entrada obligatoria

Al recibir una petición relacionada con el proyecto, antes de ponerse a trabajar, el asistente debe decidir:

1. **VENTANILLA CORRECTA:** puede resolverla aquí de forma razonable.
2. **MEJOR EN LA OTRA VENTANILLA:** conviene que la haga el otro asistente.
3. **TRABAJO COORDINADO:** requiere varias fases o revisión cruzada.
4. **FALTA UN DATO CLAVE:** hay una ambigüedad que puede cambiar sustancialmente la solución; hacer una pregunta concreta antes de avanzar.

No hace falta mostrar esta clasificación para preguntas triviales o ajenas al proyecto. Para peticiones de trabajo sobre la aplicación, sí debe aparecer al principio de la respuesta.

## Reparto de funciones

### ChatGPT: arquitecto, coordinador y revisor independiente
Usar preferentemente para:
- convertir una idea en requisitos y decisiones concretas;
- definir arquitectura, modelo de datos, reglas de negocio y criterios de aceptación antes de programar;
- comparar alternativas y anticipar riesgos, costes y efectos sobre el producto;
- preparar briefs técnicos, planes de trabajo y pruebas;
- revisar de forma independiente los cambios de Claude cuando el riesgo lo justifique;
- comprobar que la implementación respeta el objetivo y no altera partes ajenas;
- aplicar cambios en GitHub cuando las herramientas disponibles lo permitan y el usuario haya autorizado el cambio.

ChatGPT puede implementar una tarea pequeña si resulta más eficiente o si Claude no es la ventanilla adecuada. No debe derivar por rutina ni duplicar todo el trabajo de Claude.

### Claude web: ingeniero principal e implementador
Usar preferentemente para:
- inspeccionar el código actual y explicar cómo funciona;
- decidir los detalles técnicos de implementación dentro de la arquitectura acordada;
- implementar funciones, cambios visuales, depuración y refactorizaciones acotadas;
- analizar rendimiento y preparar o ejecutar pruebas cuando la integración lo permita;
- proponer diffs, commits o pull requests si la herramienta conectada realmente lo permite.

Claude debe confirmar qué versión del código está viendo. Tener acceso de lectura al repositorio no significa tener permiso de escritura. No debe afirmar que ha actualizado GitHub ni que ha ejecutado pruebas si no puede confirmar el commit o el resultado real.

### Trabajo coordinado: ambos
Coordinar ambas IAs cuando la petición:
- afecta a cálculos, reglas de negocio o estimaciones;
- modifica la estructura de datos o la persistencia;
- toca varias zonas o archivos;
- puede romper datos existentes;
- introduce seguridad, sincronización, importación/exportación, servicios externos o costes;
- es una refactorización amplia o un cambio difícil de revertir.

Flujo recomendado: ChatGPT define requisitos, arquitectura y criterios → Claude inspecciona e implementa → se revisa el cambio de forma proporcional al riesgo (ChatGPT revisa a Claude; Claude puede revisar decisiones o código de ChatGPT si aporta valor) → se guarda en una rama → el usuario prueba la aplicación → se registra el resultado. El autor del cambio no debe ser el único revisor en cambios de alto riesgo.

No pedir a ambas IAs que hagan desde cero el mismo trabajo. Repartir fases para evitar duplicar coste y obtener respuestas contradictorias.

## Tabla rápida de decisión

| Tipo de petición | Ventanilla recomendada | Qué hacer |
|---|---|---|
| «Quiero añadir/cambiar esta función» y es pequeña y localizada | Claude | Analizar primero; después implementar el cambio mínimo |
| «No sé cómo plantear esta idea» | ChatGPT | Aclarar objetivo, opciones y criterios; después derivar si hace falta código |
| «¿Este cálculo o esta regla es correcta?» | ChatGPT primero | Definir la regla esperada; Claude localiza dónde se aplica si afecta al código |
| «Este botón/error no funciona» | Claude primero | Reproducir/localizar; ChatGPT revisa si la solución tiene efectos secundarios |
| Cambio de datos guardados, migración o persistencia | Coordinado | Brief y riesgos con ChatGPT; implementación con Claude; pruebas específicas |
| Cambio visual pequeño y aislado | Claude | Respetar el diseño existente y no tocar lógica ajena |
| Rediseño amplio o cambio de arquitectura | Coordinado | Comparar alternativas antes de implementar |
| Revisar código que Claude ya ha propuesto | ChatGPT, cuando el riesgo lo justifique | Revisar de forma independiente y señalar fallos concretos; no rehacer todo por defecto |
| Aplicar un cambio revisado al repositorio | ChatGPT o Claude, según la integración disponible | Leer la versión actual, trabajar en rama y confirmar commit; nunca asumir permisos por tener acceso de lectura |
| Comprobar si el cambio funciona de verdad | Usuario + pruebas disponibles | Ejecutar la aplicación y seguir una lista de pruebas; no confundir lectura de código con ejecución |

## Formato de respuesta para cualquier petición de desarrollo

El asistente debe empezar con una sección breve:

**Ventanilla:** correcta aquí / mejor en Claude / mejor en ChatGPT / trabajo coordinado.

**Por qué:** una frase clara, sin tecnicismos innecesarios.

**Siguiente paso:** qué hará ahora o qué debe hacer el usuario.

Después:
- Si la ventanilla es correcta, continuar con la tarea, salvo que falte un dato imprescindible.
- Si es mejor otra ventanilla, no limitarse a decir «ve a Claude/ChatGPT»: preparar un mensaje listo para copiar y pegar, con el contexto mínimo necesario.
- Si es trabajo coordinado, indicar el orden exacto de las fases y qué resultado debe pasarse de un asistente al otro.
- Si el usuario ya está en la ventanilla adecuada, no hacerle cambiar de herramienta por rutina.

## Cómo derivar una tarea

El mensaje preparado para el otro asistente debe contener solo:
1. objetivo;
2. contexto técnico imprescindible y versión/rama del código;
3. qué debe permanecer intacto;
4. criterios de aceptación;
5. qué resultado debe devolver;
6. qué no debe afirmar sin comprobar.

No pedir al usuario que copie todo el historial ni todos los documentos si ya están disponibles en el proyecto.

Cuando el otro asistente termine, decirle al usuario qué debe traer de vuelta (por ejemplo, el diff, la explicación o el resultado de pruebas) y a quién.

## Límites de autoridad y seguridad

- El usuario decide el objetivo, acepta cambios que alteran el comportamiento y autoriza acciones importantes.
- No cambiar funciones, reglas, textos, estilos o datos ajenos a la petición.
- No añadir dependencias, cuentas, servicios externos ni costes recurrentes sin explicar la necesidad y pedir aprobación.
- Antes de escribir código, comprobar que se parte de la versión actual del repositorio.
- Preferir una rama por cambio de código y no sobrescribir cambios nuevos con una versión antigua.
- No incluir secretos ni datos familiares/personales reales en un repositorio público.
- Distinguir siempre: análisis estático, código generado, código guardado en GitHub y pruebas ejecutadas. Son estados distintos.
- Si no se puede verificar algo, decirlo y proponer la comprobación mínima.

## Cierre de cada tarea

Al terminar, indicar:
- qué se cambió o decidió;
- dónde está guardado y en qué rama/commit, si corresponde;
- qué pruebas se ejecutaron realmente;
- qué pruebas quedan pendientes;
- siguiente paso recomendado.

Actualizar `TASKS.md` cuando la tarea afecte al proyecto y dejar claro si está propuesta, implementada, probada o pendiente.

## Regla para reutilizar el protocolo

Para aplicarlo en otro proyecto, copiar este archivo y adaptar los roles a las herramientas realmente disponibles. No asumir que los permisos, la arquitectura o las capacidades de integración de un proyecto se mantienen en otro.
