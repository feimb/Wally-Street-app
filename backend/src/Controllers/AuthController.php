<?php

namespace App\Controllers;

use Firebase\JWT\JWT;

use App\DB\DB;
use App\Models\UserModel;
use App\app\Middleware\IsLoggedMiddleware;

class AuthController
{
    public static function login($request, $response)
    {

        $data = $request->getParsedBody();


        $email = $data['email'] ??  '';
        $password  = $data['password'] ??  '';


        $pdo = DB::conexion();


        $users = UserModel::getTokenByEmail($pdo, $email);

        if (!$users || !password_verify($password, $users['password'])) {

            $response->getBody()->write(json_encode([
                "error" => "Credenciales inválidas"
            ]));

            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(401);
        }

        $expire = (new \DateTime("now"))
            ->modify("+5 minutes")
            ->format("Y-m-d H:i:s");

        $token = JWT::encode([
            "usuario" => $users["id"],
            "token_expired_at" => $expire
        ], IsLoggedMiddleware::$secret, 'HS256');

        $response->getBody()->write(json_encode([
            "mensaje" => "Usuario logueado",
            "token" => $token
        ]));
        UserModel::updateToken(
            $pdo,
            $users["id"],
            $token,
            $expire
        );
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }
    public static function logout($request, $response)
    {
        $authHeader = $request->getHeaderLine('Authorization');
        $token = str_replace('Bearer ', '', $authHeader);

        $pdo = DB::conexion();

        $user = UserModel::getByToken($pdo, $token);

        if (!$user) {
            $response->getBody()->write(json_encode([
                "error" => "Token inválido"
            ]));

            return $response
                ->withHeader("Content-Type", "application/json")
                ->withStatus(401);
        }

        UserModel::updateToken($pdo, $user["id"], null, null);

        $response->getBody()->write(json_encode([
            "message" => "Logout exitoso"
        ]));

        return $response->withHeader("Content-Type", "application/json");
    }
};
