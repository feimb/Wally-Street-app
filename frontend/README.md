# 📄 Frontend — Wally Street

Documentación del frontend del proyecto.

---

# ⚙️ Instalación y ejecución

## 📦 Instalación de dependencias

Ingresar a la carpeta del frontend:

    cd frontend

Instalar dependencias:

    pnpm install

## 🔑 Variables de entorno

Crear un archivo `.env` en la raíz del frontend:

    VITE_API_URL=TU_URL

Ejemplo:

    VITE_API_URL=http://localhost:8000

## ▶️ Ejecutar proyecto

    pnpm dev

---

# 📦 Dependencias utilizadas

- React 19
- Vite 8
- Axios 
- Tailwind CSS 4 — Framework de utilidades CSS; permite estilizar componentes directamente en el HTML/JSX con clases predefinidas, sin escribir CSS custom.
- jwt-decode — Librería liviana para decodificar tokens JWT en el cliente (sin verificar la firma), útil para leer el payload como el rol o el id del usuario.
- Recharts — Librería de gráficos para React (barras, líneas, torta, etc.), construida sobre D3 pero con componentes declarativos fáciles de usar.
- lucide-react — Set de íconos SVG como componentes de React, liviano y muy usado junto con Tailwind.
- ESLint 10 — Linter que analiza el código JS/TS en busca de errores, malas prácticas o problemas de estilo, ayudando a mantener consistencia en el proyecto.


---

## Cambios en la API

### Endpoints de usuario

Se modificaron todos los endpoints que interactúan con el usuario para que devuelvan también su `id`
- get user
- get users

### Validación de parámetros GET

Se agregó validación en los parámetros GET de los endpoints de **historial** y **assets** para evitar valores fuera de rango. Específicamente:

- No se aceptan valores **negativos**.
- No se aceptan valores **mayores al máximo permitido** para ese recurso.

Si el parámetro no cumple con estas condiciones, el endpoint responde con un error de validación en lugar de procesar la solicitud.

---
# 🔐 Login (`index.jsx`)

Formulario de inicio de sesión.

Dependencias:

- InputText
- lucide-react
- useAuth
- api

Funcionalidad:

- Autentica al usuario mediante login(email,password).
- Maneja la sesión con useAuth.

---

# 📝 RegistroPage

Formulario para registrar usuarios.

Dependencias:

- InputText
- lucide-react
- validarDatos
- api
- useAuth

Funcionalidad:

- Valida datos ingresados.
- Registra usuario mediante POST /users.
- Inicia sesión automáticamente.

---

# ✏️ EditarUsuarioPage

Permite modificar datos del usuario autenticado.

Dependencias:

- InputText
- lucide-react
- useAuth
- api
- validarDatos

Funcionalidad:

- Valida datos modificados.
- Envía PUT /users/{id}.
- Si el token expira ejecuta logout().

---

# 💼 PortfolioPage

Página privada de inversiones.

Dependencia:

- PortfolioComponent

Funcionalidad:

- Visualizar portfolio.
- Consultar saldo.
- Comprar activos.
- Vender activos.
- Eliminar posiciones vacías.

---

# 📊 StatPage

Página pública del mercado.

Dependencia:

- PublicAssetsComponent

Funcionalidad:

- Visualizar activos.
- Buscar.
- Filtrar.
- Ordenar.
- Paginar.
- Actualizar precios.

---

# 👥 ManejoUsuariosPage

Página administrativa.

Dependencias:

- FilaUsuarios
- UsuarioEditForm
- useAuth
- api
- validarDatos

Funcionalidad:

- Listar usuarios.
- Filtrar.
- Ordenar.
- Editar usuarios.

---

# 🧩 Rutas

## /panel

Renderiza:

- AssetsComponent

Funciones:

- Listar activos.
- Buscar.
- Filtrar.
- Comprar.
- Consultar historial.

---

## /operaciones

Renderiza:

- TransactionsComponent

Funciones:

- Consultar historial.
- Filtrar por activo.
- Filtrar por tipo buy/sell.
- Paginar resultados.

---

# 🪝 Hooks

## useAuth

Maneja:

- token
- user
- loading

Funciones:

- login(email,password)
- logout()

---

# 🌐 Servicios

Todos utilizan la instancia axios definida en api.js.

Las peticiones autenticadas envían:

Authorization: Bearer {token}

---

## api.js

Utiliza:

VITE_API_URL

---

## AssetsService

Funciones:

- getAssets() → GET /assets
- UpdateAssets() → PUT /assets
- getHistory(id) → GET /assets/{id}/history/5

---

## PortfolioService

Funciones:

- getPortfolio() → GET /portfolio
- deleteAssetPortfolio() → DELETE /portfolio/{asset_id}

---

## TradeServicie

Funciones:

- BuyAsset() → POST /trade/buy
- SellAsset() → POST /trade/sell

---

## TransactionsService

Función:

- getTransactions() → GET /transactions

---

## UsersService

Función:

- getUser() → GET /users/{id}

---

# 🧮 Utils

## validarDatos

Se encarga de validar los datos ingresados por el usuario en los formularios.

Valida:

- email
- username
- password
- repeatPassword

Permite configurar qué campos son obligatorios
