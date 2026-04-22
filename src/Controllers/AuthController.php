<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\UserModel;
use Firebase\JWT\JWT;
use App\Middleware\IsLoggedMiddleware;

class AuthController
{
    public function retreive(Request $request, Response $response): Response
{
    $data = json_decode($request->getBody()->getContents(), true) ?? [];

    $email = trim(strtolower($data['email'] ?? ''));
    $password = $data['password'] ?? '';

    // 🔹 PASO 1: verificar que llegue email
    if (!$email) {
        return $this->error($response, "Falta email");
    }

    // 🔹 PASO 2: validar formato email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return $this->error($response, "Email inválido");
    }

    // 🔹 PASO 3: verificar password
    if (!$password) {
        return $this->error($response, "Falta password");
    }

    // 🔹 PASO 4: buscar usuario en DB
    $user = UserModel::existe($email);

    if (!$user) {
        return $this->error($response, "Usuario no existe");
    }

    // 🔹 PASO 5: validar password
  if (!password_verify($password, $user['password'])) {
    var_dump([
        "input" => $password,
        "db" => $user['password'],
        "verify" => password_verify($password, $user['password'])
    ]);
    exit;
}

    // 🔹 PASO 6: generar token
    $expire = (new \DateTime("+1 hour"))->getTimestamp();

    $token = JWT::encode([
        "usuario" => $user["id"],
        "expired_at" => $expire
    ], IsLoggedMiddleware::$secret, 'HS256');

    // 🔹 OK
    $response->getBody()->write(json_encode([
        "mensaje" => "Login exitoso",
        "token" => $token
    ]));

    return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(200);
}
private function error(Response $response, $mensaje, $status = 400): Response
{
    $response->getBody()->write(json_encode([
        "error" => $mensaje
    ]));

    return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus($status);
}
}
