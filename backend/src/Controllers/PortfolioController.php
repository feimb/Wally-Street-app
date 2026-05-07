<?php

namespace App\Controllers;

use App\Models\PortfolioModel;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class PortfolioController
{
    public function index(Request $request, Response  $response): Response
    {
        $user_id = $request->getAttribute('usuario');

        $portfolio = PortfolioModel::getPortfolio($user_id);

        $response->getBody()->write(json_encode($portfolio));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }
}
