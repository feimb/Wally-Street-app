<?php

namespace App\Models;

use App\DB\DB;
use PDO;

class PortfolioModel
{
    public static function getPortfolio($user_id)
    {
        $pdo = DB::conexion();

        $sql = "
            SELECT 
                assets.name AS asset,
                portfolio.quantity,
                assets.current_price,
                (portfolio.quantity * assets.current_price) AS total_value
            FROM portfolio
            JOIN assets 
                ON portfolio.asset_id = assets.id
            WHERE portfolio.user_id = :user_id
        ";

        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            "user_id" => $user_id
        ]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public static function getAssetByUser($user_id, $asset_id)
    {
        $pdo = DB::conexion();

        $sql = "
        SELECT *
        FROM portfolio
        WHERE user_id = :user_id
        AND asset_id = :asset_id
    ";

        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            "user_id" => $user_id,
            "asset_id" => $asset_id
        ]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    public static function deleteAsset($user_id, $asset_id)
    {
        $pdo = DB::conexion();

        $sql = "
        DELETE FROM portfolio
        WHERE user_id = :user_id
        AND asset_id = :asset_id
    ";

        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            "user_id" => $user_id,
            "asset_id" => $asset_id
        ]);
    }
    //trade
    public static function Registrar($user_id, $asset_id, $quantity)
    {
        $pdo = DB::conexion();

        $sql = "INSERT INTO portfolio (user_id, asset_id, quantity) VALUES (:user_id, :asset_id, :quantity)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['user_id' => $user_id, 'asset_id' => $asset_id, 'quantity' => $quantity]);


        return $stmt->rowCount() > 0;
    }
    public static function ObtenerquantityAsset($user_id, $asset_id,)
    { // obtiene la cantidad de assets que compro un usuario
        $pdo = DB::conexion();
        $sql = "SELECT quantity FROM portfolio WHERE user_id = :user_id AND asset_id = :asset_id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['user_id' => $user_id, 'asset_id' => $asset_id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    public static function Actualizar($user_id, $asset_id, $quantity)
    { // actualiza el portafolio
        $pdo = DB::conexion();
        $sql = "UPDATE portfolio
            SET quantity = :quantity
            WHERE user_id = :user_id AND asset_id = :asset_id";

        $stmt = $pdo->prepare($sql);

        return $stmt->execute([
            'quantity' => $quantity,
            'user_id' => $user_id,
            'asset_id' => $asset_id
        ]);
    }
    public static function existe($user_id, $asset_id): bool
    {
        $pdo = DB::conexion();

        $sql = "SELECT 1 FROM portfolio 
            WHERE user_id = :user_id AND asset_id = :asset_id
            ";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'user_id' => $user_id,
            'asset_id' => $asset_id
        ]);

        return $stmt->fetch() != false;
    }
}
