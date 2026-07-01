<?php

namespace App\Controllers;

use App\Models\TransactionModel;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class TransactionController
{
    public function index(Request $request, Response $response): Response
    {
        $user_id = $request->getAttribute('usuario');

        $queryParams = $request->getQueryParams();

        $type = $queryParams['type'] ?? null;

        $asset_id = $queryParams['asset_id'] ?? null;

        if ($type !== null && $type !== "buy" && $type !== "sell") {
            return $this->errorCode($response, "El type debe ser 'buy' o 'sell'", 400);
        }
        if ($asset_id !== null) {
            if (!ctype_digit($asset_id) ||  $asset_id <= 0) {
                return $this->errorCode($response, "El asset_id debe ser un número entero positivo", 400);
            }
            $asset_id = $asset_id;
        }

        $transactions = TransactionModel::getTransactions(
            $user_id,
            $type,
            $asset_id
        );

        $response->getBody()->write(json_encode($transactions));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }
    public static function errorCode($response, $message, $code)
    {
        $response->getBody()->write(json_encode([
            "error" => $message
        ]));

        return $response
            ->withHeader("Content-Type", "application/json")
            ->withStatus($code);
    }
}
