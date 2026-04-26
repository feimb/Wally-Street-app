<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\AssetsModel;


class AssetsController
{
public function index(Request $request, Response $response): Response // mostrar assets segun los parametros
{  
    $query = $request->getQueryParams();

    $min = $query['min'] ?? null;
    $max = $query['max'] ?? null;
    $nom = $query['nom'] ?? null;

    $data = AssetsModel::obtenerAssets($min, $max, $nom);

    if (!empty($data)) {
        $response->getBody()->write(json_encode($data));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
    $response->getBody()->write("error no hay assets");
    return $response->withStatus(404);
}
public function retreive(Request $request, Response $response,  $args): Response  // mostrar ultimos 5 cambios de precio de un asset
{
     $asset_id=(int)$args['asset_id'];
    $quantity = (int) $args['quantity'];

    $data = AssetsModel::ObtenerCambios($asset_id, $quantity);

    if (!empty($data)) {
        $response->getBody()->write(json_encode([
            "No hay cambios para este asset"
        ]));

        return $response
            ->withStatus(404)
            ->withHeader('Content-Type', 'application/json');
    }

    $response->getBody()->write(json_encode($data));

    return $response
        ->withStatus(200)
        ->withHeader('Content-Type', 'application/json');
}
}