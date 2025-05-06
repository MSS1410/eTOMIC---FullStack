# API REST Files - Recetinhas

## Descripción

Este proyecto provee una API REST para gestionar **Recetas** (Recetinhas) y **Categorías**. Permite:

- **CRUD** completo para Recetas y Categorías.
- Relación entre Recetas y Categorías (cada Receta pertenece a una Categoría).
- Subida de imágenes a **Cloudinary**.
- Uso de **Mongoose** para manejar la base de datos **MongoDB**.
- Manejo de errores y middlewares personalizados.

---

## Tecnologías utilizadas

- **Node.js**
- **Express**
- **MongoDB** (Mongoose)
- **Cloudinary** (almacenamiento de imágenes)
- **dotenv** (manejo de variables de entorno)
- **multer** (subida de archivos)

---

## Requisitos previos

1. Tener instalado **Node.js** (versión 14 o superior).
2. Tener una cuenta de **Cloudinary** (para almacenar imágenes).
3. Tener un cluster de **MongoDB** o instalar **MongoDB localmente**.

---

## Instalación

### 1. Clonar el repositorio


 - git clone https://github.com/MI_USUARIO/MI_REPO.git

  
### 2. Entrar en el repositorio

  - cd API-REST-FILES


### 3. Instalar dependencias

npm install

### 4. Configurar variables entorno

- DB_URL=mongodb+srv://maarcsesa:3Vljn3gnGLH083Uw@cluster001recetas.hx8hy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster001RECETAS
PORT=3016
# pASSWORD:3Vljn3gnGLH083Uw
- CLOUDINARY_CLOUD_NAME=dhmrsz0cw
- CLOUDINARY_API_KEY=858156953687666
- CLOUDINARY_API_SECRET=U2FvOqoTU76LA8LmylZqCAIeFQo

  
### 4. Scripts disponibles

```json
{
  "scripts": {
    "start": "node index.js",
    "seed": "node src/utils/seeds/seedDataBase.js"
  }
}
```
- inicializar servidor:
  npm  start
- poblar base de datos
  npm run seed

 ### 5. Uso de la Api

 La API expone dos conjuntos de endpoints:

Recetinhas: prefijo /recetinhas

Categorías: prefijo /categorias

### Endpoints para Categorías
  
- GET /categorias
Devuelve todas las categorías.

Ejemplo de respuesta:
```json
[
  {
    "_id": "64791630a...",
    "tipo": "Postres",
    "img": "https://res.cloudinary.com/..."
  },
  ...
]
```

- POST /categorias
Crea una nueva categoría (puede incluir imagen).
Para subir la imagen, utiliza multipart/form-data con la clave img.

Body:
```json
{
  "tipo": "Postres"
}

```

- PUT /categorias/:id
 Actualiza una categoría por su id.

  ```json
  {
  "tipo": "Postres Actualizado"

- DELETE /categorias/:id
Elimina una categoría y, si existe, su imagen en Cloudinary.

###Endpoints para recetinhas

- GET /recetinhas
Devuelve todas las recetas. Incluye la información completa de la categoría mediante populate('categoria').

- POST /recetinhas
Crea una nueva receta.
Body de ejemplo:

```json
{
  "titulo": "Pizza Margarita",
  "descripcion": "Pizza con tomate, albahaca y mozzarella",
  "ingredientes": ["Tomate", "Mozzarella", "Albahaca"],
  "pasos": ["Preparar la masa", "Agregar ingredientes", "Hornear"],
  "categoria": "ID_de_una_categoria"
}
```
Puedes incluir una imagen utilizando multipart/form-data con la clave img.

- PUT /recetinhas/:id
Actualiza una receta por su id. Se pueden actualizar campos como titulo, descripcion, ingredientes, pasos y la imagen (img).

- DELETE /recetinhas/:id
Elimina la receta y su imagen asociada en Cloudinary.



### Cómo probar la API

- Usa herramientas como Postman, Insomnia o Thunder Client (extensión de VSCode) para realizar peticiones HTTP a los endpoints.

- Para subir imágenes, asegúrate de configurar la petición como multipart/form-data y utiliza el campo img para enviar el archivo.

- Verifica las respuestas y asegúrate de que los datos se están almacenando en MongoDB y las imágenes en Cloudinary.


### Estructura del proyecto
```bash
API-REST-FILES
│
├── .env
├── package.json
├── index.js
├── README.md
│
├── src
│   ├── api
│   │   ├── controllers
│   │   │   ├── categorias.js
│   │   │   └── recetinha.js
│   │   ├── models
│   │   │   ├── categorias.js
│   │   │   └── recetinha.js
│   │   └── routes
│   │       ├── categorias.js
│   │       └── recetinha.js
│   │
│   ├── config
│   │   ├── db.js
│   │   └── cloudinary.js
│   │
│   ├── middlewares
│   │   └── file.js
│   │
│   └── utils
│       ├── utils.js
│       └── seeds
│           └── seedDataBase.js
│
└── data
    └── seedData.js

```



