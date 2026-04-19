<?php

namespace App\Models;

use App\DB\DB;
use PDO;

class UserModel {

public static function obtenerUsuarios() {
    $pdo = DB::conexion();

    $sql = "SELECT name FROM users";
    $stmt = $pdo->query($sql);

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

public static function obtenerUsuario($id)
{
        $pdo = DB::conexion();

        $sql = "SELECT name FROM users WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);

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
public static function crearUser($email, $password, $nombre)
{
    $pdo = DB::conexion();

    $sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);

    try {
        return $stmt->execute([
            $nombre,
            $email,
            password_hash($password, PASSWORD_BCRYPT)
        ]);
    } catch (\PDOException $e) {
        die("ERROR DB: " . $e->getMessage());
    }
}
}

