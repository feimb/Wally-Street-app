<?php

namespace App\Models;

use App\DB\DB;
use PDO;

class AssetsModel {


public static function existeAsset($id) {

    $pdo = DB::conexion();

    $sql = "SELECT current_price as precio FROM assets WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $id]);

    return $stmt->fetch(PDO::FETCH_ASSOC);
}
}