
<?php

use Slim\App;
use App\app\Middleware\IsLoggedMiddleware;
use App\Controllers\OperationsController;
return function (App $app) {


$app->post('/trade/sell', [OperationsController::class, 'sell'])->add(new IsLoggedMiddleware($app->getResponseFactory()));

$app->post('/trade/buy', [OperationsController::class, 'buy'])->add(new IsLoggedMiddleware($app->getResponseFactory()));
};

