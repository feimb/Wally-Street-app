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
- [ ] POST /logout
- [ ] Middleware de autenticación
- [ ] Expiración y renovación de token

## 👤 Usuarios
- [ ] POST /users (registro + validaciones)
- [ ] GET /users/{id}
- [ ] PUT /users/{id}
- [ ] GET /users

## 📊 Activos
- [ ] GET /assets (con filtros)
- [ ] PUT /assets (actualizar precios - admin)
- [ ] GET /assets/{id}/history/{quantity}
- [ ] Función de variación de precios

## 💸 Operaciones
- [ ] POST /trade/buy
- [ ] Validación de saldo
- [ ] Registro en portfolio
- [ ] Registro en transactions

- [ ] POST /trade/sell
- [ ] Validación de cantidad
- [ ] Actualización de balance
- [ ] Registro en transactions

## 📁 Portfolio e historial
- [ ] GET /portfolio
- [ ] DELETE /portfolio/{asset_id}
- [ ] Validación de cantidad = 0
- [ ] GET /transactions
- [ ] Filtros en historial

## ⚠️ Validaciones y reglas
- [ ] Manejo de errores HTTP
- [ ] Mensajes de error claros
- [ ] Validación de integridad en eliminaciones
- [ ] Evitar operaciones inválidas

## 🗄️ Base de datos
- [ ] Crear tablas necesarias
- [ ] Relaciones y claves foráneas
- [ ] Insertar activos iniciales

---