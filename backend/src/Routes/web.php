
<?php

use Slim\App;
use App\Controllers\AssetsController;
use App\app\Middleware\IsLoggedMiddleware;
return function (App $app) {

$app->get('/assets', [AssetsController::class, 'index']);    // muestra los assets
$app->put('/assets', [AssetsController::class, 'actualizarAssets'])->add(new IsLoggedMiddleware($app->getResponseFactory()));// actualiza los assets solo admin
$app->get('/assets/{asset_id}/history/{quantity}', [AssetsController::class, 'retreive']); // muestra el historial de un assets


};