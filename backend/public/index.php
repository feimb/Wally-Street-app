<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;


require __DIR__ . './../vendor/autoload.php';


$app = AppFactory::create();


$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write("Hello world!");
    return $response;
});



// silencia el error de las devtools de google
$errorMiddleware = $app->addErrorMiddleware(true, true, true);
$app->run();
