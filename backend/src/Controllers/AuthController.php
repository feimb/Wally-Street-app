<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\UserModel;


class AuthController
{
public function retreive(Request $request, Response $response): Response

{
    $data = $request->getParsedBody() ?? "";

    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
   
    $user = UserModel::existe($email);

    if (!$user || !password_verify($password, $user['password'])) {

        $response->getBody()->write(json_encode([
            "error" => "Credenciales inválidas"
        ]));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(401);
    }

    $expire = (new \DateTime("now"))
        ->modify("+1 hour")
        ->format("Y-m-d H:i:s");

    $token = JWT::encode([
        "usuario" => $user["id"],
        "expired_at" => $expire
    ], IsLoggedMiddleware::$secret, 'HS256');

    $response->getBody()->write(json_encode([
        "mensaje" => "Usuario logueado",
        "token" => $token
    ]));

    return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(200);
}}