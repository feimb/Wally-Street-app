<?php

namespace App\Models;

use App\DB\DB;
use PDO;

class TransactionModel
{
    public static function getTransactions($user_id, $type = null, $asset_id = null)
    {
        $pdo = DB::conexion();

        $sql = "
            SELECT 
                transactions.id,
                assets.name AS asset,
                transactions.transaction_type,
                transactions.quantity,
                transactions.price_per_unit,
                transactions.total_amount,
                transactions.transaction_date
            FROM transactions
            JOIN assets 
                ON transactions.asset_id = assets.id
            WHERE transactions.user_id = :user_id
        ";

        $params = [
            "user_id" => $user_id
        ];

        // filtro type
        if ($type !== null) {

            $sql .= " AND transactions.transaction_type = :type";

            $params["type"] = $type;
        }

        // filtro asset
        if ($asset_id !== null) {

            $sql .= " AND transactions.asset_id = :asset_id";

            $params["asset_id"] = $asset_id;
        }

        // ordenar por fecha DESC
        $sql .= " ORDER BY transactions.transaction_date DESC";

        $stmt = $pdo->prepare($sql);

        $stmt->execute($params);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}