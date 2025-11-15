# Tech Advisor - Sistema de Recomendación de Computadores

Sistema web profesional para recomendar computadores basado en las necesidades del usuario, utilizando **Inteligencia Artificial (Google Gemini)** para generar especificaciones técnicas personalizadas.

## 🚀 Características

- **Autenticación JWT** - Login y registro seguros
- **IA con Google Gemini** - Recomendaciones personalizadas
- **Panel de Administración** - Estadísticas y gestión de usuarios
- **API REST** - Backend con Node.js + Express
- **Base de Datos PostgreSQL** - Almacenamiento robusto
- **Frontend React** - Interfaz moderna y responsive
- **Tailwind CSS** - Diseño profesional

## 📋 Prerequisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) v16 o superior
- [PostgreSQL](https://www.postgresql.org/) v12 o superior
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- Una API Key de [Google Gemini](https://makersuite.google.com/app/apikey)

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
cd tech-advisor-pro
```

### 2. Configurar Backend

```bash
cd backend
npm install
```

### 3. Configurar Variables de Entorno

Copia el archivo `.env.example` y renómbralo a `.env`:

```bash
cp .env.example .env
```

Edita el archivo `.env` y configura tus credenciales:

```env
# Servidor
PORT=5000
NODE_ENV=development

# Base de Datos PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tech_advisor
DB_USER=postgres
DB_PASSWORD=tu_password

# JWT
JWT_SECRET=genera_un_secret_seguro_aqui
JWT_EXPIRE=7d

# Google Gemini AI
GEMINI_API_KEY=tu_api_key_de_gemini

# CORS
CORS_ORIGIN=http://localhost:5173
```

### 4. Crear la Base de Datos

Conéctate a PostgreSQL y crea la base de datos:

```bash
psql -U postgres
```

```sql
CREATE DATABASE tech_advisor;
\q
```

### 5. Poblar la Base de Datos

Ejecuta el script de seed para crear el usuario admin y los computadores:

```bash
npm run seed
```

Esto creará:
- **Usuario Admin**: admin@techadvisor.cl / admin123
- **12 computadores** de ejemplo

### 6. Iniciar el Servidor Backend

```bash
npm run dev
```

El servidor estará corriendo en: `http://localhost:5000`

## 📁 Estructura del Proyecto

```
tech-advisor-pro/
├── backend/
│   ├── config/
│   │   └── database.js          # Configuración de Sequelize
│   ├── controllers/
│   │   ├── authController.js    # Login, registro, perfil
│   │   ├── consultationController.js  # Consultas y recomendaciones
│   │   └── adminController.js   # Panel de administración
│   ├── middleware/
│   │   ├── auth.js             # Protección JWT
│   │   └── errorHandler.js     # Manejo de errores
│   ├── models/
│   │   ├── User.js             # Modelo de usuarios
│   │   ├── Computer.js         # Modelo de computadores
│   │   ├── Consultation.js     # Modelo de consultas
│   │   └── index.js            # Exportador de modelos
│   ├── routes/
│   │   ├── authRoutes.js       # Rutas de autenticación
│   │   ├── consultationRoutes.js  # Rutas de consultas
│   │   └── adminRoutes.js      # Rutas de admin
│   ├── services/
│   │   └── geminiService.js    # Integración con Gemini AI
│   ├── utils/
│   │   └── seed.js             # Script de seed
│   ├── .env.example            # Template de variables de entorno
│   ├── server.js               # Punto de entrada
│   └── package.json
├── frontend/                    # (Por configurar)
├── .gitignore
└── README.md
```

## 🔑 API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Registrar usuario | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| GET | `/api/auth/me` | Obtener perfil | Sí |

### Consultas

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/consultations` | Crear consulta y obtener recomendaciones | Sí |
| GET | `/api/consultations` | Obtener mis consultas | Sí |
| GET | `/api/consultations/:id` | Obtener consulta por ID | Sí |

### Administración

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/stats` | Estadísticas del sistema | Admin |
| GET | `/api/admin/users` | Listar todos los usuarios | Admin |
| DELETE | `/api/admin/users/:id` | Eliminar usuario | Admin |
| GET | `/api/admin/consultations` | Todas las consultas | Admin |
| GET | `/api/admin/computers` | Todos los computadores | Admin |

## 📝 Ejemplos de Uso

### Registrar Usuario

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123"
  }'
```

### Iniciar Sesión

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@techadvisor.cl",
    "password": "admin123"
  }'
```

### Crear Consulta (requiere token)

```bash
curl -X POST http://localhost:5000/api/consultations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "use": "gaming",
    "performance": "alto",
    "budget": 1500000,
    "portability": "laptop",
    "programs": "Fortnite, Cyberpunk 2077"
  }'
```

## 🎨 Configuración del Frontend (Siguiente Paso)

El frontend en React se configurará a continuación con:
- React + Vite
- React Router v6
- Axios
- Tailwind CSS
- Context API para autenticación

## 🔒 Seguridad

- **Contraseñas hasheadas** con bcryptjs (salt de 10 rounds)
- **JWT** para autenticación stateless
- **Validación** de datos en backend
- **CORS** configurado
- **Middleware** de protección de rutas
- **Variables de entorno** para datos sensibles

## 🧪 Testing

```bash
# Ejecutar tests (próximamente)
npm test
```

## 🚢 Despliegue

### Backend (Render, Railway, Heroku)

1. Crea una base de datos PostgreSQL en el servicio cloud
2. Configura las variables de entorno
3. Ejecuta `npm run seed` en producción
4. Despliega el código

### Frontend (Vercel, Netlify)

1. Construye el proyecto: `npm run build`
2. Configura la variable de entorno `VITE_API_URL`
3. Despliega la carpeta `dist`

## 📚 Stack Tecnológico

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **PostgreSQL** - Base de datos relacional
- **Sequelize** - ORM para PostgreSQL
- **JWT** - Autenticación
- **bcryptjs** - Hash de contraseñas
- **Google Gemini AI** - Inteligencia artificial

### Frontend (Próximamente)
- **React** - Librería de UI
- **Vite** - Build tool
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Framework CSS

## 👥 Credenciales de Demo

- **Admin**: admin@techadvisor.cl / admin123

## 📄 Licencia

MIT

## 👨‍💻 Autor

Grupo 19