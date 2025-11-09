## 💻 Instrucciones para Ejecutar la Aplicación Localmente

Sigue estos pasos para levantar el servidor y la aplicación de React.

### 1. Prerrequisitos

Asegúrate de tener instalado:

* **Node.js** (versión LTS recomendada)
* **npm** (viene con Node.js)
* **Git**

### 2. Clonar el Repositorio

Clona el repositorio en tu máquina local este repositorio.

### 3. Instalar las dependencias.
Claro, aquí tienes el contenido para tu README.md con las instrucciones solicitadas para levantar el servidor y el frontend.

Markdown

# 🚀 Challenge de Ingreso a Academia ForIT 2025: Aplicación de Lista de Tareas

Este proyecto es la solución al desafío de ingreso a la Academia ForIT 2025, cuyo objetivo es crear una **aplicación básica de lista de tareas (To-Do List)**, demostrando conocimientos fundamentales de **Git, JavaScript, Node.js (Express) y React**.

---

## 📋 Requisitos Implementados

* **Estructura de Directorios:** Contiene carpetas separadas para el `backend` (servidor Express) y el `frontend` (aplicación React con Vite).
* **Backend (Express):** Servidor básico implementado con los *endpoints* CRUD (Crear, Leer, Actualizar, Eliminar) utilizando un array en memoria como almacenamiento temporal.
    * `GET /api/tasks` - Obtener todas las tareas.
    * `POST /api/tasks` - Crear una nueva tarea.
    * `PUT /api/tasks/:id` - Actualizar una tarea existente.
    * `DELETE /api/tasks/:id` - Eliminar una tarea.
* **Frontend (React/Vite):** Aplicación de React que consume la API del *backend* usando `fetch`.
    * **Componentes Clave:** `TaskList`, `TaskItem`, `TaskForm`.
* **Variables de Entorno:** Configuración utilizada tanto en el *backend* como en el *frontend* para gestionar la URL base de la API.
* **Estilo:** CSS básico aplicado para dar una presentación funcional.

---

## 🛠️ Tecnologías Utilizadas

* **Backend:** Node.js, Express
* **Frontend:** React, Vite, JavaScript
* **Herramientas:** Git, npm

---

## ⚙️ Estructura del Proyecto

. ├── backend/ # Servidor Express │ ├── node_modules/ │ ├── .env # Variables de entorno del backend │ ├── package.json │ └── server.js # Lógica del servidor y la API ├── frontend/ # Aplicación React (Vite) │ ├── node_modules/ │ ├── .env # Variables de entorno del frontend │ ├── package.json │ └── src/ # Componentes y lógica del frontend └── README.md


---

## 💻 Instrucciones para Ejecutar la Aplicación Localmente

Sigue estos pasos para levantar el servidor (*backend*) y la aplicación de React (*frontend*).

### 1. Prerrequisitos

Asegúrate de tener instalado:

* **Node.js** (versión LTS recomendada)
* **npm** (viene con Node.js)
* **Git**

### 2. Clonar el Repositorio
Clona el repositorio en tu máquina local.


3. Configuración del Backend (Servidor Express)
El servidor de la API se ejecutará en el puerto 3000.

Navega a la carpeta del backend:

`cd backend`

Instala las dependencias:
`npm install`
Crea el archivo de variables de entorno: Crea un archivo llamado .env en la carpeta backend con el siguiente contenido:

`PORT=3000`
`URL=localhost`

Inicia el servidor:
`npm run dev`
El servidor estará corriendo en http://localhost:3000.

4. Configuración del Frontend (Aplicación React)
La aplicación de React se ejecutará en el puerto por defecto de Vite, que es el 5173.

Navega a la carpeta del frontend:
`cd ../frontend`
Instala las dependencias:
`npm install`
Crea el archivo de variables de entorno: Crea un archivo llamado .env en la carpeta frontend con la URL base del backend:

`VITE_API_URL=http://localhost:3000`
Inicia la aplicación de React:
`npm run dev`
La aplicación estará disponible en http://localhost:5173.


## Capturas del funcionamiento de la aplicación.
![img1](capturas/Screenshot_1.png)
![img1](capturas/Screenshot_2.png)
![img1](capturas/Screenshot_3.png)
![img1](capturas/Screenshot_4.png)
![img1](capturas/Screenshot_5.png)
![img1](capturas/Screenshot_6.png)
![img1](capturas/Screenshot_7.png)
![img1](capturas/Screenshot_8.png)
![img1](capturas/Screenshot_9.png)
![img1](capturas/Screenshot_10.png)
![img1](capturas/Screenshot_11.png)
