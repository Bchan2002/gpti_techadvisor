# 🚀 Guía de Deployment en Render

Esta guía te ayudará a desplegar Tech Advisor en Render de forma gratuita.

## Requisitos Previos

1. Cuenta en [Render.com](https://render.com) (puedes registrarte con GitHub)
2. Tu código subido a GitHub (ya lo tienes en: https://github.com/Bchan2002/gpti_techadvisor)
3. Tu API KEY de Google Gemini

---

## Paso 1: Crear la Base de Datos PostgreSQL

1. Ve a tu [Dashboard de Render](https://dashboard.render.com/)
2. Click en **"New +"** → **"PostgreSQL"**
3. Configura:
   - **Name**: `tech-advisor-db`
   - **Database**: `tech_advisor`
   - **User**: `tech_advisor_user`
   - **Region**: Elige la más cercana a Chile (US West - Oregon)
   - **Plan**: **Free** (expira en 90 días, pero puedes renovar)
4. Click **"Create Database"**
5. **IMPORTANTE**: Copia la **Internal Database URL** (la necesitarás después)

---

## Paso 2: Desplegar el Backend

1. En Render Dashboard, click **"New +"** → **"Web Service"**
2. Conecta tu repositorio de GitHub: `Bchan2002/gpti_techadvisor`
3. Configura el servicio:
   - **Name**: `tech-advisor-backend`
   - **Region**: Misma que la base de datos
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run seed`
   - **Start Command**: `npm start`
   - **Plan**: **Free**

4. Click **"Advanced"** y agrega estas **Environment Variables**:

   ```
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=[Pega aquí la Internal Database URL del Paso 1]
   JWT_SECRET=[Genera un secreto aleatorio, ej: tu_secreto_super_seguro_12345]
   GEMINI_API_KEY=[Tu API Key de Google Gemini]
   ```

5. Click **"Create Web Service"**
6. Espera a que termine el deployment (puede tardar 5-10 min)
7. **IMPORTANTE**: Copia la URL del backend (ej: `https://tech-advisor-backend.onrender.com`)

---

## Paso 3: Desplegar el Frontend

1. En Render Dashboard, click **"New +"** → **"Static Site"**
2. Conecta el mismo repositorio: `Bchan2002/gpti_techadvisor`
3. Configura:
   - **Name**: `tech-advisor-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. Click **"Advanced"** y agrega esta **Environment Variable**:

   ```
   VITE_API_URL=[URL del backend del Paso 2]/api
   ```
   
   Ejemplo: `https://tech-advisor-backend.onrender.com/api`

5. Click **"Create Static Site"**
6. Espera a que termine el deployment

---

## Paso 4: Inicializar la Base de Datos

Después de que el backend esté desplegado:

1. Ve a tu backend service en Render
2. Click en la pestaña **"Shell"**
3. Ejecuta estos comandos:

   ```bash
   npm run seed
   ```

Esto creará:
- El usuario administrador (admin@techadvisor.cl / admin123)
- 41 computadores de ejemplo

---

## 🎉 ¡Listo!

Tu aplicación está desplegada en:
- **Frontend**: `https://tech-advisor-frontend.onrender.com`
- **Backend**: `https://tech-advisor-backend.onrender.com`

### Credenciales de Acceso:
- **Email**: admin@techadvisor.cl
- **Password**: admin123

---

## ⚠️ Limitaciones del Plan Gratuito

- **Backend**: Se "duerme" después de 15 minutos de inactividad. La primera petición puede tardar 30-60 segundos.
- **Base de Datos**: Expira después de 90 días. Puedes crear una nueva y migrar los datos.
- **Frontend**: Sin limitaciones, siempre rápido.

---

## 🔧 Actualizar la Aplicación

Cada vez que hagas `git push` a GitHub, Render automáticamente re-desplegará tu aplicación.

---

## 💡 Tips

1. **CORS**: El backend ya está configurado para aceptar peticiones del frontend en Render
2. **Variables de Entorno**: Nunca subas el archivo `.env` a GitHub
3. **Base de Datos**: Haz backups periódicos antes de que expire
4. **Monitoreo**: Usa la pestaña "Logs" en Render para ver errores

---

## 🆘 Troubleshooting

### Error: "Cannot connect to database"
- Verifica que la `DATABASE_URL` esté correctamente configurada
- Asegúrate de usar la **Internal Database URL**, no la External

### Error: "GEMINI_API_KEY not found"
- Verifica que la variable de entorno esté configurada en el backend

### Frontend no conecta con Backend
- Verifica que `VITE_API_URL` apunte a la URL correcta del backend
- Debe terminar con `/api`

---

¿Necesitas ayuda? Revisa los logs en Render o contacta con el equipo de desarrollo.
