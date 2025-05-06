# eTOMIC FullStack

> Monorepo que integra el frontend y backend de la aplicación **eTOMIC**.

## 🚀 Tabla de Contenidos

1. [Resumen del Proyecto](#resumen-del-proyecto)
2. [Características Principales](#características-principales)
3. [Tecnologías](#tecnologías)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Prerrequisitos](#prerrequisitos)
6. [Instalación y Configuración](#instalación-y-configuración)

   * [Clonar el Repositorio](#clonar-el-repositorio)
   * [Configurar Backend](#configurar-backend)
   * [Configurar Frontend](#configurar-frontend)
7. [Variables de Entorno](#variables-de-entorno)
8. [Ejecutar la Aplicación](#ejecutar-la-aplicación)
9. [Documentación de la API](#documentación-de-la-api)
10. [Base de Datos y Modelos](#base-de-datos-y-modelos)
11. [Scripts Disponibles](#scripts-disponibles)
12. [Despliegue](#despliegue)
13. [Contribuciones](#contribuciones)
14. [Licencia](#licencia)
15. [Autor](#autor)

---

## 📋 Resumen del Proyecto

**eTOMIC** es una aplicación fullstack que permite a los usuarios interactuar con \[descripción breve de la funcionalidad principal: por ejemplo, subir eventos, gestionar perfiles, etc.].

* El **Frontend** ofrece una interfaz de usuario responsiva y ligera.
* El **Backend** expone una API REST protegida mediante JWT y gestiona la lógica de negocio y la persistencia de datos.

---

## ✨ Características Principales

* Registro e inicio de sesión de usuarios.
* Gestión de perfiles de usuario (carga de avatar, edición de datos).
* CRUD completo sobre \[entidad principal, por ejemplo: eventos, posts, productos].
* Autenticación y autorización con tokens JWT.
* Validación de datos y manejo de errores centralizado.
* CORS configurado para consumo desde el frontend.

---

## 🛠 Tecnologías

* **Frontend**: HTML5, CSS3 (Flexbox, Grid), JavaScript (ES6+).
* **Backend**: Node.js, Express.
* **Base de datos**: MongoDB (Mongoose) / MySQL (Sequelize) / PostgreSQL (pg).
* **Autenticación**: JSON Web Tokens (jsonwebtoken).
* **Variables de entorno**: dotenv.
* **Herramientas de desarrollo**: nodemon, ESLint, Prettier.

---

## 📁 Estructura del Proyecto

```
eTOMIC---FullStack/
├── frontend/        
│   ├── css/      
│   ├── js/
|   ├── index.html/         
│   ├── package.json 
│   └── package.json.lock
│   └── 
└── backend/          # Servidor (API)
    ├── controllers/  # Lógica de petición/respuesta
    ├── models/       # Modelos de datos (Mongoose/ORM)
    ├── config/    
    ├── routes/       # Definición de endpoints
    ├── middlewares/  # Middlewares personalizados
    ├── utils/        # Funciones auxiliares
    ├── server.js     # Punto de entrada del servidor
    ├── package.json  # Dependencias y scripts back
    └── package.json.lock
```

---



---

## 🔧 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/MSS1410/eTOMIC---FullStack.git
cd eTOMIC---FullStack
```

### 2. Configurar el Backend

```bash
cd backend
npm install             
cp .env.example .env      # crear archivo de variables de entorno
```

Completa las variables en `.env` según tu entorno (ver [Variables de Entorno](#variables-de-entorno)).

### 3. Configurar el Frontend

```bash
cd ../frontend
npm install               # o yarn install
```

---

🔑 Variables de Entorno

En backend/.env define las siguientes variables de entorno:

```
DB_URI="mongodb+srv://ETOMIC-ADMIN:etomicppp@etomic.lhaex.mongodb.net/?retryWrites=true&w=majority&appName=ETOMIC"
SECRET_KEY="7b1d5ff4baff9e9eeab0b8b056c332a4de46540d4825f1a7235052deecda3920"
CLOUDINARY_CLOUD_NAME="dhmrsz0cw"
CLOUDINARY_API_KEY="128234743916881"
CLOUDINARY_API_SECRET="9OQEmUlLu9pMon8oNcX-uP62_Ho"
PORT=3066
```

---

## ▶️ Ejecutar la Aplicación

### Backend

```bash
cd backend
          
  npm  run start           
```

Servidor escuchando en `http://localhost:${PORT}`.

### Frontend

- VS Code (Live Server)

- Abre frontend/index.html en VS Code.

- Haz clic derecho en el editor y selecciona "Open with Live Server".

- Se abrirá automáticamente en el navegador con recarga en vivo.

 Abre el navegador en `http://localhost:5173` (o el puerto que muestre la consola).

---

## 📑 Documentación de la API

## 📑 Documentación de la API

| Método | Ruta                   | Descripción                                         |
| ------ | ---------------------- | --------------------------------------------------- |
| POST   | `/api/auth/register`   | Registrar un nuevo usuario                          |
| POST   | `/api/auth/login`      | Iniciar sesión y obtener un token JWT               |
| GET    | `/api/users`           | Listar todos los usuarios (requiere autenticación)   |
| GET    | `/api/users/:id`       | Obtener detalle de un usuario por su ID             |
| PUT    | `/api/users/:id`       | Actualizar datos de un usuario por su ID            |
| DELETE | `/api/users/:id`       | Eliminar un usuario por su ID                       |
| GET    | `/api/items`           | Listar todos los ítems (requiere autenticación)      |
| GET    | `/api/items/:id`       | Obtener detalle de un ítem por su ID                |
| POST   | `/api/items`           | Crear un nuevo ítem                                 |
| PUT    | `/api/items/:id`       | Actualizar un ítem existente por su ID              |
| DELETE | `/api/items/:id`       | Eliminar un ítem existente por su ID                |




---

## 🗄 Base de Datos y Modelos

Ejemplo de modelo `User` (Mongoose):

```js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
```

Añade aquí una breve descripción de cada modelo que uses.

---

## 📜 Scripts Disponibles

### Backend (`backend/package.json`)

* `npm run dev` - Inicia servidor con nodemon
* `npm run start` - Inicia servidor en modo producción


### Frontend (`frontend/package.json`)

* "Live Start"
---

## ☁️ Despliegue

1. **Backend**: despliega en Heroku, Vercel, AWS, DigitalOcean o plataforma de tu elección.
2. **Frontend**: puedes hospedar en Netlify, Vercel, GitHub Pages o servirlo desde tu backend.
3. Establece las variables de entorno en tu plataforma.

---



## 👤 Autor

* **MSS1410** - [GitHub](https://github.com/MSS1410)

---

