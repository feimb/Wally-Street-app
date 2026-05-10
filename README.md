# 📈 Wally Street

Aplicación web de simulación de inversiones financieras.

El proyecto está dividido en:

- Backend API REST
- Frontend web

---

# 🚀 Tecnologías utilizadas

## Backend

- PHP
- Slim Framework
- MySQL
- JWT Authentication
- vlucas/phpdotenv


---

# 📦 Instalación

# Backend

## 1. Clonar repositorio

```bash
git clone https://github.com/TU-USUARIO/TU-REPOSITORIO.git
```

---

## 2. Instalar dependencias

```bash
composer install
```

---

## 3. Configurar `.env`

Crear un archivo `.env` en la carpeta backend:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=seminariophp
DB_USER=root
DB_PASS=
APP_ENV=local
```

---

## 4. Ejecutar servidor backend

```bash
cd ./backend
php -S localhost:8080 -t public
```

---

# 📌 Índice

- [Autenticación](#-auth)
- [Usuarios](#-usuarios)
- [Assets](#-assets)
- [Trade](#-trade)
- [Portfolio](#-portfolio)
- [Transactions](#-transactions)

---

# 🔐 Auth
#-auth
| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/login` | Login |
| POST | `/logout` | Logout |

---

# 👤 Usuarios

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/users` | Registrar usuario |
| GET | `/users/{user_id}` | Obtener usuario |
| PUT | `/users/{user_id}` | Actualizar usuario |
| GET | `/users` | Listar usuarios |

---

# 📊 Assets

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/assets` | Obtener assets |
| PUT | `/assets` | Actualizar precios |
| GET | `/assets/{asset_id}/history/{quantity}` | Historial de precios |

---

# 💸 Trade

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/trade/buy` | Comprar asset |
| POST | `/trade/sell` | Vender asset |

---

# 📁 Portfolio

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/portfolio` | Ver portfolio |
| DELETE | `/portfolio/{asset_id}` | Eliminar asset |

---

# 📜 Transactions

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/transactions` | Historial de transacciones |

---

# 🔐 Autenticación

La API utiliza JWT.

Las rutas protegidas requieren:

```http
Authorization: Bearer TOKEN
```

---

# ✅ Códigos HTTP utilizados

| Código | Significado |
|---|---|
| 200 | OK |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |

---

# 📂 Estructura del proyecto

```text
backend/
│
├── public/
├── src/
│   ├── Controllers/
│   ├── Models/
│   ├── Routes/
│   ├── DB/
│   └── app/
│       └── Middleware/
│
├── vendor/
├── composer.json
└── .env

```
---

# 🔗 Repositorio

[Github](https://github.com/feimb/Wally-Street-app)
