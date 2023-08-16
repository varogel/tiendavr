/* `const PEDIDO_API = 'business/public/historial.php';` is assigning a string value
`'business/public/historial.php'` to a constant variable `PEDIDO_API`. This variable is likely being
used as the endpoint for an API that is being called in the `fillTable()` function. */
const PEDIDO_API = 'business/public/historial.php';
/* `const TBODY_ROWS = document.getElementById('tbody-rows');` is assigning the HTML element with the
ID 'tbody-rows' to a constant variable `TBODY_ROWS`. This variable is likely being used to
manipulate the contents of the table body element in the HTML document. */
const TBODY_ROWS = document.getElementById('tbody-rows');
/* `const RECORDS = document.getElementById('records');` is assigning the HTML element with the ID
'records' to a constant variable `RECORDS`. This variable is likely being used to display a message
indicating the number of records retrieved from the API and displayed in the table. */
const RECORDS = document.getElementById('records');
/* The code is adding an event listener to the `document` object that listens for the
`DOMContentLoaded` event, which is fired when the initial HTML document has been completely loaded
and parsed. When this event is triggered, the `fillTable()` function is called, which populates a
table with data retrieved from an API. */

/* `document.addEventListener('DOMContentLoaded', () => { fillTable(); });` is adding an event listener
to the `document` object that listens for the `DOMContentLoaded` event, which is fired when the
initial HTML document has been completely loaded and parsed. When this event is triggered, the
`fillTable()` function is called, which populates a table with data retrieved from an API. */
document.addEventListener('DOMContentLoaded', () => {
    fillTable();
});


/* The code is defining a self-invoking function that takes the `document` object as a parameter.
Within this function, a variable `LightTableFilter` is defined as a function that takes an array
`Arr` as a parameter. The function then defines two inner functions `_onInputEvent` and `_filter`
that are used to filter table rows based on user input. The `init` method of the `LightTableFilter`
function adds an event listener to all input elements with the class `light-table-filter` and calls
the `_onInputEvent` function when the input value changes. Finally, the self-invoking function adds
an event listener to the `document` object that calls the `init` method of the `LightTableFilter`
function when the document is fully loaded. */

(function(document) {
    'buscador';

    var LightTableFilter = (function(Arr) {

      var _input;

     /**
      * The function filters table rows based on user input.
      * @param e - The parameter "e" is an event object that contains information about the input event
      * that triggered the function. It is likely an instance of the Event class or one of its
      * subclasses.
      */
      function _onInputEvent(e) {
        _input = e.target;
        var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
        Arr.forEach.call(tables, function(table) {
          Arr.forEach.call(table.tBodies, function(tbody) {
            Arr.forEach.call(tbody.rows, _filter);
          });
        });
      }

     /**
      * This function filters rows based on the input value and hides rows that do not match.
      * @param row - The row parameter is a reference to a DOM element representing a table row.
      */
      function _filter(row) {
        var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
        row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
      }

     /* This code is defining and returning an object with a single method `init`. The `init` method
     adds an event listener to all input elements with the class `light-table-filter` and calls the
     `_onInputEvent` function when the input value changes. The `Array.prototype` is passed as a
     parameter to the self-invoking function, which allows the `forEach` method to be used on arrays
     within the `LightTableFilter` function. */
      return {
        init: function() {
          var inputs = document.getElementsByClassName('light-table-filter');
          Arr.forEach.call(inputs, function(input) {
            input.oninput = _onInputEvent;
          });
        }
      };
    })(Array.prototype);

   /* This code is adding an event listener to the `document` object that listens for the
   `readystatechange` event, which is fired when the `readyState` property of the document changes.
   When the `readyState` property is set to `'complete'`, indicating that the document and all its
   resources have finished loading, the `init()` method of the `LightTableFilter` function is
   called. This ensures that the `LightTableFilter` function is initialized only after the document
   has finished loading. The self-invoking function is passed the `document` object as a parameter
   to ensure that the `LightTableFilter` function has access to the `document` object. */
    document.addEventListener('readystatechange', function() {
      if (document.readyState === 'complete') {
        LightTableFilter.init();
      }
    });

  })(document);

/**
 * The function fills a table with data fetched from a specified API endpoint and displays a message
 * indicating the number of records retrieved.
 * @param [form=null] - The "form" parameter is a variable that is not used in the function and is set
 * to null by default. It is likely intended to be used to pass in a form element, but it is not
 * currently utilized in the function.
 */

async function fillTable(form = null) {
    TBODY_ROWS.innerHTML = '';
    RECORDS.textContent = '';
    const JSON = await dataFetch(PEDIDO_API, 'readAll');
    
    /* The `if (JSON.status) {` statement is checking if the `status` property of the `JSON` object is
    truthy. If it is truthy, the code block within the `if` statement is executed, which populates a
    table with data retrieved from an API and displays a message indicating the number of records
    retrieved. If the `status` property is falsy, the `else` block is executed, which displays an
    error message using the `sweetAlert()` function. */
    if (JSON.status) {
/* `JSON.dataset.forEach(row => {` is iterating over each object in the `dataset` property of the
`JSON` object using the `forEach()` method. For each object, the code within the curly braces is
executed, which likely includes manipulating the data in some way and appending it to the table body
element in the HTML document. */
        JSON.dataset.forEach(row => {
            url = `pedido_producto.html?id=${row.id_pedido}`;
            (row.estado_producto) ? icon = 'visibility' : icon = 'visibility_off';
          /* The code is using template literals to dynamically generate HTML table rows (`<tr>`) and
          table data cells (`<td>`) based on data retrieved from an API. The generated HTML is then
          appended to the `innerHTML` property of the `TBODY_ROWS` element, which is likely a
          reference to the table body element in the HTML document. The `${}` syntax is used to
          insert the values of the `row` object properties into the generated HTML. The `url`
          variable is also used to dynamically generate a hyperlink (`<a>`) that includes an icon
          and a link to another page. */
            TBODY_ROWS.innerHTML += `
                <tr>
                    <td>${row.id_pedido}</td>
                    <td>${row.fecha}</td>
                    <td>${row.direccion_pedido}</td>
                    <td>${row.estado}</td>
                    <td>
                        <a href="${url}" class="btn btn-info">
                        <i class="fa fa-shopping-bag" aria-hidden="true"></i>
                        </a>
                        <a onclick="openReport(${row.id_pedido})" type="button" class="btn btn-success">
                            <i class="fa fa-file" aria-hidden="true"></i>
                        </a>
                    </td>
                </tr>
            `;
        });
        RECORDS.textContent = JSON.message;
    } else {
        sweetAlert(4, JSON.exception, true);
    }
}

function openReport(id) {
  // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
  const PATH = new URL(`${SERVER_URL}reports/public/bill.php`);
  // Se agrega un parámetro a la ruta con el valor del registro seleccionado.
  PATH.searchParams.append('id_pedido', id);
  // Se abre el reporte en una nueva pestaña del navegador web.
  window.open(PATH.href);
}




