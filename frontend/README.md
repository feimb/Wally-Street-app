📄 Páginas — Wally Street Frontend

Documentación de las páginas ubicadas en src/pages y de las vistas principales del proyecto.

📌 Índice
🔐 Login
📝 RegistroPage
✏️ EditarUsuarioPage
💼 PortfolioPage
📊 StatPage
🧩 Rutas que renderizan componentes directamente
⚠️ Notas
🔐 Login (index.jsx)

Formulario de inicio de sesión. Exporta el componente Login.

Dependencias
InputText
lucide-react → Wallet, Gamepad2
useAuth
api
Estado interno
Estado	Descripción
email	Email ingresado por el usuario
password	Contraseña ingresada
Flujo
El usuario completa el formulario con su email y contraseña.
Al enviar el formulario se ejecuta login(email, password) mediante el hook useAuth.
Si la autenticación es correcta, se almacena la sesión y el usuario es redirigido a la aplicación.
El manejo de errores queda delegado al hook de autenticación.
📝 RegistroPage

Formulario para registrar un nuevo usuario.

Dependencias
InputText
lucide-react → Wallet
validarDatos
api
useAuth
Estado interno
Estado	Descripción
email	Email del usuario
username	Nombre de usuario
password	Contraseña
errors	Lista de errores de validación
successMessage	Mensaje mostrado luego del registro
Flujo
Se validan los datos mediante validarDatos.
Si existen errores, se muestran al usuario.
Si la validación es correcta, se realiza un POST /users.
Si el email ya se encuentra registrado, se informa el error correspondiente.
Si el registro es exitoso:
se muestra un mensaje de éxito;
se inicia sesión automáticamente mediante login(email, password);
se limpian los campos del formulario.
✏️ EditarUsuarioPage

Página que permite modificar los datos del usuario autenticado.

Dependencias
InputText
lucide-react → User
useAuth
api
Estado interno
Estado	Descripción
nombre	Nuevo nombre del usuario
password	Nueva contraseña
repeatPassword	Confirmación de contraseña
errors	Lista de errores de validación
successMessage	Mensaje de actualización exitosa
Flujo
Obtiene el identificador del usuario a partir del JWT.
Verifica que exista al menos un dato para modificar.
Valida que ambas contraseñas coincidan.
Comprueba que la contraseña cumpla los requisitos mínimos de seguridad.
Envía un PUT /users/{id} únicamente con los campos modificados.
Si el backend responde con 401, ejecuta logout().
💼 PortfolioPage

Página privada donde el usuario administra su cartera de inversiones.

Dependencias
PortfolioComponent
Funcionalidad

Toda la lógica de esta página se encuentra implementada en PortfolioComponent, el cual permite:

visualizar todos los activos del portfolio;
consultar el saldo disponible;
conocer el precio actual y el precio de compra de cada activo;
comprar nuevas unidades;
vender activos;
eliminar posiciones vacías;
mostrar errores cuando una operación no puede completarse;
actualizar automáticamente la información del portfolio luego de cada operación.

Las operaciones se realizan mediante ventanas modales de confirmación y consumen los servicios del frontend para comunicarse con la API.

📊 StatPage

Página pública que muestra el mercado de activos.

Dependencias
PublicAssetsComponent
Funcionalidad

Toda la lógica de esta página está implementada en PublicAssetsComponent, que permite:

obtener el listado de activos desde la API;
actualizar automáticamente los precios cada tres minutos;
buscar activos por nombre;
filtrar por rango de precios;
ordenar el listado por nombre o precio;
visualizar la variación porcentual del precio de cada activo;
navegar entre los resultados mediante paginación.

Al tratarse de una vista pública, no permite realizar compras, ventas ni consultar el historial de precios.

🧩 Rutas que renderizan componentes directamente

Actualmente existen dos rutas que renderizan componentes sin utilizar una página intermedia dentro de src/pages.

🛠️ /panel

Renderiza directamente:

AssetsComponent
Funcionalidad

AssetsComponent implementa toda la lógica del panel de administración de activos.

Permite:

visualizar todos los assets disponibles;
buscar activos por nombre;
filtrar por rango de precios;
ordenar los resultados;
comprar activos;
consultar el historial de precios;
visualizar la variación porcentual de cada asset;
actualizar automáticamente los precios del mercado;
navegar mediante paginación.
📜 /operaciones

Renderiza directamente:

TransactionsComponent
Funcionalidad

TransactionsComponent implementa toda la lógica del historial de operaciones del usuario.

Permite:

visualizar todas las transacciones realizadas;
filtrar las operaciones por activo;
filtrar por tipo de transacción (compra o venta);
combinar ambos filtros;
navegar entre las páginas del historial;
consultar la fecha, el precio, la cantidad y el tipo de cada operación.

Si el backend responde con un error 401, el componente ejecuta logout() para finalizar la sesión del usuario.
