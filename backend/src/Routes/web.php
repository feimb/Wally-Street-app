
<?php
use Slim\App;
use App\app\Middleware\IsLoggedMiddleware;
use App\Controllers\AuthController;
use App\Controllers\UserController;
use App\Controllers\OperationsController;
use App\Controllers\PortfolioController;
use App\Controllers\TransactionController;

return function (app $app) {
    // prueba de rutas protegidas con token
    $app->group('/api', function ($group) {
        $group->get('/', function ($request, $response, $args) {

            $usuario = $request->getAttribute('usuario');

            $response->getBody()->write(json_encode([
                "mensaje" => "Hello world!",
                "usuario" => $usuario
            ]));


            return $response->withHeader('Content-Type', 'application/json');
        });
        //users
        $group->put('/users/{user_id}', [UserController::class ,'updateUser']);
        $group->get('/users/{user_id}', [UserController::class ,'ObtenerUsuario']);
        $group->get('/users', [UserController::class ,'index']);
        
        // portafolio
        $group->get('/portfolio', [PortfolioController::class, 'index']);

        $group->delete('/portfolio/{asset_id}', [PortfolioController::class, 'delete']);

        // historial
        $group->get('/transactions', [TransactionController::class, 'index']);

    })->add(new IsLoggedMiddleware($app->getResponseFactory()));
    // prueba de rutas protegidas con token
    $app->get('/hola', function ($request, $response, $args) {

        $usuario = $request->getAttribute('usuario');

        $response->getBody()->write(json_encode([
            "mensaje" => "Hello world!",
            "usuario" => $usuario
        ]));
        return $response->withHeader('Content-Type', 'application/json');
    });
    // Autenticacion

    $app->post('/login', [AuthController::class, 'login']);
    $app->post('/logout', [AuthController::class, 'logout']);

    // Usuarios
    $app->post('/users', [UserController::class, 'retrieve']);
    $app->get('/users/{user_id}', function ($request, $response, $args) {
        return;
    });
    $app->post('/users/{user_id}', function ($request, $response, $args) {
        return;
    });

    //Activos
    $app->get('/assets', function ($request, $response, $args) {
        // filtros
        // ?type={name}
        // min_price: Precio mínimo (ej: ?min_price=50).
        // max_price: Precio máximo (ej: ?max_price=500).

        return;
    });
    $app->get('/assets/{asset_id}/history/{quantity}', function ($request, $response, $args) {
        return;
    });
    $app->put('/assets', function ($request, $response, $args) {
        // <<< solo admin  >>>
        // Dispara la actualización aleatoria de los precios de todos
        // los activos

        return;
    });

    // operaciones
$app->post('/trade/sell', [OperationsController::class, 'sell'])->add(new IsLoggedMiddleware($app->getResponseFactory()));

$app->post('/trade/buy', [OperationsController::class, 'buy'])->add(new IsLoggedMiddleware($app->getResponseFactory()));

    // Portafolio y Historial
    $app->get('/portfolio', function ($request, $response, $args) {
        return;
    });
    $app->get('/transactions', function ($request, $response, $args) {
        return;
    });
    $app->delete('/portfolio/{asset_id}', function ($request, $response, $args) {
        return;
    });


};

