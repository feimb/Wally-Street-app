<?php

use Slim\Factory\AppFactory;
use App\Controllers\AssetsController ;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();
$app->get('/22', function ($request, $response, $args) {
    $response->getBody()->write("Hola mundo");
    return $response;
});
(require __DIR__ . '/../src/Routes/web.php')($app);

$app->run();