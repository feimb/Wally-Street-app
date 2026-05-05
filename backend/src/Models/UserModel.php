<?php

namespace App\Models;

use App\DB\DB;
use PDO;

class UserModel {


public static function ObtenerSaldo($id) 
{
    $pdo = DB::conexion();
   $sql="
        SELECT  balance 
        FROM users 
        WHERE id = :user_id 
    ";
    $stmt = $pdo->prepare($sql);

    $stmt->execute(['user_id' => $id]);

    return  $stmt->fetch(PDO::FETCH_ASSOC);
}
public static function ActualizarSaldo($user_id, $saldo)
{
    $pdo = DB::conexion();

    $sql = "UPDATE users 
            SET balance = :saldo 
            WHERE id = :user_id";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        'user_id' => $user_id,
        'saldo' => $saldo
    ]);

    return $stmt->rowCount() > 0;
}
}

