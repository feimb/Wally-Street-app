<?php

namespace App\DB;

use PDO;


class DB
{

    public static function conexion()
    {
        return new PDO(
            "mysql:host={$_ENV['DB_HOST']};port={$_ENV['DB_PORT']};dbname={$_ENV['DB_NAME']};charset=utf8mb4",
            $_ENV['DB_USER'],
            $_ENV['DB_PASS']
        );
    }

    public static function obtenerUno($tabla, $id)
    {
        $pdo = self::conexion();

        $allowedTables = ['users'];
        if (!in_array($tabla, $allowedTables)) {
            throw new \Exception("Tabla no permitida");
        }

        $stmt = $pdo->prepare("SELECT name, ape FROM $tabla WHERE id = :id");
        $stmt->execute(['id' => $id]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function obtenerUsuarios($tabla)
    {
        $pdo = self::conexion();

        $allowedTables = ['users'];
        if (!in_array($tabla, $allowedTables)) {
            throw new \Exception("Tabla no permitida");
        }

        $stmt = $pdo->prepare("SELECT name, ape FROM $tabla");
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public static function ObtenerAssets($tabla)
    {
        $pdo = self::conexion();

        $allowedTables = ['assets'];

        if (!in_array($tabla, $allowedTables)) {
            throw new \Exception("Tabla no permitida o inválida");
        }

        $sql = "SELECT name, current_price FROM $tabla";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
echo $_ENV['DB_NAME'];