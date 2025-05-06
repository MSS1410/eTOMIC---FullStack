# ETOMIC---Back-2-Front-Javascript-
ETOMIC - ELECTRONIC TECHNO EVENTS

Este proyecto es una aplicación web para la gestión de eventos, que permite a los usuarios:

- Registrarse e iniciar sesión.

- Ver eventos futuros y pasados.

- Asistir a eventos y subir imágenes de eventos asistidos.

- Visualizar galerías de imágenes de eventos.

- Administrar (para usuarios con rol de admin) la publicación, actualización y eliminación de eventos, imágenes y flyers.


Tecnologías Utilizadas

  Backend:

- Node.js

- Express

- MongoDB y Mongoose

- JWT para autenticación

- Cloudinary para almacenamiento de imágenes


  Frontend:

- HTML5, CSS3 y JavaScript

- Swiper para sliders y galerías


INSTALACION

- CLONAR REPOSITORIO:

git clone : https://github.com/MSS1410/ETOMIC---Back-2-Front-Javascript-.git

cd: ETOMIC - ELECTRONIC TECHNO EVENTS

- DEPENDENCIAS (backend):

npm install

- CONFIGURAR VARIABLES DE ENTORNO

Crea un archivo .env en la raíz del proyecto y configura las siguientes variables: 

DB_URI=mongodb+srv://ETOMIC-ADMIN:etomicppp@etomic.lhaex.mongodb.net/?retryWrites=true&w=majority&appName=ETOMIC


SECRET_KEY = 7b1d5ff4baff9e9eeab0b8b056c332a4de46540d4825f1a7235052deecda3920

CLOUDINARY_CLOUD_NAME=dhmrsz0cw
CLOUDINARY_API_KEY=128234743916881
CLOUDINARY_API_SECRET=9OQEmUlLu9pMon8oNcX-uP62_Ho

PORT=3050

- EJECUTAR SERVIDOR

npm start



USO DEL PROYECTO (Interfaz Web)
Acceso a la Aplicación:

Abre el navegador y ve a http://localhost:3050 (o el puerto configurado). Se mostrará la página de login.

Credenciales de Prueba:

Para revisar la aplicación y ver funcionalidades específicas, inicia sesión con el siguiente usuario:

Email: pepepiloto@example.com

Contraseña: pepepiloto

REGISTER Y LOGIN:

Para registrarte, haz clic en "Sign Up".

Tras registrarte, la aplicación redirige a la vista de login, donde deberás iniciar sesión con tus credenciales.

NAVEGACION Y FUNCIONALIDADES:

Dashboard: Desde el menú principal puedes ver los eventos Upcoming, Attended y la Gallery.

Profile: Al hacer clic en "Profile" podrás ver y editar tus datos (nombre, email y foto de perfil).

EVENTOS:

Puedes ver el detalle de cada evento, ver flyers y subir imágenes (para eventos a los que hayas asistido).

GALERIA: La sección de Gallery muestra imágenes de eventos pasados.

Panel de Administración (Admin):

Los usuarios con rol de admin tienen acceso a funcionalidades adicionales como:

Publicar nuevos eventos.

Actualizar o eliminar eventos.

Subir flyers y gestionar imágenes de eventos.

(solamente desde insomnia o postman)


ESTRUCTURA DEL PROYECTO

/api: Contiene el backend (controladores, modelos, rutas y middlewares).

/public: Contiene el frontend (HTML, CSS y JavaScript).

/config: Configuraciones de Cloudinary y conexión a la base de datos.

/middlewares: Middlewares para autenticación y autorización.

/util: Utilidades (por ejemplo, funciones para JWT).


NOTAS:


- Este proyecto me ha llevado muchisimo tiempo. Siento que he aprendido mucho, a la vez que me he peleado como simio contra platano que no abre.
Siento que me ha quemado un poco y lo cojo con desgana, en mi opinion para que el proyecto sea completo faltaria generar:


- Posibilidad de comprar tickets +  una view para ver los tickets comprados.

- Posibilidad de marcar un evento como asistido desde el web.

- Posibilidad de crear y postear proyecto desde el web cuando el usuario es admin. ( editarlo también)

Aunque si sin estos 3 asuntos el proyecto queda como aprobado lo dejo y sigo avanzando.

- Sobre el requisito del register, que te mande directamente al login, bajo mi preferencia elegí volver al usuario al login después del sign Up, si es necesario lo modifico para que entre de una al dashboard.


PUNTOS QUE NO HE PODIDO SOLUCIONAR:

- Que todos los flyer respeten la medida de su contenedor.

- Evitar duplicidad de los eventos en gallery, una vez entro dentro de un evento en especifico y regreso al gallery, se limpia y recarga correctamente sin duplicidad.

-Generar el link correcto cuando, desde [attended event singular] deseo dirigirme a la gallery del evento con click en [event Gallery], comparte  direccion con el boton view Media, que si trabaja correctamente. 

-Estos 3 aspectos


