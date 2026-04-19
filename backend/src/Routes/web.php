<?php

use Slim\App;
use Slim\Routing\RouteCollercotrProxy;
use Firebase\JWT\JWT;
use App\app\Middleware\IsLoggedMiddleware;
use App\DB\DB;

return function (app $app) {


    $app->get('/', function ($request, $response, $args) {
        $response->getBody()->write("Hello world!");
        return $response;
    });
    // Autenticacion


    $app->post('/login', function ($request, $response) {

        $data = $request->getParsedBody();


        $email = $data['email'] ??  '';
        $password  = $data['password'] ??  '';


        $pdo = DB::conexion();


        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->execute(['email' => $email]);


        $users = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$users || !password_verify($password, $users['password'])) {

            $response->getBody()->write(json_encode([
                "error" => "Credenciales inválidas"
            ]));

            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(401);
        }

        $expire = (new \DateTime("now"))
            ->modify("+1 hour")
            ->format("Y-m-d H:i:s");

        $token = JWT::encode([
            "usuario" => $users["id"],
            "expired_at" => $expire
        ], IsLoggedMiddleware::$secret, 'HS256');

        $response->getBody()->write(json_encode([
            "mensaje" => "Usuario logueado",
            "token" => $token
        ]));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    });

    $app->post('/logout', function ($request, $response, $args) {
        return;
    });

    // Usuarios
    $app->get('/users', function ($request, $response, $args) {
        return;
    });
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
    $app->post('/trade/buy', function ($request, $response, $args) {
        return;
    });
    $app->post('/trade/sell', function ($request, $response, $args) {
        return;
    });

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
