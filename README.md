# 📄 Proyecto Puntored – API de Recargas

Este proyecto implementa un servicio de recargas utilizando **Spring Boot** y consumiendo los servicios de **Puntored**.  
Incluye persistencia de datos en **PostgreSQL** y un frontend en **React** para la interacción con el usuario.  
El despliegue final se realizó en **Render**.

---

## 🚀 Requisitos previos
### Backend
- **Java 17+**
- **Maven 3.8+**
- **PostgreSQL** (para persistencia)
- Credenciales de Puntored (para login, proveedores y compra)

### Frontend
- **Node.js 18+**
- npm o yarn

---

## 📌 Desafíos por niveles

### 🟢 Nivel 0 – API básica con Spring Boot
**Objetivos:**
- Desarrollar una API en Java con Spring Boot que integre los servicios de Puntored (`auth`, `getSuppliers`, `buy`).
- (Opcional) Implementar test unitarios.

**Instalación y ejecución:**
```bash
# Clonar repositorio
git clone https://github.com/Mfgarciat/puntored
cd proyecto/backend

# Construir y ejecutar
mvn clean install
mvn spring-boot:run

# Ejecutar pruebas unitarias
mvn test
```
La API quedará disponible en:
```
http://localhost:8080
```

**Endpoints principales:**
| Método | URL | Descripción |
|--------|-----|-------------|
| `POST` | `/api/auth/login` | Autenticación de usuario |
| `POST` | `/api/user/registration` | Registro de nuevo usuario |
| `GET`  | `/api/recharge/suppliers` | Listado de proveedores |
| `POST` | `/api/recharge/buy` | Realizar recarga |

---

### 🟡 Nivel 1 – Persistencia y consulta de histórico
**Objetivos:**
- Almacenar la información transaccional en una base de datos.
- Listar las transacciones realizadas por el usuario (consulta de histórico).

**Base de datos:**
- Motor: **PostgreSQL**
- Configuración local en `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/puntored_db
spring.datasource.username=puntored_user
spring.datasource.password=tu_password
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=update
```

**Script de creación de base de datos:**
```sql
CREATE DATABASE puntored_db;
```

**Endpoint de histórico:**
| Método | URL | Descripción |
|--------|-----|-------------|
| `GET`  | `/api/recharge/history` | Histórico de recargas |

---

### 🔵 Nivel 2 – Frontend en React
**Objetivos:**
- Frontend en React que consuma la API del Nivel 0.
- Realizar recargas y mostrar ticket al finalizar.
- Consultar transacciones realizadas.
- (Opcional) Implementar login propio y test unitarios.

**Instalación y ejecución:**
```bash
cd proyecto/frontend
npm install
npm run dev

# Ejecutar pruebas unitarias
npm run test
```
El frontend quedará disponible en:
```
http://localhost:5173
```

**Funcionalidades:**
- Login y registro de usuario.
- Consulta de proveedores.
- Recargas en línea.
- Resumen y ticket de compra.
- Consulta de histórico.

---

### 🔴 Nivel 3 – Despliegue en Render
**Objetivos:**
- Desplegar backend y frontend en la nube usando Render.

**URL de la API:**
```
https://puntored-70qh.onrender.com
```

**URL del Frontend:**
```
https://front-puntored.onrender.com
```

#### Pasos de despliegue – Backend
  1. Subir código a GitHub.
  2. En Render: **New → Web Service**, conectar con el repo, elegir rama (`master`).
  3. Configuración:
    - **Environment:** Java 17
    - **Build Command:**
      ```bash
      ./mvnw clean package -DskipTests
      ```
  - **Start Command:**
      ```bash
      java -jar target/*.jar
      ```
  4. Variables de entorno:
  ```properties
  # Base de datos
  DATABASE_URL=jdbc:postgresql://<HOST>:<PORT>/<DB_NAME>
  DATABASE_USERNAME=<usuario>
  DATABASE_PASSWORD=<contraseña>

  # API de Puntored
  PUNTORED_API_URL=https://api.puntored.com
  PUNTORED_API_KEY=<api_key>
  PUNTORED_AUTH_USER=<usuario_puntored>
  PUNTORED_AUTH_PASSWORD=<password_puntored>

  # JWT
  JWT_SECRET=<clave_secreta_jwt>
  JWT_EXPIRATION=<tiempo_expiracion>

  # CORS
  CORS_ALLOWED_ORIGINS=<url_frontend_render>
  ```

  #### Pasos de despliegue – Frontend
  1. Subir código a GitHub.
  2. En Render: **New → Static Site**.
  3. Configuración:
    - **Build Command:**
      ```bash
      npm install && npm run build
      ```
  - **Publish Directory:**
      ```
      dist
      ```
  4. Variable de entorno:
  ```bash
  VITE_API_URL=https://front-puntored.onrender.com
  ```

  5. Base de datos en Render
  - Crear recurso **PostgreSQL** en Render.
  - Copiar la URL de conexión, usuario y contraseña y colocarla en `DATABASE_URL, DATABASE_USERNAME, DATABASE_PASSWORD`.
  - Render gestionará el host, puerto, usuario y contraseña.

  ---

  ### 📌 Notas importantes
  - El plan gratuito de Render entra en reposo después de 15 min sin tráfico.
  - Comando para habilitar el servidor de back
    ```
    https://api.render.com/deploy/srv-d2dvfa3e5dus73fbl4ag?key=GHc6GWtHWKQ
    ```
  - Habilitar CORS en backend si el frontend está en otro dominio.
  - Render ofrece logs en tiempo real para depuración.

## ✨ Tecnologías utilizadas
- **Backend:** Java 17, Spring Boot, Maven
- **Frontend:** React, Vite
- **Base de datos:** PostgreSQL
- **Despliegue:** Render
