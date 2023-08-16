<?php
/*
Incluyendo el archivo `pedido.php` ubicado en la carpeta `dto` dentro de la carpeta `entities`. La función 
`require_once` asegura que el archivo se incluya solo una vez para evitar errores.
*/
require_once('../../entities/dto/pedido.php');

/*El código anterior es un script PHP que maneja diversas acciones relacionadas con la gestión de pedidos. Inicia una sesión y crea una nueva instancia de la clase Pedido. Luego, verifica si el usuario ha iniciado sesión como administrador y realiza diferentes acciones según el valor del parámetro "acción" pasado a través del método GET. */
if (isset($_GET['action'])) {
    session_start();
    $pedido = new Pedido;
    $result = array('status' => 0, 'message' => null, 'exception' => null, 'dataset' => null);
    /* El código siguiente es un script de PHP que maneja diferentes acciones relacionadas con la gestión de pedidos. Verifica si el usuario ha iniciado sesión y, en función de la acción solicitada a través del método GET o POST, realiza diferentes operaciones, como leer todos los pedidos, buscar pedidos, crear un nuevo pedido, actualizar un pedido existente o eliminar un pedido. También realiza validaciones en los datos de entrada y devuelve mensajes o excepciones apropiados en función del éxito o fracaso de las operaciones. */
    if (isset($_SESSION['id_usuario'])) {
        switch ($_GET['action']) {
            case 'readAllEstados':
                if ($result['dataset'] = $pedido->readAllEstados()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen '.count($result['dataset']).' registros';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $pedido->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen '.count($result['dataset']).' registros';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
            case 'search':
                $_POST = Validator::validateForm($_POST);
                if ($_POST['search'] == '') {
                    $result['exception'] = 'Ingrese un valor para buscar';
                } elseif ($result['dataset'] = $pedido->searchRows($_POST['search'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen '.count($result['dataset']).' coincidencias';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay coincidencias';
                }
                break;
            case 'create':
                $_POST = Validator::validateForm($_POST);
                if (!$pedido->setNombre($_POST['cliente'])) {
                    $result['exception'] = 'Nombre incorrecto';
                } elseif (!$modelo->setEstado($_POST['estado'])) {
                    $result['exception'] = 'Estado incorrecto';
                } elseif (!$pedido->setDireccion($_POST['direccion'])) {
                    $result['exception'] = 'Dirección incorrecta';
                } elseif (!$pedido->setFecha($_POST['fecha'])) {
                    $result['exception'] = 'Fecha incorrecto';
                } elseif ($pedido->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Pedido creado correctamente';
                } else {
                    $result['exception'] = Database::getException();;
                }
                break;
            case 'readOne':
                if (!$pedido->setId($_POST['id'])) {
                    $result['exception'] = 'Pedido incorrecto';
                } elseif ($result['dataset'] = $pedido->readOne()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Pedido inexistente';
                }
                break;
                case 'readOneDetalle':
                    if (!$pedido->setId($_POST['id'])) {
                        $result['exception'] = 'Pedido incorrecto';
                    } elseif ($result['dataset'] = $pedido->readOneDetalle()) {
                        $result['status'] = 1;
                    } elseif (Database::getException()) {
                        $result['exception'] = Database::getException();
                    } else {
                        $result['exception'] = 'Pedido inexistente';
                    }
                    break;
            case 'update':
                $_POST = Validator::validateForm($_POST);
                if (!$pedido->setId($_POST['id'])) {
                    $result['exception'] = 'Pedido incorrecto';
                } elseif (!$data = $pedido->readOne()) {
                    $result['exception'] = 'Pedido inexistente';
                } elseif (!$pedido->setEstado($_POST['estado'])) {
                    $result['exception'] = 'Pedido incorrecto';
                }  elseif ($pedido->updateRow()) {
                        $result['status'] = 1;
                        $result['message'] = 'Pedido modificado correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'delete':
                if (!$pedido->setId($_POST['id_pedido'])) {
                    $result['exception'] = 'Pedido incorrecto';
                } elseif (!$data = $pedido->readOne()) {
                    $result['exception'] = 'Pedido inexistente';
                } elseif ($pedido->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Pedido eliminado correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'cantidadPedidosCliente':
                if ($result['dataset'] = $pedido->cantidadPedidosCliente()) {
                    $result['status'] = 1;
                } else {
                    $result['exception'] = 'No hay datos disponibles';
                }
                break;
            case 'porcentajeEstadoPedidos':
                if ($result['dataset'] = $pedido->porcentajeEstadoPedidos()) {
                    $result['status'] = 1;
                } else {
                    $result['exception'] = 'No hay datos disponibles';
                }
                break;
            default:
                $result['exception'] = 'Acción no disponible dentro de la sesión';
        }
        /* Establece el encabezado de respuesta para indicar que el contenido que se
         devuelve está en formato JSON con codificación de caracteres UTF-8, y luego
          codifica la matriz PHP `` como una cadena JSON e imprime el resultado en la salida.
           Esto permite que el código del lado
         del cliente analice fácilmente la respuesta y trabaje con los datos.*/
        header('content-type: application/json; charset=utf-8');
        print(json_encode($result));
    } else {
        print(json_encode('Acceso denegado'));
    }
} else {
    print(json_encode('Recurso no disponible'));
}
