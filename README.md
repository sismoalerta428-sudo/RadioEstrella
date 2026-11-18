# ⭐ Radio Estrella

Radio por internet con DJ automático. Los oyentes escuchan y piden canciones; tú manejas todo desde un panel privado.

```
index.html        → la radio (lo que ven los oyentes)
admin/index.html  → panel del DJ (solo administradores)
manifest.json, sw.js, *.png → para instalarla como aplicación en el celular
```

## Cómo publicarla en GitHub Pages (gratis, con https)

1. Entra a **github.com** y crea una cuenta (o inicia sesión).
2. Toca **New repository**. Nombre: `radio-estrella`. Déjalo **Public**. Crea el repositorio.
3. Toca **uploading an existing file** (o *Add file → Upload files*).
4. Arrastra **todo lo que hay dentro de la carpeta** `radio-estrella` (incluida la carpeta `admin`). El archivo `.nojekyll` también.
5. Abajo toca **Commit changes**.
6. Ve a **Settings → Pages**. En *Build and deployment*: **Deploy from a branch**, rama **main**, carpeta **/ (root)**. Guarda.
7. Espera 1 o 2 minutos. Tu radio quedará en:
   - Radio: `https://TU-USUARIO.github.io/radio-estrella/`
   - Panel del DJ: `https://TU-USUARIO.github.io/radio-estrella/admin/`

## Para actualizar
Entra al archivo en GitHub → ✏️ *Edit* → pega el contenido nuevo → *Commit changes*. En 1 o 2 minutos se actualiza.

## Seguridad (importante)
- La clave `sb_publishable_...` que está en los archivos **es pública a propósito**: puede verse sin problema.
- **Nunca** subas a GitHub la clave `service_role` de Supabase ni la `YOUTUBE_API_KEY`. Esas viven solo en Supabase (Edge Functions → Secrets).
- El panel `/admin/` es público como dirección, pero solo entran los correos que están en la tabla `admins` de Supabase y con un código que llega al correo.

## Música y créditos
- Música libre de respaldo: Kevin MacLeod (incompetech.com), licencia CC BY 4.0.

## ¿Prefieres Cloudflare Pages? (el enlace no cambia)
1. En Cloudflare entra a **Workers & Pages** y crea una aplicación **Pages**.
2. Elige **Connect to Git** y selecciona tu repositorio `radio-estrella`.
3. Sin comando de compilación y con carpeta de salida `/`. Guarda y despliega.
4. Tu enlace principal será `nombre-del-proyecto.pages.dev` y **no cambia**: cada cambio que subas a GitHub lo actualiza.
   - Si subes los archivos arrastrándolos (sin GitHub), entra siempre al **mismo proyecto** y elige **Create a new deployment**. No crees un proyecto nuevo cada vez.
   - Para un enlace propio y permanente, conecta un dominio en la sección *Custom domains*.

## Qué hace el cerebro (en Supabase)
- La radio avanza sola, 24 horas, aunque no haya oyentes (tareas programadas en Supabase). Al abrirla entras en el punto real de la canción.
- Mezcla los estilos poco a poco: se queda 2-3 canciones y luego pasa a un estilo vecino durante 6 canciones.
- Una canción pedida define el ambiente: después suenan canciones parecidas.
- Una canción no suena más de 2 veces en 24 horas.
- Efectos de DJ (horario de fiesta): se cambian en `index.html` (`DROP_FROM`, `DROP_TO`, `DROP_EVERY`).
