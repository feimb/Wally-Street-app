# 📄 Páginas — Wally Street Frontend

Documentación de las páginas ubicadas en `src/pages` y de las vistas principales del proyecto.

## 📌 Índice

- [🔐 Login](#-login-indexjsx)
- [📝 RegistroPage](#-registropage)
- [✏️ EditarUsuarioPage](#-editarusuariopage)
- [💼 PortfolioPage](#-portfoliopage)
- [📊 StatPage](#-statpage)
- [🧩 Rutas que renderizan componentes directamente](#-rutas-que-renderizan-componentes-directamente)
- [⚠️ Notas](#️-notas)

---

## 🔐 Login (`index.jsx`)

Formulario de inicio de sesión. Exporta el componente `Login`.

### Dependencias

- `InputText`
- `lucide-react` (`Wallet`, `Gamepad2`)
- `useAuth`
- `api`

### Estado interno

| Estado | Descripción |
| ------ | ----------- |
| `email` | Email ingresado por el usuario |
| `password` | Contraseña ingresada |

### Flujo

1. El usuario completa el formulario con su email y contraseña.
2. Al enviar el formulario se ejecuta `login(email, password)` mediante `useAuth`.
3. Si la autenticación es correcta, el usuario inicia sesión.
4. El manejo de errores queda delegado al hook de autenticación.

---

## 📝 RegistroPage

Formulario para registrar un nuevo usuario.

### Dependencias

- `InputText`
- `lucide-react` (`Wallet`)
- `validarDatos`
- `api`
- `useAuth`

### Estado interno

| Estado | Descripción |
| ------ | ----------- |
| `email` | Email del usuario |
| `username` | Nombre de usuario |
| `password` | Contraseña |
| `errors` | Lista de errores de validación |
| `successMessage` | Mensaje de registro exitoso |

### Flujo

1. Valida los datos utilizando `validarDatos`.
2. Si existen errores, los muestra al usuario.
3. Si la validación es correcta, realiza `POST /users`.
4. Si el registro es exitoso:
   - muestra un mensaje de éxito;
   - inicia sesión automáticamente;
   - limpia el formulario.

---

## ✏️ EditarUsuarioPage

Permite modificar los datos del usuario autenticado.

### Dependencias

- `InputText`
- `lucide-react` (`User`)
- `useAuth`
- `api`

### Estado interno

| Estado | Descripción |
| ------ | ----------- |
| `nombre` | Nuevo nombre del usuario |
| `password` | Nueva contraseña |
| `repeatPassword` | Confirmación de contraseña |
| `errors` | Lista de errores |
| `successMessage` | Mensaje de actualización |

### Flujo

1. Obtiene el identificador del usuario desde el JWT.
2. Verifica que exista al menos un dato para modificar.
3. Valida las contraseñas.
4. Envía un `PUT /users/{id}` únicamente con los campos modificados.
5. Si el token expiró, ejecuta `logout()`.

---

## 💼 PortfolioPage

Página privada donde el usuario administra su cartera de inversiones.

### Dependencias

- `PortfolioComponent`

### Funcionalidad

La lógica de esta página se encuentra implementada en `PortfolioComponent`, el cual permite:

- visualizar el portfolio;
- consultar el saldo disponible;
- comprar activos;
- vender activos;
- eliminar posiciones vacías;
- consultar el precio actual y el precio de compra;
- actualizar automáticamente la información luego de cada operación.

---

## 📊 StatPage

Página pública que muestra el mercado de activos.

### Dependencias

- `PublicAssetsComponent`

### Funcionalidad

Toda la lógica se encuentra implementada en `PublicAssetsComponent`, que permite:

- visualizar los activos disponibles;
- buscar por nombre;
- filtrar por rango de precios;
- ordenar resultados;
- visualizar la variación porcentual del precio;
- navegar mediante paginación;
- actualizar automáticamente los precios cada tres minutos.

---

## 🧩 Rutas que renderizan componentes directamente

Actualmente existen dos rutas que renderizan componentes sin utilizar una página propia.

### 🛠️ `/panel`

Renderiza:

- `AssetsComponent`

Este componente permite:

- listar assets;
- buscar y filtrar;
- ordenar resultados;
- comprar activos;
- consultar historial;
- actualizar automáticamente los precios;
- navegar mediante paginación.

---

### 📜 `/operaciones`

Renderiza:

- `TransactionsComponent`

Este componente permite:

- consultar el historial de operaciones;
- filtrar por activo;
- filtrar por tipo de operación;
- combinar filtros;
- navegar mediante paginación;
- visualizar fecha, cantidad, precio y tipo de cada transacción.

Si el backend responde con `401`, ejecuta `logout()`.

---

