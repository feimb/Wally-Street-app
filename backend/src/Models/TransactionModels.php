<?php
namespace App\Models;
use App\DB\DB;
use PDO;
class TransactionModels {
    public static function Registrar($user_id, $asset_id, $tipo, $quantity, $priceUnit, $total) {
        $pdo = DB::conexion();
        $sql = "INSERT INTO transactions (user_id, asset_id, transaction_type, quantity, price_per_unit, total_amount) 
                VALUES (:user_id, :asset_id, :transaction_type, :quantity, :price_per_unit, :total_amount)";
        $stmt = $pdo->prepare($sql);
        return $stmt->execute([
            'user_id'          => $user_id,
            'asset_id'         => $asset_id,
            'transaction_type' => $tipo,
            'quantity'         => $quantity,
            'price_per_unit'   => $priceUnit,
            'total_amount'     => $total
        ]);
    }
}