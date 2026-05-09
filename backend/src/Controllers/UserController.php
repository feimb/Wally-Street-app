<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\UserModel;

class UserController
{
    public function index(Request $request, Response $response): Response
    {
        $user_id = $request->getAttribute('usuario');

        if (!UserModel::esAdmin($user_id)) {
            $response->getBody()->write(json_encode([
                "error" => "Acceso denegado"
            ]));

            return $response
                ->withStatus(403)
                ->withHeader('Content-Type', 'application/json');
        }


        $dato = UserModel::obtenerUsuarios();

        if ($dato) {
            $response->getBody()->write(json_encode($dato));

            return $response
                ->withStatus(200)
                ->withHeader('Content-Type', 'application/json');
        }

        $response->getBody()->write(json_encode([
            "no hay usuario registrados",
        ]));

        return $response
            ->withStatus(404)
            ->withHeader('Content-Type', 'application/json');
    }

    public function retrieve(Request $request, Response $response): Response // crear usuario
    {
        $dato = json_decode($request->getBody()->getContents(), true) ?? [];

        $email = trim(strtolower($dato['email'] ?? ''));
        $password = $dato['password'] ?? '';
        $nombre = $dato['nombre'] ?? '';

        if (!$email || !$password || !$nombre) {
            return $this->errorCode($response, "faltan datos", 400);
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->errorCode($response, "email inválido", 409);
        }

        if (strlen($password) < 8 || strlen($nombre) < 3) {
            return $this->errorCode($response, "datos muy cortos", 400);
        }

        if ((bool)UserModel::existe($email)) {
            return $this->errorCode($response, "el email ya existe",409);
        }
        $passwordHash = password_hash($password, PASSWORD_BCRYPT);

        UserModel::crearUsuario($email, $passwordHash, $nombre);
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
    public function ObtenerUsuario(Request $request, Response $response, $args): Response
    {
        $id = $args['user_id'];
        $user_id = $request->getAttribute('usuario');
        if ($user_id != $id && !UserModel::esAdmin($user_id)) {
            $response->getBody()->write(json_encode([
                "error" => "Acceso denegado"
            ]));

            return $response
                ->withStatus(403)
                ->withHeader('Content-Type', 'application/json');
        }



        $dato = UserModel::obtenerUsuario($id);

        if ($dato) {
            $response->getBody()->write(json_encode($dato));

            return $response
                ->withStatus(200)
                ->withHeader('Content-Type', 'application/json');
        }

        $response->getBody()->write(json_encode([
            "error" => "Usuario no encontrado"
        ]));

        return $response
            ->withStatus(404)
            ->withHeader('Content-Type', 'application/json');
    }
    public static function errorCode($response, $message, $code)
    {
        $response->getBody()->write(json_encode([
            "error" => $message
        ]));

        return $response
            ->withHeader("Content-Type", "application/json")
            ->withStatus($code);
    }
    public static function updateUser($request, $response, $args)
    {
        $data = $request->getParsedBody();

        $name = $data["name"] ?? null;
        $password = $data["password"] ?? null;

        $userIdParam = $args["user_id"];
        $userIdToken = $request->getAttribute("usuario");

        if ($userIdParam != $userIdToken) {
            return self::errorCode($response, "No autorizado", 403);
        }

        if (!$name && !$password) {
            return self::errorCode($response, "Nada para actualizar", 400);
        }

        if ($password) {
            $password = password_hash($password, PASSWORD_DEFAULT);
        }


        UserModel::updateUser($userIdParam, $name, $password);

        $response->getBody()->write(json_encode([
            "message" => "Usuario actualizado"
        ]));

        return $response->withHeader("Content-Type", "application/json");
    }
}
