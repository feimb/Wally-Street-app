<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\AssetsModel;
use App\Models\userModel;

class AssetsController
{
public function index(Request $request, Response $response): Response // mostrar assets segun los parametros
{  
    $query = $request->getQueryParams();

    $min = $query['min'] ?? null;
    $max = $query['max'] ?? null;
    $nom = $query['nombre'] ?? null;
    
    $data = AssetsModel::obtenerAssets($pdo,$min, $max, $nom);

    if (empty($data)) {
       return  $this->respuesta($response,"no hay assets disponibles",404);
    }
    $response->getBody()->write(json_encode($data));
return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
}
public function retreive(Request $request, Response $response,  $args): Response  // mostrar ultimos 5 cambios de precio de un asset
{
    $asset_id=(int)$args['asset_id'];
    $quantity = (int) $args['quantity'];
    if(AssetsModel::existe($asset_id)==false){
        return $this->respuesta($response,"error el asset no existe",404);
    }
    if($quantity<0){
       return $this->respuesta($response,"error no puede ser menor que 1",400);
    }
  $quantity=min($quantity,5);// limitamos el acceso por mas que el usuario quiera mas de 5
    $data = AssetsModel::ObtenerCambios($asset_id, $quantity);

    if (empty($data)) {
       return $this->respuesta($response,"el asset actual no tiene cambios",400);
    }

    $response->getBody()->write(json_encode($data));

    return $response
        ->withStatus(200)
        ->withHeader('Content-Type', 'application/json');
}

public function actualizarAssets(Request $request, Response $response): Response  {   
    $user_id = $request->getAttribute('usuario');
    $dato = AssetsModel::ObtenerInfoAssets();
    $admin=UserModel::esAdmin($user_id);
    if($admin==false){
        return $this->respuesta($response,"acceso denegado ",410);
    }
    if (empty($dato)) {
        return $this->respuesta($response, "no hay assets disponibles", 404);
    }

    foreach ($dato as $asset) {
     $nuevoPrecio = $this->variarPrecio($asset["current_price"]);

       AssetsModel::actualizarAsset($asset["id"], $nuevoPrecio);
        
    }
 
    return $this->respuesta($response, "actualizado correctamente", 200);
}
private function variarPrecio($precioActual){
    $direccion = mt_rand(-100, 100) / 100;

    $delta = $precioActual * $direccion * 0.05;

    $nuevoPrecio = $precioActual + $delta;

    return max(0.01, $nuevoPrecio);
}
    private function respuesta($response, $msj, $num): Response {
        $response->getBody()->write(json_encode([$msj]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus($num);
    }
    }
