# Pruebas

Distinguir siempre: **implementado / probado / pendiente de prueba real**. Solo se comprueba sintaxis con `node --check` antes de entregar; la prueba visual la hace el autor.

## Antes de cada publicación
- [ ] Exportación JSON de seguridad.
- [ ] Subir `index.html` y `sw.js`; recargar y comprobar el nombre de caché (cerrar y reabrir la PWA si no cambia).
- [ ] Datos y sincronización sin errores nuevos.

## En portátil, iPhone e iPad, en tema claro y oscuro
- [ ] «Editar» azul-verdoso en filas, panel de manada, barra «Seleccionar» y fichas; hover del mismo tono.
- [ ] «Eliminar» en rojo en todos esos sitios.
- [ ] Ventanas «Nuevo animal», «Nueva pieza» y «Nueva manada» con el mismo aspecto y sin emoticono en el título.
- [ ] Orden de apilado de ventanas correcto (ajustes sobre pieza, etc.).
- [ ] Botones y campos con radio 10 sin esquinas raras; ficha de manada correcta.
- [ ] Botón de la tabla de extracciones «+ Registrar extracción» y botón flotante coherentes.
- [ ] Extracciones y Animales en iPhone: filas compactas sin saltos de línea ni cortes.
- [ ] Manadas: curva ampliada correcta en ancho y estrecho; porcentajes legibles.
- [ ] Manadas: etiquetas de alerta completas (pasan a la línea siguiente si no caben), en todos los anchos.
- [ ] Ficha de animal suelto con iconos en los botones.
- [ ] Indicador de sincronización: «Sincronizado» desaparece a los 4 s; los avisos que piden acción se mantienen.

## Resultado de la 1.1.0 (21-oct-2026)
Checklist completa probada por el autor: todo correcto, incluidos los ajustes finales de f5u y f5v. Versión aprobada y publicada (caché `woth-1.1.0-f5v`).
