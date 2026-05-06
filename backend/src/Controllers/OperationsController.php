<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\AssetsModel;
use App\Models\UserModel;
use App\Models\PortfolioModel;
use App\Models\TransactionModels;

class OperationsController {

    public function buy(Request $request, Response $response): Response {// compra de un asset
        $data = $request->getParsedBody();
        $user_id = $request->getAttribute('usuario');
        $asset_id = $data['asset_id'] ?? null;
        $quantity = $data['cantidad'] ?? null;

        if ($asset_id === null) {
            return $this->respuesta($response, "error falta asset_id", 400);
        }
        if ($quantity === null) {
            return $this->respuesta($response, "error falta cantidad", 400);
        }
        if ($quantity < 1) {
            return $this->respuesta($response, "error la cantidad minima es de 1", 400);
        }

        $existe = AssetsModel::existeAsset($asset_id);
        if ($existe==false) {
            return $this->respuesta($response, "error no existe el asset id requerido", 404);
        }

        $precioAsset = $existe['precio'];
        $dato = UserModel::ObtenerSaldo($user_id);
        $saldo = $dato['balance'];

        if ($saldo < ($precioAsset * $quantity)) {
            return $this->respuesta($response, "error saldo insuficiente", 409);
        }
        $dato2=PortfolioModel::ObtenerquantityAsset($user_id,$asset_id);
        if($dato2==false){
          Portfolio::Registrar($user_id,$asset_id,$quantity);
        }
        $saldo = $saldo - ($precioAsset * $quantity);
        $quantity_total=$dato2['quantity']+$quantity;
        PortfolioModel::Actualizar($user_id,$asset_id,($quantity_total)); // si ya existe en el portfolio lo actualizo
         
        TransactionModels::Registrar($user_id, $asset_id, "buy", $quantity, $precioAsset, ($precioAsset * $quantity)); // se registra la compra 
       UserModel::ActualizarSaldo($user_id, $saldo);

        return $this->respuesta($response, "compra exitosa", 200);
    }

    private function respuesta($response, $msj, $num): Response {
        $response->getBody()->write(json_encode([$msj]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus($num);
    }
    public function sell(Request $request, Response $response): Response {// venta de un asset
        $data = $request->getParsedBody();
        $user_id = $request->getAttribute('usuario');
        $asset_id = $data['asset_id'] ?? null;
        $quantity = $data['cantidad'] ?? null;
      
        if ($asset_id === null) {
            return $this->respuesta($response, "error falta asset_id", 400);
        }
        if ($quantity === null) {
            return $this->respuesta($response, "error falta cantidad", 400);
        }
        if ($quantity < 1) {
            return $this->respuesta($response, "error la cantidad minima es de 1", 400);
        }
          $existe = AssetsModel::existeAsset($asset_id);

        if ($existe==false) {
            return $this->respuesta($response, "error no existe el asset id requerido", 404);
        }
        $dato2=PortfolioModel::ObtenerquantityAsset($user_id,$asset_id);
        if($dato2==false){
 return $this->respuesta($response,"error no tiene el asset en su portfolio",404);
        $quantity_total=$dato2['quantity'];// cantidad total de un asset;
        if($quantity_total<$quantity){
             return $this->respuesta($response,"error cantidad requerida supera a la cantidad disponible ",400);
        }
        $precioAsset = $existe['precio'];
        $dato = UserModel::ObtenerSaldo($user_id);
        $saldo = $dato['balance'];    
        $saldo=$saldo+($precioAsset*$quantity);   
       UserModel::ActualizarSaldo($user_id, $saldo);
        PortfolioModel::Actualizar($user_id, $asset_id, ($quantity_total-$quantity)); // se actualizao o se crea el portafolio con el asset id
        TransactionModels::Registrar($user_id, $asset_id, "sell", $quantity, $precioAsset, ($precioAsset * $quantity)); // se registra la compra 

        return $this->respuesta($response, "venta exitosa", 200);
    }
}
}