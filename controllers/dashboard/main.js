const PRODUCTO_API = 'business/dashboard/producto.php';
const MODELO_API = 'business/dashboard/modelo.php';
const PEDIDO_API = 'business/dashboard/pedido.php';

/* Este código agrega un event listener al documento que espera a que se cargue completamente el DOM.
Una vez que el DOM está cargado, define una variable `today` con la fecha y hora actual y luego
determina el saludo apropiado según la hora del día. Finalmente, establece el contenido de texto de
un elemento con el ID "greeting" al saludo determinado. */

document.addEventListener('DOMContentLoaded', () => {
    /*Este código define una variable `today` con la fecha y hora actual, obtiene la hora actual de esa fecha y luego determina el saludo apropiado según la hora del día. Si la hora es menor de las 12, el saludo será "Buenos días", si la hora es menor de las 19, el saludo será "Buenas tardes", y si la hora es 19 o posterior, el saludo será "Buenas noches". El saludo determinado se asigna a la variable `greeting`.. */
    let today = new Date();
    let hour = today.getHours();
    let greeting = '';
    if (hour < 12) {
        greeting = 'Buenos días';
    } else if (hour < 19) {
        greeting = 'Buenas tardes';
    } else if (hour <= 23) {
        greeting = 'Buenas noches';
    }
    document.getElementById('greeting').textContent = greeting;
    graficoBarrasCategorias();
    graficoLinealCategorias();
});

async function graficoBarrasCategorias() {
    // Petición para obtener los datos del gráfico.
    const DATA = await dataFetch(PRODUCTO_API, 'cantidadProductosCompras');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a graficar.
        let producto = [];
        let cantidades = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            producto.push(row.titulo);
            cantidades.push(row.cantidad_compras);
        });
        // Llamada a la función que genera y muestra un gráfico de barras. Se encuentra en el archivo components.js
        barGraph('chart2', producto, cantidades, 'Cantidad de produtos', 'Productos mas vendidos');

    } else {
        document.getElementById('chart2').remove();
        console.log(DATA.exception);
        
    }
}

async function graficoLinealCategorias() {
    // Petición para obtener los datos del gráfico.
    const DATA = await dataFetch(PEDIDO_API, 'cantidadPedidosCliente');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a graficar.
        let clientes = [];
        let cantidades = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            clientes.push(row.nombre_cliente);
            cantidades.push(row.cantidad);
        });
        // Llamada a la función que genera y muestra un gráfico de barras. Se encuentra en el archivo components.js
        lineGraph('chart4', clientes, cantidades, 'Cantidad de pedidos', 'Cantidad de pedidos por cliente');

    } else {
        document.getElementById('chart4').remove();
        console.log(DATA.exception);
        
    }
}
