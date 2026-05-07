<?php

namespace App\Controllers;

use App\Models\PortfolioModel;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class PortfolioController
{
    public function index(Request $request, Response  $response): Response
    {
        $user_id = $request->getAttribute('usuario');

        $portfolio = PortfolioModel::getPortfolio($user_id);

        $response->getBody()->write(json_encode($portfolio));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }
    public function delete(Request $request, Response $response, $args): Response
{
    $user_id = $request->getAttribute('usuario');

    $asset_id = $args['asset_id'];

    $asset = PortfolioModel::getAssetByUser($user_id, $asset_id);

    if (!$asset) {

        $response->getBody()->write(json_encode([
            "error" => "Activo no encontrado en tu portfolio"
        ]));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(404);
    }

    if ($asset["quantity"] > 0) {

        $response->getBody()->write(json_encode([
            "error" => "No puedes quitar un activo de tu portfolio si aún tienes unidades. Debes venderlas primero."
        ]));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(409);
    }

    PortfolioModel::deleteAsset($user_id, $asset_id);

    $response->getBody()->write(json_encode([
        "message" => "Activo eliminado del portfolio"
    ]));

    return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(200);
}
}
