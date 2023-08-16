// Constantes para completar las rutas de la API.
const PEDIDO_API = 'business/dashboard/pedido.php';
// Constante para establecer el formulario de guardar.
const SAVE_FORM = document.getElementById('save-form');

const SAVE_FORM_DETALLE = document.getElementById('save-form-detalle');
// Constante para establecer el título de la modal.
const MODAL_TITLE = document.getElementById('modal-title');

const MODAL_TITLE_DETALLE = document.getElementById('modal-title-detalle');

// Constantes para establecer el contenido de la tabla.
const TBODY_ROWS = document.getElementById('tbody-rows');
const RECORDS = document.getElementById('records');
// Constante tipo objeto para establecer las opciones del componente Modal.
const OPTIONS = {
    dismissible: false
}
// Inicialización del componente Modal para que funcionen las cajas de diálogo.
// Constante para establecer la modal de guardar.
const SAVE_MODAL = document.getElementById('save-modal');

// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para llenar la tabla con los registros disponibles.
    fillTable();
});

/*
  Este código implementa un filtro de búsqueda en una tabla HTML utilizando JavaScript y Bootstrap.
  Se define una función anónima autoejecutable que crea un objeto llamado LightTableFilter con un método init.
  El método init se encarga de inicializar el filtro de búsqueda en los campos de búsqueda con la clase 'light-table-filter'.
  El filtro de búsqueda se activa cuando se detecta un cambio en los campos de búsqueda y oculta o muestra filas de la tabla en función de si coinciden con el término de búsqueda.
  Se utiliza el evento 'readystatechange' para asegurarse de que el documento se ha cargado completamente antes de inicializar el filtro de búsqueda.
*/
(function(document) {
    'buscador';

    var LightTableFilter = (function(Arr) {

      var _input;

      function _onInputEvent(e) {
        _input = e.target;
        var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
        Arr.forEach.call(tables, function(table) {
          Arr.forEach.call(table.tBodies, function(tbody) {
            Arr.forEach.call(tbody.rows, _filter);
          });
        });
      }

      function _filter(row) {
        var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
        row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
      }

      return {
        init: function() {
          var inputs = document.getElementsByClassName('light-table-filter');
          Arr.forEach.call(inputs, function(input) {
            input.oninput = _onInputEvent;
          });
        }
      };
    })(Array.prototype);

    document.addEventListener('readystatechange', function() {
      if (document.readyState === 'complete') {
        LightTableFilter.init();
      }
    });

  })(document);

/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
async function fillTable(form = null) {
    // Se inicializa el contenido de la tabla.
    TBODY_ROWS.innerHTML = '';
    RECORDS.textContent = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'search' : action = 'readAll';
    // Petición para obtener los registros disponibles.
    const JSON = await dataFetch(PEDIDO_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (JSON.status) {
        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        JSON.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TBODY_ROWS.innerHTML += `
                <tr>
                    <td>${row.id_pedido}</td>
                    <td>${row.nombres_cliente}</td>
                    <td>${row.id_pedido}</td>
                    <td>${row.direccion_pedido}</td>
                </tr>
            `;
        });
        // Se muestra un mensaje de acuerdo con el resultado.
        RECORDS.textContent = JSON.message;
    } else {
        sweetAlert(4, JSON.exception, true);
    }
}


/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
async function openUpdateEstado(id) {
    // Se define un objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('id', id);
    // Petición para obtener los datos del registro solicitado.
    const JSON = await dataFetch(PEDIDO_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (JSON.status) {
        // Se restauran los elementos del formulario.
        SAVE_FORM.reset();
        // Se asigna el título para la caja de diálogo (modal).
        MODAL_TITLE.textContent = 'Actualizar Estado Pedido';

        // Se Bloquean los campos que no se pueden modificar
        document.getElementById('fecha').disabled = true;
        document.getElementById('cliente').disabled = true;
        document.getElementById('direccion').disabled = true;
        
        // Se inicializan los campos del formulario.
        document.getElementById('id').value = JSON.dataset.id_pedido;
        document.getElementById('fecha').value = JSON.dataset.fecha_pedido;
        document.getElementById('cliente').value = JSON.dataset.id_cliente;
        document.getElementById('direccion').value = JSON.dataset.direccion_pedido;
        fillSelect(PEDIDO_API, 'readAllEstados', 'estado', JSON.dataset.id_estado);
        
    } else {
        sweetAlert(2, JSON.exception, false);
    }
}

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
async function openDetalle(id) {
    // Se define un objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('id', id);
    // Petición para obtener los datos del registro solicitado.
    const JSON = await dataFetch(PEDIDO_API, 'readOneDetalle', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (JSON.status) {
        // Se restauran los elementos del formulario.
        SAVE_FORM_DETALLE.reset();
        // Se asigna el título para la caja de diálogo (modal).
        MODAL_TITLE_DETALLE.textContent = 'Detalles del Pedido';

        // Se Bloquean los campos que no se pueden modificar
        document.getElementById('cantidad').disabled = true;
        document.getElementById('precio').disabled = true;
        document.getElementById('pedido').disabled = true;
        document.getElementById('auto').disabled = true;


        // Se inicializan los campos del formulario.
        document.getElementById('id').value = JSON.dataset.id_pedido;
        document.getElementById('cantidad').value = JSON.dataset.cantidad_producto;
        document.getElementById('precio').value = JSON.dataset.precio_producto;
        document.getElementById('pedido').value = JSON.dataset.id_pedido;
        document.getElementById('auto').value = JSON.dataset.nombre_auto;
    } else {
        sweetAlert(2, JSON.exception, false);
    }
}


function openReport() {
  // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
  const PATH = new URL(`${SERVER_URL}reports/dashboard/pedido.php`);
  // Se abre el reporte en una nueva pestaña del navegador web.
  window.open(PATH.href);
}
