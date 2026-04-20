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
};
