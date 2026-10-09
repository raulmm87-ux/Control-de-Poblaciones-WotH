# Arquitectura actual

## Estado
Documento inicial basado en una lectura estática del archivo principal. No equivale a una auditoría completa ni confirma que todos los flujos se hayan probado en ejecución.

## Tecnología y formato
- Aplicación web contenida en un único archivo HTML.
- HTML para la interfaz, CSS integrado para estilos y JavaScript integrado para lógica y estado.
- Chart.js 4.4.1 se carga desde CDN para los gráficos.
- La fuente Barlow Condensed se carga desde Google Fonts.
- La interfaz está en español y contempla estilos claro/oscuro, diseño adaptable y áreas de tablas/gráficos.

## Persistencia de datos
- El estado se guarda en `localStorage` del navegador con la clave `wotH5`.
- El código incluye una rutina de migración desde la clave anterior `wotH4`.
- Los datos locales de un navegador/dispositivo no se sincronizan automáticamente con otro dispositivo.
- Las funciones de copia de seguridad e importación/exportación deben conservarse y probarse antes de modificar el modelo de datos.
- No se ha identificado una base de datos remota ni una API de servidor en la inspección inicial.

## Áreas funcionales identificadas en el HTML
- Selección de mapa/campaña y año.
- Gestión de manadas y animales.
- Cálculos y alertas asociados a la evaluación de animales.
- Resúmenes y gráficos de composición/genética.
- Historial de extracciones y vistas por manada/animal.
- Ajustes de configuración.
- Interfaz de edición mediante paneles y diálogos.

## Restricciones de mantenimiento
- Antes de cambiar campos guardados, revisar `DEF`, `mig`, `sv` y todos los puntos donde se lee o modifica el estado `S`.
- No cambiar la clave `wotH5` ni eliminar la migración sin una decisión explícita y una estrategia de compatibilidad.
- No asumir que la sincronización entre dispositivos existe: actualmente la persistencia identificada es local al navegador.
- Evitar depender de nuevas librerías si el cambio puede hacerse con la estructura existente.

## Pendiente de verificar
- Pruebas funcionales completas en navegador.
- Cobertura exacta de importación/exportación y recuperación de copias.
- Comportamiento si no hay conexión y no se pueden cargar Chart.js o Google Fonts.
- Validación de cálculos y reglas del juego frente a fuentes fiables.
