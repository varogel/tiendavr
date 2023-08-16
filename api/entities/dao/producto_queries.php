<?php
require_once('../../helpers/database.php');
/*
*	Clase para manejar el acceso a datos de la entidad PRODUCTO.
*/
class ProductoQueries
{
    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */


    public function createRow()
    {
        date_default_timezone_set('America/El_Salvador');
        $date = date('Y-m-d');
        $sql = 'INSERT INTO productos(titulo, descripcion, foto, precio, categoria_id, fecha ,estado)
                VALUES(?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->descripcion, $this->imagen, $this->precio, $this->categoria, $date , $this->estado);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id, foto, titulo, descripcion, precio, nombre, fecha, estado
                FROM productos
                INNER JOIN categorias ON productos.categoria_id = categorias.id_categoria
                        ORDER BY titulo';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id, foto, titulo, descripcion, precio, nombre, fecha, estado
                FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id_categoria
                WHERE id = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow($current_image)
    {
        // Se verifica si existe una nueva imagen para borrar la actual, de lo contrario se mantiene la actual.
        ($this->imagen) ? Validator::deleteFile($this->getRuta(), $current_image) : $this->imagen = $current_image;

        $sql = 'UPDATE productos
                SET foto = ?, titulo = ?, descripcion = ?, precio = ?, estado = ?, categoria_id = ?
                WHERE id = ?';
        $params = array($this->imagen, $this->nombre, $this->descripcion, $this->precio, $this->estado, $this->categoria, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM productos
                WHERE id = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readProductosCategoria()
    {
        $sql = 'SELECT id, foto, titulo, descripcion, precio
                FROM productos INNER JOIN categorias USING(id)
                WHERE categoria_id = ? AND estado = 1
                ORDER BY nombre_producto';
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }

    /*
    *   Métodos para generar gráficas.
    */
    public function cantidadProductosCategoria()
    {
        $sql = 'SELECT nombre, COUNT(id) cantidad
                FROM productos INNER JOIN categorias USING(id_categoria)
                GROUP BY nombre ORDER BY cantidad DESC';
        return Database::getRows($sql);
    }

    public function porcentajeProductosCategoria()
    {
        $sql = 'SELECT nombre_categoria, ROUND((COUNT(id_producto) * 100.0 / (SELECT COUNT(id_producto) FROM productos)), 2) porcentaje
                FROM productos INNER JOIN categorias USING(id_categoria)
                GROUP BY nombre_categoria ORDER BY porcentaje DESC';
        return Database::getRows($sql);
    }

    /*
    *   Métodos para generar reportes.
    */
    public function productosCategoria()
    {
        $sql = 'SELECT productos.titulo, productos.precio, productos.estado
            FROM productos
            INNER JOIN categorias ON productos.categoria_id = categorias.id_categoria
            WHERE categorias.id_categoria = ?
            ORDER BY productos.titulo';
        $params = array($this->categoria);
        return Database::getRows($sql, $params);
    }

     /*
    *   Métodos para generar graficas.
    */
    public function cantidadProductosCompras()
    {
        $sql = 'SELECT productos.titulo, COUNT(detalle_pedidos.producto_id) AS cantidad_compras
        FROM detalle_pedidos
        INNER JOIN productos ON detalle_pedidos.producto_id = productos.id
        GROUP BY detalle_pedidos.producto_id, productos.titulo
        ORDER BY cantidad_compras DESC';
        return Database::getRows($sql);
    }
}
