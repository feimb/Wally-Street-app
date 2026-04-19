<?php

namespace App\Models;

use App\DB\DB;
use PDO;

class AssetsModel {

public static function obtenerAssets($min,$max,$nom) {
    $pdo = DB::conexion();


    $sql = "SELECT name, current_price FROM assets WHERE 1=1";
    $params = [];
    if ($min !== null) {
        $sql .= " AND current_price >= ?";
        $params[] = $min;
    }
    if ($max !== null) {
        $sql .= " AND current_price <= ?";
        $params[] = $max;
    }

    if ($nom !== null) {
        $sql .= " AND name = ?";
        $params[] = $nom;
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
public static function ObtenerCambios($asset_id, $quantity) {
    $pdo = DB::conexion();

    $sql = "SELECT price_per_unit AS price, transaction_date
            FROM transactions
            WHERE asset_id = ?
            ORDER BY transaction_date DESC
            LIMIT ?";

    $stmt = $pdo->prepare($sql);
 $stmt->bindValue(1, $asset_id, PDO::PARAM_INT);
    $stmt->bindValue(2, (int)$quantity, PDO::PARAM_INT);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
}
