<?php
require_once('../../helpers/database.php');
/*
*	Clase para manejar el acceso a datos de las entidades PEDIDO y DETALLE_PEDIDO.
*/
class HistorialQueries
{
    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */
    
    // Método para obtener los productos que se encuentran en el carrito de compras.
    public function readPedido()
    {
        $sql = "SELECT id_pedido, fecha, direccion_pedido, estado
                FROM pedidos
                WHERE estado != 'Pendiente'";
        $params = array();
        return Database::getRows($sql, $params);
    }
    
    public function readOrderFinish()
    {
        $sql = 'SELECT detalle_pedidos.id_detalle, productos.titulo, detalle_pedidos.precio, detalle_pedidos.cantidad
        FROM pedidos
        INNER JOIN detalle_pedidos ON pedidos.id_pedido = detalle_pedidos.pedido_id
        INNER JOIN productos ON detalle_pedidos.producto_id = productos.id
        WHERE pedidos.id_pedido = ? ';
        $params = array($this->id_pedido);
        return Database::getRows($sql, $params);
    }

}
