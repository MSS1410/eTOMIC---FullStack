# API REST Files - Recetinhas

## Descripción
Esta es una API REST para gestionar recetas (**Recetinhas**) y categorías de recetas (**Categorias**). Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) tanto para recetas como para sus categorías asociadas.

---

## Características principales

- **CRUD completo para recetas y categorías**.
- Relación entre recetas y categorías.
- Uso de **Cloudinary** para gestión de imágenes.
- Manejo de errores controlado.
- Middleware para rutas inexistentes y errores globales.

---

## Tecnologías utilizadas

- **Node.js**
- **Express**
- **MongoDB** (con Mongoose)
- **Cloudinary** (almacenamiento de imágenes)
- **dotenv** (manejo de variables de entorno)

---

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/MSS1410/RECETAS-APIFILES.git


1. Ve al directorio del proyecto:
cd API REST FILES

1. Instala las dependencias:
    ```bash
    npm install


1. Configura las variables de entorno:
 Crea un archivo .env en la raíz del proyecto.
Añade las siguientes variables:


   ```bash
   DB_URL=mongodb+srv://maarcsesa:3Vljn3gnGLH083Uw@cluster001recetas.hx8hy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster001RECETAS
   PORT=3014
   CLOUDINARY_CLOUD_NAME=dhmrsz0cw
   CLOUDINARY_API_KEY=858156953687666
   CLOUDINARY_API_SECRET=U2FvOqoTU76LA8LmylZqCAIeFQo


## Uso
Iniciar el servidor:

    npm start
    
## Endpoints principales
   > Categorías
   
  - Obtener todas las categoría:
  GET /categorias
```
[
  {
    "_id": "<id>",
    "nombre": "<nombre>",
    "img": "<url_de_imagen>"
  }
]

````

 - Crear una categoría:
  POST /categorias
 ```
 {
  "nombre": "<nombre>",
  "img": "<ruta_de_imagen>"
}

````

-   Crear una categoría:
-   PUT /categorias/:id
  ```
  {
  "nombre": "<nombre_actualizado>",
  "img": "<ruta_de_nueva_imagen>"
}
````

- Eliminar una categoría
DELETE /categorias/:id

>Recetas

- Obtener todas las recetas
GET /recetinhas
````
[
  {
    "_id": "<id>",
    "nombre": "<nombre>",
    "categoria": {
      "_id": "<id_categoria>",
      "nombre": "<nombre_categoria>"
    },
    "img": "<url_de_imagen>"
  }
]

````
- Crear una receta
POST /recetinhas
````
{
  "nombre": "<nombre>",
  "categoria": "<id_categoria>",
  "img": "<ruta_de_imagen>"
}

````
- Actualizar una receta
PUT /recetinhas/:id
````
{
  "nombre": "<nombre_actualizado>",
  "categoria": "<id_categoria_actualizada>",
  "img": "<ruta_de_nueva_imagen>"
}
````

- Eliminar una receta
DELETE /recetinhas/:id

