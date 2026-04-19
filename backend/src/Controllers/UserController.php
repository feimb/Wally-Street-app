<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\UserModel;

class UserController {


public function index(Request $request, Response $response): Response
{
    $dato = UserModel::obtenerUsuarios();

    if ($dato) {
        $response->getBody()->write(json_encode([
            "message" => "obtenido",
            "data" => $dato
        ]));

        return $response
            ->withStatus(200)
            ->withHeader('Content-Type', 'application/json');
    }

    $response->getBody()->write(json_encode([
        "message" => "no encontrado",
        "data" => null
    ]));

    return $response
        ->withStatus(404)
        ->withHeader('Content-Type', 'application/json');
}
}