# Manual de estilo · Gestión de Población · Way of the Hunter

v1.1 (20-oct-2026; decisiones cerradas y aplicadas en f5t/f5u). Cada punto indica si es **EXISTE** (ya está en el código) o **PROPUESTA** (por validar). Nada de esto cambia la app hasta que se migre por tandas.

## 1. Identidad
Verde bosque + cobre + crema. Tono sobrio de cuaderno de campo: superficies verdes oscuras, un único acento cálido (cobre) y texto crema. Un solo acento: lo que es cobre es "interactivo, seleccionado o importante".

## 2. Color

### Base (EXISTE)
| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--bg` | #f3f5f3 | #121a15 | Fondo de página |
| `--card` | #fff | #1b2620 | Tarjetas y filas |
| `--tx` | #1d2a23 | #e6eee9 | Texto |
| `--mu` | #667 | #9aa9a0 | Texto secundario |
| `--br` | #dde3df | #2c3b33 | Bordes |
| `--dk` | #1b3b2b | (igual) | Cabecera, `th` |
| `--md` | #2c5e43 | (igual) | Botón primario, títulos de tarjeta |
| `--or` | #c9803a | (igual) | Acento cobre |

### Superficies flotantes «musgo» (EXISTE, en `#fo #st #dg #hp #hl #fd #fa`)
Fondo de ventana #1d2a21, texto #f3eee0, secundario #b2b9a4, borde rgba(244,239,224,.16), campos #18241b, velo rgba(8,14,10,.66), títulos y botón primario en cobre.

### Ficha al tocar una fila (EXISTE)
Fondo #1f3d2e, texto crema #f3ecdc, acento cobre #c9803a, secundario #b8c7bc.

### Semánticos
| Rol | Existe hoy (disperso) | PROPUESTA única |
|---|---|---|
| Correcto | #2c8a52, #1f7a45, #d5ebdd | texto #1f7a45 · icono #2c8a52 · fondo `--ok` |
| Aviso | #e67e22, #a8651f, #fce8c8 | texto #a8651f · icono #e67e22 |
| Peligro | #b03a12, #8f2f0d, #8f2e0c, #c0392b | texto/borde #b03a12 · icono #c0392b · fondo `--bad` |
| Verificar | #5b2a86, #e6d9f5 | se mantiene (único uso: reclamo) |
| Editar | azul #1f5fa8 | **DECIDIDO:** azul-verdoso `--edit` #17696a (oscuro #7fd0c8), fondo `--edit-bg`, borde `--edit-br`. El mismo en TODOS los botones de editar (fila, ficha, barra de selección, panel). Distinto del verde `--md` (sólido) y del cobre |
| Sexo ♂/♀ en fichas | #7cc2ea / #f0a1c4 | se mantienen, solo como dato |

### Reglas
- Crema único: #f3ecdc (**aplicado**: #f4efe0 eliminado).
- Texto oscuro único: #1d2a23 / `--tx` (**aplicado**: #1d2a22 como color de texto eliminado). Rojo oscuro único #8f2f0d (**aplicado**).
- Prohibido un hex nuevo en componentes: se usa token o se añade aquí primero.

## 3. Tipografía
- Cuerpo: Segoe UI / system-ui, 14 px (EXISTE).
- Títulos de marca (h1): Oswald/Anton incrustadas, mayúsculas, tracking .06em. **APLICADO (f5u):** `Barlow Condensed` eliminada de las pilas (no estaba incrustada).
- **APLICADO (f5t), escala ampliada:** 11 etiqueta · 12 compacto · 13 secundario · 14 base · 15 · 16 destacado · 18 · 20 · 22 · 26/30 cifras y marca. Se han eliminado los medios píxeles y los atípicos (11,5→11; 12,5→13; 13,5→14; 14,5→15; 17→16; 19→20). Los 12 y 15 se mantienen porque hay 36 y 24 usos y moverlos habría roto filas compactas. Micro-etiquetas de 8, 9,5 y 10 sin tocar.

## 4. Forma y espacio
- **APLICADO (f5t) radios:** **6** casillas y chips pequeños · **10** botones, campos, tarjetas, filas · **14** ventanas y hojas · **999/50%** píldoras y botones circulares. Movidos: 7→6, 8/9/12→10, 16→14 (solo valores simples). Sin tocar: 2 y 5 (barras mini), 99, 20 y los radios con varios valores.
- Espaciado **PROPUESTA**: 4 · 8 · 12 · 16 · 24.
- Sombras: flotante 0 10px 40px rgba(0,0,0,.45); menú +: 0 3px 12px rgba(0,0,0,.3) (EXISTE).
- Táctil: objetivo mínimo 40 px de alto en móvil (EXISTE en filas y acciones).

