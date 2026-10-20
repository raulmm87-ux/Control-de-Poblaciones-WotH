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
- [ ] Ficha de animal suelto con iconos en los botones.

## Resultado de la 1.1 (20-oct-2026)
Checklist de f5t probada por el autor: todo correcto. Observaciones aplicadas en 1.1.0: criterio único de símbolos en ventanas, nombre del botón de la tabla y +1 pt en los porcentajes de la curva. Estos tres ajustes y la retirada de Barlow quedan pendientes de prueba real.
