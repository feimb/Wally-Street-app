
<?php

use Slim\App;
use App\Controllers\UserController;
use App\Controllers\AssetsController;
use App\Controllers\AuthController;
use App\app\Middleware\IsLoggedMiddleware;
return function (App $app) {


  $app->get('/users', [UserController::class, 'index'])
    ->add(new IsLoggedMiddleware($app->getResponseFactory()));// solo admin muestra los usuarios
    $app->get('/users/{id}', [UserController::class, 'ObtenerUsuario'])->add(new IsLoggedMiddleware($app->getResponseFactory())); // solo el usuario o el admin 

    $app->post('/users', [UserController::class, 'retrieve']); //  usuario

    $app->post('/login', [AuthController::class, 'login']);    // iniciar y crear token

$app->get('/assets', [AssetsController::class, 'index']);    // muestra los assets

$app->get('/assets/{asset_id}/history/{quantity}', [AssetsController::class, 'retreive']);
};

   /* $app->post('/logout', function ($request, $response, $args) {
        return;
    });

 

    


    //Activos
   
    
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


};*/