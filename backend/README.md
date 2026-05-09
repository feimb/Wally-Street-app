# 📦 Backend - API REST "Wally Street"

## 🚀 Descripción

API REST desarrollada en PHP que simula un sistema de inversiones financieras.  
Los usuarios pueden registrarse, gestionar su saldo, comprar y vender activos, y visualizar su portfolio junto con el historial de transacciones.

Cada usuario inicia con un balance de **1000 USD** y puede operar con distintos activos cuyos precios varían con el tiempo.

---

## 🧠 Funcionalidades a implementar

---

## 🔐 Autenticación

- Login de usuarios mediante email y contraseña
- Generación de token con expiración (5 minutos)
- Logout que invalida el token
- Middleware para proteger rutas privadas
- Renovación automática del token en cada request válida

---

## 👤 Gestión de usuarios

- Registro con validaciones (email, password, nombre)
- Asignación automática de 1000 USD
- Ver perfil (datos + balance + valor portfolio)
- Editar usuario autenticado
- Listar usuarios (nombre + valor portfolio)

---

## 📊 Gestión de activos

- Listar activos con precios
- Filtros por nombre y rango de precios
- Actualización dinámica de precios
- Historial de precios por activo

---

## 💸 Operaciones

### Compra

- Validar usuario autenticado
- Validar existencia del activo
- Validar saldo suficiente
- Descontar balance
- Sumar al portfolio
- Registrar transacción

### Venta

- Validar usuario autenticado
- Validar cantidad disponible
- Sumar balance
- Restar del portfolio
- Registrar transacción

---

## 📁 Portfolio e historial

- Ver activos del usuario con valor actualizado
- Eliminar activos solo si cantidad = 0
- Ver historial de transacciones
- Filtrar historial por tipo o activo

---

## ⚠️ Reglas de negocio

- No permitir saldo negativo
- No vender activos inexistentes
- No eliminar activos con cantidad > 0
- Precios dinámicos
- Registrar todas las operaciones

---

## 📡 Respuestas HTTP

- 200 OK
- 400 Bad Request
- 401 Unauthorized
- 404 Not Found
- 409 Conflict

---

## 🗄️ Base de datos

- users
- assets
- portfolio
- transactions

---

# ✅ Checklist de implementación

## 🔐 Autenticación

- [x] POST /login
    - [x] 200 OK → Login exitoso
    - [x] 400 Bad Request → Datos faltantes o inválidos
    - [x] 401 Unauthorized → Credenciales incorrectas

- [x] POST /logout
    - [x] 200 OK → Logout exitoso
    - [x] 401 Unauthorized → Token inválido o expirado

## 👤 Usuarios

- [x] POST /users (registro + validaciones)
    - [x] 201 OK → Usuario creado
    - [x] 400 Bad Request → Datos inválidos o faltantes
    - [x] 409 Conflict → Email/usuario ya existente
- [x] GET /users/{id}   
    - [x] 200 OK → Usuario encontrado
    - [x] 403 Unauthorized → No autorizado
- [x] PUT /users/{id}
    - [x] 200 OK → Usuario actualizado
    - [x] 400 Bad Request → Datos inválidos
    - [x] 401 Unauthorized → No autorizado
- [x] GET /users
    - [x] 200 OK → Lista obtenida
    - [x] 401 Unauthorized → No autorizado

## 📊 Activos

- [x] GET /assets (con filtros)
    - [x] 200 OK → Lista obtenida
    - [x] 400 Bad Request → Filtros inválidos
- [x] PUT /assets (actualizar precios - admin)
    - [x] 200 OK → Precios actualizados
    - [x] 401 Unauthorized → No autorizado
- [x] GET /assets/{id}/history/{quantity}
    - [x] 200 OK → Historial obtenido
    - [x] 404 Not Found → Asset no encontrado

## 💸 Operaciones

- [x] POST /trade/buy
    - [x] 200 OK → Compra realizada
    - [x] 400 Bad Request → Datos inválidos
    - [x] 401 Unauthorized → Usuario no autorizado
    - [x] 404 Not Found → Asset no encontrado
    - [x] 409 Conflict → Saldo insuficiente

- [x] POST /trade/sell
    - [x] 200 OK → Venta realizada
    - [x] 400 Bad Request → Datos inválidos
    - [x] 401 Unauthorized → Usuario no autorizado
    - [x] 404 Not Found → Asset no encontrado
    - [x] 409 Conflict → Cantidad insuficiente

## 📁 Portfolio e historial

- [ ] GET /portfolio
    - [ ] 200 OK → Portfolio obtenido
    - [ ] 401 Unauthorized → Usuario no autenticado
- [ ] DELETE /portfolio/{asset_id}
    - [ ] 200 OK → Asset eliminado
    - [ ] 401 Unauthorized → Usuario no autenticado
    - [ ] 404 Not Found → Asset no encontrado en portfolio
    - [ ] 409 Conflict → Quantity mayor a 0

- [ ] GET /transactions
    - [ ] 200 OK → Historial obtenido
    - [ ] 400 Bad Request → Filtros inválidos
    - [ ] 401 Unauthorized → Usuario no autenticado
