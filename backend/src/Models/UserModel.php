<?php

namespace App\Models;

use PDO;

class UserModel
{
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
