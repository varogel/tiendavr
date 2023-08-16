<?php
require_once('../../helpers/database.php');
/*
*	Clase para manejar el acceso a datos de las entidades PEDIDO y DETALLE_PEDIDO.
*/
class PedidoQueries
{
    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */
    // Método para verificar si existe un pedido en proceso para seguir comprando, de lo contrario se crea uno.
    public function startOrder()
    {
        $sql = "SELECT id_pedido
                FROM pedidos
                WHERE estado = 'Pendiente' AND cliente_id = ?";
        $params = array($_SESSION['id_cliente']);
        if ($data = Database::getRow($sql, $params)) {
            $this->id_pedido = $data['id_pedido'];
            return true;
        } else {
            $sql = 'INSERT INTO pedidos(direccion_pedido, cliente_id)
                    VALUES((SELECT direccion_cliente FROM clientes WHERE id_cliente = ?), ?)';
            $params = array($_SESSION['id_cliente'], $_SESSION['id_cliente']);
            // Se obtiene el ultimo valor insertado en la llave primaria de la tabla pedidos.
            if ($this->id_pedido = Database::getLastRow($sql, $params)) {
                return true;
            } else {
                return false;
            }
        }
    }

    // Método para agregar un producto al carrito de compras.
    public function createDetail()
    {
        // Se realiza una subconsulta para obtener el precio del producto.
        $sql = 'INSERT INTO detalle_pedidos(producto_id, precio, cantidad, pedido_id)
                VALUES(?, (SELECT precio FROM productos WHERE id = ?), ?, ?)';
        $params = array($this->producto, $this->producto, $this->cantidad, $this->id_pedido);
        return Database::executeRow($sql, $params);
    }

    // Método para obtener los productos que se encuentran en el carrito de compras.
    public function readOrderDetail()
    {
        $sql = 'SELECT detalle_pedidos.id_detalle, productos.titulo, detalle_pedidos.precio, detalle_pedidos.cantidad
                FROM pedidos
                INNER JOIN detalle_pedidos ON pedidos.id_pedido = detalle_pedidos.pedido_id
                INNER JOIN productos ON detalle_pedidos.producto_id = productos.id
                WHERE pedidos.id_pedido = ? ORDER BY id_detalle';
        $params = array($this->id_pedido);
        return Database::getRows($sql, $params);
    }

    // Método para finalizar un pedido por parte del cliente.
    public function finishOrder()
    {
        // Se establece la zona horaria local para obtener la fecha del servidor.
        date_default_timezone_set('America/El_Salvador');
        $date = date('Y-m-d');
        $this->estado = 'Finalizado';
        $sql = 'UPDATE pedidos
                SET estado = ?, fecha = ?
                WHERE id_pedido = ?';
        $params = array($this->estado, $date, $_SESSION['id_pedido']);
        return Database::executeRow($sql, $params);
    }

    // Método para actualizar la cantidad de un producto agregado al carrito de compras.
    public function updateDetail()
    {
        $sql = 'UPDATE detalle_pedidos
                SET cantidad = ?
                WHERE id_detalle = ? AND id_pedido = ?';
        $params = array($this->cantidad, $this->id_detalle, $_SESSION['id_pedido']);
        return Database::executeRow($sql, $params);
    }

    // Método para eliminar un producto que se encuentra en el carrito de compras.
    public function deleteDetail()
    {
        $sql = 'DELETE FROM detalle_pedidos
                WHERE id_detalle = ? AND pedido_id = ?';
        $params = array($this->id_detalle, $_SESSION['id_pedido']);
        return Database::executeRow($sql, $params);
    }

    public function cantidadPedidosCliente()
    {
        $sql = 'SELECT nombre_cliente, COUNT(id_pedido) cantidad FROM pedidos INNER JOIN clientes USING(id_cliente) GROUP BY nombre_cliente ORDER BY cantidad DESC';
        return Database::getRows($sql);
    }

    
    public function porcentajeEstadoPedidos()
    {
        $sql = "SELECT estado_pedido, COUNT(*) as cantidad_pedidos, ROUND((COUNT(*) * 100.0 / (SELECT COUNT(*) FROM pedidos)), 2) as porcentaje FROM pedidos WHERE estado_pedido IN ('Finalizado', 'Pendiente', 'Entregado', 'Cancelado') GROUP BY estado_pedido";
        return Database::getRows($sql);
    }

    public function ClientesPedidos()
    {
        $sql = 'SELECT dp.cantidad_producto, a.nombre_auto, p.fecha_pedido, p.direccion_pedido, c.nombre_cliente, p.estado_pedido
                FROM detallepedidos dp
                INNER JOIN autos a ON dp.id_auto = a.id_auto
                INNER JOIN pedidos p ON dp.id_pedido = p.id_pedido
                INNER JOIN clientes c ON p.id_cliente = c.id_cliente';
        return Database::getRows($sql);
    }

    public function readAll()
    {
        $sql = 'SELECT id_pedido, nombres_cliente, fecha, direccion_pedido, estado
                FROM pedidos
                INNER JOIN clientes ON pedidos.cliente_id = clientes.id_cliente
                ORDER BY id_pedido';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT pedidos.fecha, pedidos.direccion_pedido, pedidos.estado, detalle_pedidos.cantidad, detalle_pedidos.precio, productos.titulo, clientes.nombres_cliente
                FROM pedidos
                JOIN detalle_pedidos ON pedidos.id_pedido = detalle_pedidos.pedido_id
                JOIN productos ON detalle_pedidos.producto_id = productos.id
                JOIN clientes ON clientes.id_cliente = pedidos.cliente_id
                WHERE pedidos.id_pedido = ?';
        $params = array($this->id_pedido);
        return Database::getRow($sql, $params);
    }

     /*
    *   Métodos para generar reportes.
    */

    public function pedidosClientes()
    {
        $sql = "SELECT pedidos.fecha, pedidos.direccion_pedido, pedidos.estado, detalle_pedidos.cantidad, productos.titulo
                FROM pedidos
                JOIN detalle_pedidos ON pedidos.id_pedido = detalle_pedidos.pedido_id
                JOIN productos ON detalle_pedidos.producto_id = productos.id
                WHERE pedidos.estado = 'Finalizado' and pedidos.cliente_id = ?";
        $params = array($this->cliente);
        return Database::getRows($sql, $params);
    }

    public function clientePedido()
    {
        $sql = "SELECT pedidos.fecha, pedidos.direccion_pedido, pedidos.estado, detalle_pedidos.cantidad, detalle_pedidos.precio, productos.titulo, clientes.nombres_cliente
                FROM pedidos
                JOIN detalle_pedidos ON pedidos.id_pedido = detalle_pedidos.pedido_id
                JOIN productos ON detalle_pedidos.producto_id = productos.id
                JOIN clientes ON clientes.id_cliente = pedidos.cliente_id";
        return Database::getRows($sql);
    }
}
