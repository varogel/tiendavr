<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/receipt.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se verifica si existe un valor para la categoría, de lo contrario se muestra un mensaje.
if (isset($_GET['id_pedido'])) {
    // Se incluyen las clases para la transferencia y acceso a datos.
    require_once('../../entities/dto/pedido.php');
    // Se instancian las entidades correspondientes.
    $pedido = new Pedido;
    // Se establece el valor de la categoría, de lo contrario se muestra un mensaje.
    if ($pedido->setIdPedido($_GET['id_pedido'])) {
        if ($rowPedido = $pedido->readOne()) {
            // Se inicia el reporte con el encabezado del documento.
            $pdf->startReport($rowPedido['titulo']);
            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($dataPedido = $pedido->clientePedido()) {

                $pdf->Text(25,48, 'Fecha/Hora: ' . date($rowPedido['fecha']));
                $pdf->SetFont('Arial', 'B', 10);
                $pdf->Text(10, 54, utf8_decode('Cliente:'));
                $pdf->SetFont('Arial', '', 10);
                $pdf->Text(25, 54, $rowPedido['nombres_cliente']);
                // Se establece un color de relleno para los encabezados.
                $pdf->setFillColor(225);
                // Se establece la fuente para los encabezados.
                $pdf->setFont('Times', 'B', 11);
                // Se imprimen las celdas con los encabezados.
                $pdf->cell(66, 10, 'Producto', 1, 0, 'C', 1);
                $pdf->cell(20, 10, 'Cantidad', 1, 0, 'C', 1);
                $pdf->cell(40, 10, utf8_decode('Precio'), 1, 0, 'C', 1);
                $pdf->cell(35, 10, utf8_decode('Estado'), 1, 0, 'C', 1);
                $pdf->cell(25, 10, utf8_decode('Total'), 1, 1, 'C', 1);
                // Se establece la fuente para los datos de los productos.
                $pdf->setFont('Times', '', 11);

                // Variables para almacenar el total de la suma
                $totalSum = 0;

                // Se recorren los registros fila por fila.
                foreach ($dataPedido as $rowPedido) {
                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->cell(66, 10, $pdf->encodeString($rowPedido['titulo']), 1, 0, 'C', 0);
                    $pdf->cell(20, 10, $pdf->encodeString($rowPedido['cantidad']), 1, 0, 'C', 0);
                    $pdf->cell(40, 10, $pdf->encodeString($rowPedido['precio']), 1, 0, 'C', 0);
                    $pdf->cell(35, 10, $pdf->encodeString($rowPedido['estado']), 1, 0, 'C', 0);
                    $subtotal = $rowPedido['precio'] * $rowPedido['cantidad'];
                    $totalSum += $subtotal;
                    $pdf->cell(25, 10, $pdf->encodeString($subtotal), 1, 1, 'C', 0);
                }

                // Agregar la celda adicional con el total de la suma
                $pdf->cell(166, 10, 'Total:', 1, 0, 'R', 0);
                $pdf->cell(20, 10, $pdf->encodeString($totalSum), 1, 1, 'C', 0);
            } else {
                $pdf->cell(0, 10, $pdf->encodeString('No hay factura'), 1, 1);
            }
            // Se llama implícitamente al método footer() y se envía el documento al navegador web.
            $pdf->output('I', 'factura.pdf');
        } else {
            print('Factura inexistente');
        }
    } else {
        print('Factura incorrecta');
    }
} else {
    print('Debe seleccionar una Pedido');
}
?>
