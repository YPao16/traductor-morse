# Traductor Morse

Aplicación web para traducir texto a código Morse y código Morse a texto. Está construida con ECMAScript, Webpack y Babel.

## Ejecutar en Visual Studio Code

1. Abre la carpeta `traductor-morse` en Visual Studio Code.
2. Abre una terminal integrada y ejecuta `npm install` si aún no están instaladas las dependencias.
3. Ejecuta `npm run build` para compilar el proyecto. Webpack genera la página lista para publicar en `dist`.
4. Para probarla en el navegador, abre `dist/index.html` con la extensión Live Server de Visual Studio Code.

Mientras editas, puedes ejecutar `npm run dev` para recompilar automáticamente al guardar cambios. Después de compilar, vuelve a cargar la página.

## Publicar el proyecto

Publica el contenido de la carpeta `dist` en un servicio de alojamiento de sitios estáticos, por ejemplo Netlify, Cloudflare Pages o GitHub Pages. Cada vez que cambies el código, vuelve a ejecutar `npm run build` y publica de nuevo `dist`.

## Uso

- Pulsa el selector para cambiar entre **Texto → Morse** y **Morse → Texto**.
- En el modo texto, escribe letras, números o signos de puntuación admitidos. Las vocales acentuadas se normalizan y la `ñ` se conserva.
- En Morse, separa las letras con espacios y las palabras con `/` o tres espacios.
- Si el contenido está vacío o tiene caracteres/códigos no admitidos, la aplicación muestra un mensaje de validación.

El mapa de equivalencias y las conversiones están en `src/index.js`; la estructura accesible de la página está en `src/index.html`; los estilos adaptables están en `src/style.css`; y las reglas de compilación están en `webpack.config.js`.
