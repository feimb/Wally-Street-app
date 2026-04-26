<?php
namespace App\Controllers;

use Firebase\JWT\JWT;

use App\DB\DB;
use App\Models\UserModel;
use App\app\Middleware\IsLoggedMiddleware;

class AuthController{
    public static function login($request, $response){

        $data = $request->getParsedBody();

        $email = $data['email'] ??  '';
        $password  = $data['password'] ??  '';


        $pdo = DB::conexion();


        $users = UserModel::getByEmail($pdo, $email);

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
            "expired_at" => $expire
        ], IsLoggedMiddleware::$secret, 'HS256');

        $response->getBody()->write(json_encode([
            "mensaje" => "Usuario logueado",
            "token" => $token
        ]));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }
};