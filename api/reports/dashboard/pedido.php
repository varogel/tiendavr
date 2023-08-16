<?php
require_once('../../helpers/reports.php');
require_once('../../entities/dto/pedido.php');
require_once('../../entities/dto/cliente.php');
require_once('../../entities/dto/usuario.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Pedidos por cliente');
// Se instancia el módelo Categoría para obtener los datos.
$cliente = new Cliente;
$usuario = new Usuario;
// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataClientes = $cliente->readAll()) {
    if ($dataUsuarios = $usuario->readAll()) {
        foreach ($dataUsuarios as $rowUsuario) {
            $pdf->SetFont('Arial', 'B', 10);
            $pdf->Text(10, 54, utf8_decode('Usuario:'));
            $pdf->SetFont('Arial', '', 10);
            $pdf->Text(25, 54, $rowUsuario['alias_usuario']);
        }
    }
    
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(219, 226, 239);
    $pdf->SetDrawColor(255, 255, 255);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Times', 'B', 11);
    // Se imprimen las celdas con los encabezados.
    $pdf->cell(40, 10, $pdf->encodeString('Titulo'), 1, 0, 'C', 1);
    $pdf->cell(20, 10, 'Cantidad', 1, 0, 'C', 1);
    $pdf->cell(36, 10, 'Fecha', 1, 0, 'C', 1);
    $pdf->cell(60, 10, $pdf->encodeString('Dirección'), 1, 0, 'C', 1);
    $pdf->cell(30, 10, 'Estado', 1, 1, 'C', 1);

    // Se establece un color de relleno para mostrar el nombre de la categoría.
    $pdf->SetFillColor(249, 247, 247);
    
    // Se establece la fuente para los datos de los productos.
    $pdf->setFont('Times', '', 11);

    // Se recorren los registros fila por fila.
    foreach ($dataClientes as $rowClientes) {
        // Se imprime una celda con el nombre de la categoría.
        $pdf->cell(0, 10, $pdf->encodeString('Cliente: ' . $rowClientes['nombres_cliente']), 1, 1, 'C', 1);
        // Se instancia el módelo Producto para procesar los datos.
        $pedido = new Pedido;
        // Se establece la categoría para obtener sus productos, de lo contrario se imprime un mensaje de error.
        if ($pedido->setCliente($rowClientes['id_cliente'])) {
            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($dataPedidos = $pedido->pedidosClientes()) {
                // Se recorren los registros fila por fila.
                foreach ($dataPedidos as $rowPedido) {
                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->cell(40, 10, $pdf->encodeString($rowPedido['titulo']), 1, 0, 'C', 0);
                    $pdf->cell(20, 10, $pdf->encodeString($rowPedido['cantidad']), 1, 0, 'C', 0);
                    $pdf->cell(36, 10, $pdf->encodeString($rowPedido['fecha']), 1, 0, 'C', 0);
                    $pdf->cell(60, 10, $pdf->encodeString($rowPedido['direccion_pedido']), 1, 0, 'C', 0);
                    $pdf->cell(30, 10, $pdf->encodeString($rowPedido['estado']), 1, 1, 'C', 0);
                }
            } else {
                $pdf->cell(0, 10, $pdf->encodeString('No hay pedidos para el cliente'), 1, 1);
            }
        } else {
            $pdf->cell(0, 10, $pdf->encodeString('Cliente incorrecto o inexistente'), 1, 1);
        }
    }
} else {
    $pdf->cell(0, 10, $pdf->encodeString('No hay clientes para mostrar'), 1, 1);
}
// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'Pedidos.pdf');
