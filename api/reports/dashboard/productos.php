<?php
require_once('../../helpers/reports.php');
require_once('../../entities/dto/producto.php');
require_once('../../entities/dto/categoria.php');
require_once('../../entities/dto/usuario.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Productos por categoría');
// Se instancia el módelo Categoría para obtener los datos.
$categoria = new Categoria;
$usuario = new Usuario;
// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataCategorias = $categoria->readAll()) {
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
    $pdf->cell(126, 10, 'Nombre', 1, 0, 'C', 1);
    $pdf->cell(30, 10, 'Precio (US$)', 1, 0, 'C', 1);
    $pdf->cell(30, 10, 'Estado', 1, 1, 'C', 1);

    // Se establece un color de relleno para mostrar el nombre de la categoría.
    $pdf->SetFillColor(249, 247, 247);
    
    // Se establece la fuente para los datos de los productos.
    $pdf->setFont('Times', '', 11);

    // Se recorren los registros fila por fila.
    foreach ($dataCategorias as $rowCategoria) {
        // Se imprime una celda con el nombre de la categoría.
        $pdf->cell(0, 10, $pdf->encodeString('Categoría: ' . $rowCategoria['nombre']), 1, 1, 'C', 1);
        // Se instancia el módelo Producto para procesar los datos.
        $auto = new Producto;
        // Se establece la categoría para obtener sus productos, de lo contrario se imprime un mensaje de error.
        if ($auto->setCategoria($rowCategoria['id_categoria'])) {
            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($dataAutos = $auto->productosCategoria()) {
                // Se recorren los registros fila por fila.
                foreach ($dataAutos as $rowAuto) {
                    ($rowAuto['estado']) ? $estado = 'Activo' : $estado = 'Inactivo';
                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->cell(126, 10, $pdf->encodeString($rowAuto['titulo']), 1, 0, 'C', 0);
                    $pdf->cell(30, 10, $rowAuto['precio'], 1, 0, 'C', 0);
                    $pdf->cell(30, 10, $estado, 1, 1, 'C', 0);
                }
            } else {
                $pdf->cell(0, 10, $pdf->encodeString('No hay autos para la categoría'), 1, 1);
            }
        } else {
            $pdf->cell(0, 10, $pdf->encodeString('Categoría incorrecta o inexistente'), 1, 1);
        }
    }
} else {
    $pdf->cell(0, 10, $pdf->encodeString('No hay categorías para mostrar'), 1, 1);
}
// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'Productos.pdf');
