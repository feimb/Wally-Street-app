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
public function retrieve(Request $request, Response $response): Response
{
    $dato = json_decode($request->getBody()->getContents(), true) ?? [];

    $email = trim(strtolower($dato['email'] ?? ''));
    $password = $dato['password'] ?? '';
    $nombre = $dato['nombre'] ?? '';

    if (!$email || !$password || !$nombre) {
        return $this->error($response, "faltan datos");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return $this->error($response, "email inválido");
    }

    if (strlen($password) < 8 || strlen($nombre) < 3) {
        return $this->error($response, "datos muy cortos");
    }

    if ((boolean)UserModel::existe($email)) {
        return $this->error($response, "el usuario ya existe");
    }

    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    UserModel::crearUser($email, $passwordHash, $nombre);

    $response->getBody()->write(json_encode([
        "mensaje" => "creado exitoso"
    ]));

    return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(201);
}

private function error($response, $mensaje)
{
    $response->getBody()->write(json_encode([
        "error" => $mensaje
    ]));

    return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(400);
}

}