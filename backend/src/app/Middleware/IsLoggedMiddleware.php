<?php

declare(strict_types=1);

namespace App\app\Middleware;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface as Middleware;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Psr\Http\Message\ResponseFactoryInterface;

class IsLoggedMiddleware implements Middleware
{
    private ResponseFactoryInterface $responseFactory;

    public static string $secret = 'claveSecretaHarveyOswald123456789';

    public function __construct(ResponseFactoryInterface $responseFactory)
    {
        $this->responseFactory = $responseFactory;
    }

    public function process(Request $request, RequestHandler $handler): Response 
    {
        try {
            if ($request->hasHeader("Authorization")) {
                
                $token = str_replace('Bearer ', '', $request->getHeaderLine("Authorization"));

                if (!empty($token)) {

                    $key = new Key(self::$secret, "HS256");
                    $dataToken = JWT::decode($token, $key);

                    $now = new \DateTime();
                    $expire = new \DateTime($dataToken->expired_at);

                    // token vencido
                    if ($expire < $now) {
                        $response = $this->responseFactory->createResponse();
                        $response->getBody()->write(json_encode([
                            "error" => "Token vencido"
                        ]));

                        return $response
                            ->withHeader("Content-Type", "application/json")
                            ->withStatus(401);
                    }
                    // renovacion
                    $nuevoPayload = [
                        "usuario" => $dataToken -> usuario,
                        "expired_at" => (new \DateTime('+5 minutes')) -> format("Y-m-d H:i:s")
                    ];

                    $nuevoToken = JWT::encode($nuevoPayload, self::$secret, 'HS256');

                    $request = $request->withAttribute('usuario', $dataToken-> usuario);

                    $response  = $handler->handle($request);

                    return $response->withHeader('Authorization', 'Bearer ' . $nuevoToken);
                }
            }

           
            $response = $this->responseFactory->createResponse();
            $response->getBody()->write(json_encode([
                "error" => "Acción requiere login"
            ]));

            return $response
                ->withHeader("Content-Type", "application/json")
                ->withStatus(401);

        } catch (\Exception $e) {

            $response = $this->responseFactory->createResponse();
            $response->getBody()->write(json_encode([
                "error" => $e->getMessage()
            ]));

            return $response
                ->withHeader("Content-Type", "application/json")
                ->withStatus(500);
        }
    }
}