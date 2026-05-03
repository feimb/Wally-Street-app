<?php

namespace App\Models;

use PDO;
use App\DB\DB;

class UserModel
{
    //creacion de usuario
    public static function obtenerUsuarios()
    { // obtiene los usuarios solo admin
        $pdo = DB::conexion();

        $sql = "SELECT  users.name AS Nombre, COALESCE(SUM(porta.quantity * assets.current_price), 0) AS Total FROM users LEFT JOIN portfolio porta ON users.id = porta.user_id LEFT JOIN assets ON porta.asset_id = assets.id GROUP BY users.name;
;
";
        $stmt = $pdo->query($sql);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public static function obtenerUsuario($id) // solo el mismo usuario o un admin
    {
        $pdo = DB::conexion();

        $sql = "SELECT 
    users.name AS Nombre,users.balance as Saldo,
    COALESCE(SUM(porta.quantity * assets.current_price), 0) AS Total              
    FROM users
    LEFT JOIN portfolio porta ON users.id = porta.user_id
    LEFT JOIN assets ON porta.asset_id = assets.id
    WHERE users.id = :id
    GROUP BY users.id, users.name;";

        $stmt = $pdo->prepare($sql);
        $stmt->execute(['id' => $id]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function existe($email)
    {
        $pdo = DB::conexion();

        $sql = "SELECT id,password FROM users WHERE email = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$email]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        return $user;
    }
    public static function crearUsuario($email, $password, $name)
    {
        $pdo = DB::conexion();

        $sql = "INSERT INTO users (email, password, name)
            VALUES (:email, :password, :name)";

        $stmt = $pdo->prepare($sql);

        return $stmt->execute([
            'email' => $email,
            'password' => $password,
            'name' => $name
        ]);
    }

    public static function getByEmail($pdo, $email)
    {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->execute(['email' => $email]);

        return  $stmt->fetch(PDO::FETCH_ASSOC);
    }
    public static function esAdmin($id) // verifico si es admin
    {
        $pdo = DB::conexion();
        $sql = "
        SELECT 1 
        FROM users 
        WHERE id = :user_id AND is_admin = true
    ";
        $stmt = $pdo->prepare($sql);

        $stmt->execute(['user_id' => $id]);

        return (bool) $stmt->fetch();
    }




    //login
    public static function getByEmail($pdo, $email)
    {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->execute(['email' => $email]);

        return  $stmt->fetch(PDO::FETCH_ASSOC);
    }
    public static function setTokenNull($pdo, $token)
    {
        $stmt = $pdo->prepare("
        UPDATE users 
        SET token = NULL, token_expired_at = NULL 
        WHERE token = :token
    ");

        $stmt->execute([
            "token" => $token
        ]);
    }
    public static function getByToken($pdo, $token)
    {
        $stmt = $pdo->prepare("
        SELECT id, token, token_expired_at 
        FROM users 
        WHERE token = :token
    ");

        $stmt->execute([
            "token" => $token
        ]);

        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
    public static function updateToken($pdo, $id, $token, $expired)
    {
        $stmt = $pdo->prepare("
        UPDATE users  
        SET token = :token, token_expired_at = :expired  
        WHERE id = :id
    ");

        $stmt->execute([
            "token" => $token,
            "expired" => $expired,
            "id" => $id
        ]);
    }
};
