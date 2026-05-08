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

- [ ] POST /login
    - [ ] 200 OK → Login exitoso
    - [ ] 400 Bad Request → Datos faltantes o inválidos
    - [ ] 401 Unauthorized → Credenciales incorrectas

- [ ] POST /logout
    - [ ] 200 OK → Logout exitoso
    - [ ] 401 Unauthorized → Token inválido o expirado

## 👤 Usuarios

- [ ] POST /users (registro + validaciones)
    - [ ] 200 OK → Usuario creado
    - [ ] 400 Bad Request → Datos inválidos o faltantes
    - [ ] 409 Conflict → Email/usuario ya existente
- [ ] GET /users/{id}
    - [ ] 200 OK → Usuario encontrado
    - [ ] 401 Unauthorized → No autorizado
- [ ] PUT /users/{id}
    - [ ] 200 OK → Usuario actualizado
    - [ ] 400 Bad Request → Datos inválidos
    - [ ] 401 Unauthorized → No autorizado
- [ ] GET /users
    - [ ] 200 OK → Lista obtenida
    - [ ] 401 Unauthorized → No autorizado

## 📊 Activos

- [ ] GET /assets (con filtros)
    - [ ] 200 OK → Lista obtenida
    - [ ] 400 Bad Request → Filtros inválidos
- [ ] PUT /assets (actualizar precios - admin)
    - [ ] 200 OK → Precios actualizados
    - [ ] 401 Unauthorized → No autorizado
- [ ] GET /assets/{id}/history/{quantity}
    - [ ] 200 OK → Historial obtenido
    - [ ] 404 Not Found → Asset no encontrado

## 💸 Operaciones

- [ ] POST /trade/buy
    - [ ] 200 OK → Compra realizada
    - [ ] 400 Bad Request → Datos inválidos
    - [ ] 401 Unauthorized → Usuario no autorizado
    - [ ] 404 Not Found → Asset no encontrado
    - [ ] 409 Conflict → Saldo insuficiente

- [ ] POST /trade/sell
    - [ ] 200 OK → Venta realizada
    - [ ] 400 Bad Request → Datos inválidos
    - [ ] 401 Unauthorized → Usuario no autorizado
    - [ ] 404 Not Found → Asset no encontrado
    - [ ] 409 Conflict → Cantidad insuficiente

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
