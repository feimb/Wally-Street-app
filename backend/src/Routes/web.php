<?php

use Slim\App;
use Slim\Routing\RouteCollercotrProxy;

return function (app $app) {


    $app->get('/', function ($request, $response, $args) {
        $response->getBody()->write("Hello world!");
        return $response;
    });
    // Autenticacion
    $app->post('/login', function ($request, $response, $args) {
        return;
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
