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
