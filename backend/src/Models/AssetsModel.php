<?php

namespace App\Models;

use App\DB\DB;
use PDO;

class AssetsModel {

public static function obtenerAssets($min, $max, $nom) {
    $pdo = DB::conexion();

    $sql = "SELECT name as Nombre, current_price as Precio FROM assets WHERE 1";
    $params = [];

    if ($min !== null) {
        $sql .= " AND current_price >= :min";
        $params["min"] = $min;
    }

    if ($max !== null) {
        $sql .= " AND current_price <= :max";
        $params["max"] = $max;
    }

    if ($nom !== null) {
        $sql .= " AND name = :nom"; 
        $params["nom"] = $nom;
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
public static function ObtenerCambios($asset_id, $quantity) {
    $pdo = DB::conexion();

    $sql = "SELECT price_per_unit AS precio, transaction_date FROM transactions WHERE asset_id = :asset_id ORDER BY transaction_date DESC LIMIT :quantity";

    $stmt = $pdo->prepare($sql);

    $stmt->bindValue(':asset_id', (int)$asset_id, PDO::PARAM_INT);
    $stmt->bindValue(':quantity', (int)$quantity, PDO::PARAM_INT);

    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}


public static function existe($id):bool { // comprueba si el asset existe

    $pdo = DB::conexion();

    $sql = "SELECT 1 FROM assets WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $id]);

    return (bool) $stmt->fetch();
}

public static function ObtenerInfoAssets()
{
    $pdo = DB::conexion();

    $sql = "SELECT id, current_price, last_update FROM assets";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
public static function actualizarAsset($asset_id, $precio)
{
    $pdo = DB::conexion();

    $sql = "UPDATE assets  SET current_price = :current_price WHERE id = :asset_id";

    $stmt = $pdo->prepare($sql);

    $stmt->execute(["current_price" => $precio,"asset_id" => $asset_id
    ]);

    return $stmt->rowCount() > 0;
}
}