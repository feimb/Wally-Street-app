<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;


require __DIR__ . '/../vendor/autoload.php';


$app = AppFactory::create();

// silencia el error de las devtools de google
$errorMiddleware = $app->addErrorMiddleware(true, true, true);

(require __DIR__ . '/../routes/web.php')($app);


$app->run();
