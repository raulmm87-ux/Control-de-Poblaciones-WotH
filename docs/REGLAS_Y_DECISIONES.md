# Reglas de juego y decisiones de producto

Recopiladas de las conversaciones de trabajo. Lo marcado **(por validar)** no está confirmado.

## Modelo básico
- Manadas indexadas por mapa con ID prefijado: `NP` (Valle de Nez Perce), `TL` (Transilvania), etc. Filtro maestro de «Mapa activo».
- **Año biológico** = techo(día de juego / 3). Alerta de vigilancia si el año actual supera el del último avistamiento. El juego solo muestra el día 1–3, por eso el panel muestra «día X · Año Y» (historial: «dX · AY»; manadas: «Últ. avist. (Año)»). Las fechas de extracción son **días de juego**, no reales.
- Tamaño máximo de manada: 22 (se aplica, no se muestra como n/22).
- Entrada rápida: sexo, edad (Joven/Adulto/Maduro), estrellas 1–5 (se oculta en hembras). Al añadir un animal hay confirmación con resumen.

## IDs y sectores
- ID de manada: `[mapa]-[región]-[nº][hábitat]`, p. ej. `NP-PB-01P`. Sufijo **P** hábitat principal, **S** secundario, **C** coto privado.
- Códigos de región de 2 letras (p. ej. CA, AL, ZN, DR, DA, DI, HA, AV, ME, PB, EC, RK, RD, RO, TD, ZP); EC = «Reserva de las Cataratas». Hábitats: PR, BB, BA, MO, PA.
- El hábitat se elige al crear la manada (se rellena según la región, editable) y se aplica al ID y al sector. Columna Sector = «[región]-[hábitat]»; el detalle completo va en la ficha.
- Nombres propios sin traducir; términos comunes en español con vocabulario forestal. Los nombres base (mapas, especies, regiones, tipos de extracción) se editan en Ajustes → Catálogo, con varias confirmaciones.

## Reglas de descaste
- Genética alta (≥ 85 %) prohíbe descartar Jóvenes y Adultos.
- Hembras > 60 % de la manada: alerta de extraer 1 Hembra Adulta (la tabla marca el % en rojo; en alertas solo el símbolo ♀).
- Adulto 2★ nunca se descarta.
- Maduro 3★ requiere verificar con reclamo: genética < 70 % → descaste; ≥ 70 % → verificar con reclamo de baja genética. Verificar (📣) solo aplica a animales con duda y termina en «descastar» o «mantener». Marcar descastar implica que el reclamo dio genética baja (acudió). Verificar un Maduro 3★ cuenta para la genética.
- Animal de 5★: la alerta indica trofeo disponible.
- Manada llena: «Cerrada» con candado.
- Motivos de extracción: Descaste, Trofeo, Muerte natural, Control/Carne, Error/Accidente, Misión, Otro.

## Genética
- La genética de una pieza solo se ve al reclamarla: se introduce a mano al extraer.
- Modelo de **horquilla** (mínimo, más probable, máximo) por animal y manada; los Jóvenes no entran; unidad de cálculo = región + especie/hábitat. Escenarios pesimista/estimado/optimista.
- Con poca información el rango debe ser casi total (~20–100 %) aunque el pico se sitúe hacia el 50 %.
- Coto privado (C): genética mínima 50 %. Hábitat secundario: máximo limitado frente al principal.
- La tendencia (+x % / −x %) solo cambia con extracciones y revisiones, no al crear una manada nueva. En la celda: mínimo, máximo y variación; verde/rojo según signo.
- En pieza no controlada la estimación solo aplica si coinciden especie y hábitat.
- **(por validar)** el umbral ±1 punto del impacto genético en las fichas y la lista de nombres científicos (`SCI` en el código).

## Interfaz acordada
- Cabecera: título «Gestión de Población» (Anton), subtítulo pequeño; barra superior fija en tablet y móvil que se compacta al hacer scroll (logo circular de la montaña como botón de subir y menú ⋯). Botones superiores: Exportar, Importar, Ajustes, ayuda (iconos).
- Símbolos: vigilancia con el ojo nº 10; estados: Descaste = mira, Observar = ojo amarillo; borrar = papelera; todas las ventanas llevan aspa de cierre. Hover en todo lo clicable.
- Sin scroll lateral en ninguna tabla; «Ver todos» / «Ver tabla» para el listado completo; lo último añadido primero.
- Filtros agrupados en un botón «Filtros» con panel lateral y contador.
- Sin servicios de pago, sin claves secretas en el navegador, Exportar/Importar siempre disponibles.
