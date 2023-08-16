<?php
require_once('../../helpers/validator.php');
require_once('../../entities/dao/pedido_queries.php');
/*
*	Clase para manejar la transferencia de datos de las entidades PEDIDO y DETALLE_PEDIDO.
*/
class Pedido extends PedidoQueries
{
    // Declaración de atributos (propiedades).
    protected $id_pedido = null;
    protected $id_detalle = null;
    protected $cliente = null;
    protected $producto = null;
    protected $cantidad = null;
    protected $precio = null;
    protected $estado = null; // Valor por defecto en la base de datos: Pendiente
    /*
    *   ESTADOS PARA UN PEDIDO
    *   Pendiente. Es cuando el pedido esta en proceso por parte del cliente y se puede modificar el detalle.
    *   Finalizado. Es cuando el cliente finaliza el pedido y ya no es posible modificar el detalle.
    *   Entregado. Es cuando la tienda ha entregado el pedido al cliente.
    *   Anulado. Es cuando el cliente se arrepiente de haber realizado el pedido.
    */

    /*
    *   Métodos para validar y asignar valores de los atributos.
    */
    public function setIdPedido($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_pedido = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setIdDetalle($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_detalle = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setCliente($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->cliente = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setProducto($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->producto = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setCantidad($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->cantidad = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setPrecio($value)
    {
        if (Validator::validateMoney($value)) {
            $this->precio = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setEstado($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->estado = $value;
            return true;
        } else {
            return false;
        }
    }

    /*
    *   Métodos para obtener valores de los atributos.
    */
    public function getIdPedido()
    {
        return $this->id_pedido;
    }


    public function getCliente()
    {
        return $this->cliente;
    }
}
