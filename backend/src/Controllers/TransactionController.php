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
}