## 5. Capas (z-index)
**Decisión ajustada:** NO se colapsan a 6 niveles. Hay ventanas que se abren unas sobre otras (#hp 20 · #hl 25 · #fo 30 · #st 35 · #fdo 37 · #fd 38 · #ts 40 · #dg 50 · #nbi 60 · #sw 70 · #lg 300; fichas .mxsc 40 / .mxsh 41 / .mxpop 60; botón + 26, menú 27, #va 28), y unirlas rompería ese orden. Se conservan y quedan documentadas aquí. Los tokens `--z-*` sirven para lo NUEVO; todo nuevo se coloca respecto a esta tabla.

## 6. Componentes

**Botón primario** (EXISTE): fondo `--md` y texto blanco; en ventanas musgo, cobre.
**Botón neutro `.g`** (EXISTE): fondo tarjeta, borde `--br`.
**Botón de acción en fila** (`.be` / `.bd`): editar y eliminar con icono. **APLICADO (f5t):** TODO «Editar» (fila de tabla, panel de manada, barra de selección y ficha) usa `--edit` azul-verdoso; el hover usa `--edit-hv`. Eliminar queda en rojo como estaba. En ventanas y fichas oscuras (`#fo #st #dg #hp #hl #fd #fa .mxsh`) los tokens `--edit*` toman siempre su valor claro-sobre-oscuro.
**Selector `.qb`** (EXISTE): rectángulos de elección; activo `.on` en cobre; deshabilitado atenuado.
**Botón circular `.mxb1`, `.mxi`** (EXISTE): iconos en fichas y barra de selección.
**Botón flotante +** (EXISTE): arco de 3 botones circulares. Nombre de acción coherente con el botón de la tabla: «Registrar extracción».
**Hover y foco** (EXISTE): cobre con fondo rgba(201,128,58,.16). Sin cobre no hay interacción.
**Chip/píldora `.p`** (EXISTE): estado con fondo suave y texto del mismo tono.
**Fila `.mxr`** (EXISTE): dos alturas, mínimo 56 px, seleccionada con anillo cobre.
**Ficha** (EXISTE): hoja inferior en móvil, centrada en ancho; datos clave-valor, acciones abajo.
**Ventana** (EXISTE): musgo, título cobre en mayúsculas **sin emoticono** (criterio f5u: ninguna ventana de alta lleva símbolo), campos oscuros, barra de botones abajo a la derecha.
**Iconos** (EXISTE): glifos ✂ ✎ 🗑 📣… que la app convierte en SVG (`.ic`). En JS que lea botones, usar `innerHTML`, nunca `textContent`.

## 7. Reglas para añadir algo nuevo
1. Elegir primero el componente de la sección 6. Si no existe, se define aquí antes de programarlo.
2. Solo tokens de color; sin hex nuevos.
3. Solo radios y tamaños de las escalas.
4. Mismo comportamiento en claro/oscuro, ancho y estrecho.
5. Iconos como glifo del mapa `ICM` o SVG `.ic`, nunca imagen.
6. Cualquier CSS nuevo va en un bloque con comentario de versión al final de la hoja.

## 8. Decisiones (cerradas)
1. Editar unificado en azul-verdoso `--edit`, igual en toda la app. **Aplicado.**
2. Musgo: tokens `--moss` (ventanas) y `--moss-ficha` (fichas) con sus valores actuales. Unificar los valores cambiaría el aspecto de las fichas: queda abierto y opcional.
3. Radios 6/10/14/999. **Aplicado.**
4. Texto: escala ampliada (sección 3), porque 12 y 15 px tienen muchos usos. **Aplicado, ajustado.**
5. Sin Barlow Condensed en el h1. **Aplicado.**
6. Capas: se conservan las vigentes (sección 5). **Ajustado.**
Condición: homogeneizar sin romper ningún diseño existente. Al migrar, cada valor suelto se lleva al token **más cercano**; si el cambio visual sería notable, se consulta antes.

## 9. Estado de la migración
- **Tanda 2 (f5s):** tokens declarados.
- **Tanda 3 – botones (f5t):** Editar unificado en 4 sitios; Eliminar sin cambios.
- **Tanda 4 – ventanas y fichas (f5t):** `--moss` y `--moss-ficha` como tokens; musgo de ventanas usa `--moss` (mismo valor); ficha mantiene #1f3d2e; radio #fd 16→14.
- **Tanda 5 – filas, chips, tarjetas (f5t):** radios a la escala.
- **Tanda 6 – capas y texto (f5t):** texto a la escala ampliada; capas conservadas (ver sección 5).
- **f5u:** sin emoticono en títulos de ventana, % de la curva de Manadas +1 pt (`.mmbell .gchart-range` 12–14 px, `.gchart-delta` 13–15 px), Barlow fuera.
Tandas 2 a 6 probadas por el autor en f5t; f5u pendiente de prueba real. Versión solo por la caché de `sw.js` (`woth-1.1.0`).
