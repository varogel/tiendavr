// Constante para completar la ruta de la API.
const PRODUCTO_API = 'business/public/producto.php';
// Constante tipo objeto para obtener los parámetros disponibles en la URL.
const PARAMS = new URLSearchParams(location.search);
// Constantes para establecer el contenido principal de la página web.
const TITULO = document.getElementById('title');
const PRODUCTOS = document.getElementById('productos');

// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Petición para solicitar los productos de la categoría seleccionada.
    const JSON = await dataFetch(PRODUCTO_API, 'readAll');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (JSON.status) {
        // Se inicializa el contenedor de productos.
        PRODUCTOS.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        JSON.dataset.forEach(row => {
            // Se crean y concatenan las tarjetas con los datos de cada producto.
            PRODUCTOS.innerHTML += `
            <div class="col-md-3">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h1 class="text-center titulo-producto"> ${row.titulo}</h1>
              </div>
              <div class="panel-body">
                <img src="${SERVER_URL}images/productos/${row.foto}" class="img-responsive" />
              </div>
              <div class="panel-footer">
                <a href="detalles.html?id=${row.id}" class="btn btn-success btn-block"> 
                  <span class="glyphicon glyphicon-shopping-cart"></span> Comprar
                </a>
              </div>
            </div>
          </div>
            `;
        });
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        TITULO.textContent = JSON.exception;
    }
});