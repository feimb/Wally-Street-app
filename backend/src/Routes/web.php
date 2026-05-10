<?php

use Slim\App;

use App\app\Middleware\IsLoggedMiddleware;

use App\Controllers\AuthController;
use App\Controllers\UserController;
use App\Controllers\AssetsController;
use App\Controllers\PortfolioController;
use App\Controllers\TransactionController;
use App\Controllers\OperationsController;

return function (App $app) {

    // auth
    $app->post('/login', [AuthController::class, 'login']);

    $app->post('/logout', [AuthController::class, 'logout'])
        ->add(new IsLoggedMiddleware($app->getResponseFactory()));


    // users

    $app->post('/users', [UserController::class, 'retrieve']);
    $app->group('/users', function ($users) {

        $users->get('/{user_id}', [UserController::class, 'ObtenerUsuario']);

        $users->put('/{user_id}', [UserController::class, 'updateUser']);

        $users->get('', [UserController::class, 'index']);
    })->add(new IsLoggedMiddleware($app->getResponseFactory()));

    // Activos
    $app->get('/assets', [AssetsController::class, 'index']);

    $app->get('/assets/{asset_id}/history/{quantity}', [AssetsController::class, 'retreive']);


    $app->put('/assets', [AssetsController::class, 'actualizarAssets'])
        ->add(new IsLoggedMiddleware($app->getResponseFactory()));


    // portfolio
    $app->group('/portfolio', function ($portfolio) {

        $portfolio->get('', [PortfolioController::class, 'index']);

        $portfolio->delete('/{asset_id}', [PortfolioController::class, 'delete']);


    })->add(new IsLoggedMiddleware($app->getResponseFactory()));

    $app->get('/transactions', [TransactionController::class, 'index'])
        ->add(new IsLoggedMiddleware($app->getResponseFactory()));

    // compra y venta 
    $app->group('/trade', function ($trade) {

        $trade->post('/buy', [OperationsController::class, 'buy']);

        $trade->post('/sell', [OperationsController::class, 'sell']);
    })->add(new IsLoggedMiddleware($app->getResponseFactory()));
};
