/* The `const PEDIDO_API` is declaring a constant variable that holds the URL of an API endpoint for
retrieving data related to orders. Specifically, it points to the `historial.php` file located in
the `business/public` directory. */
const PEDIDO_API = 'business/public/historial.php';
const TBODY_ROWS = document.getElementById('tbody-rows');
/* `const RECORDS = document.getElementById('records');` is declaring a constant variable that holds a
reference to the HTML element with the ID 'records'. This element is likely a text element in the
HTML page, and the variable is used to display a message related to the data being displayed in the
table. */
const RECORDS = document.getElementById('records');
const PARAMS = new URLSearchParams(location.search);

/* The `document.addEventListener('DOMContentLoaded', () => {` is adding an event listener to the
`DOMContentLoaded` event, which is fired when the initial HTML document has been completely loaded
and parsed, without waiting for stylesheets, images, and subframes to finish loading. The arrow
function passed as the second argument to the `addEventListener` method is a callback function that
will be executed when the `DOMContentLoaded` event is fired. In this case, the callback function
calls the `fillTable` function to populate a table with data obtained from an API. */
document.addEventListener('DOMContentLoaded', () => {
  /* `fillTable()` is calling the `fillTable` function, which populates a table with data obtained from
  an API. It does not pass any arguments to the function, so it will retrieve all records from the
  API. */
  fillTable();
});



(function (document) {
  /* It seems that the code snippet is incomplete and there is a syntax error. The line `'buscador';`
  is not doing anything useful in the code. It is just a string literal that is not being assigned
  to any variable or used in any way. The next line `var LightTableFilter = (function(Arr) {` is
  declaring a variable `LightTableFilter` and assigning it the result of an immediately invoked
  function expression (IIFE) that takes an array `Arr` as a parameter. This IIFE is used to filter
  rows in a table based on user input in a search box. */
  'buscador';

  var LightTableFilter = (function (Arr) {
    /**
     * The function listens for input events on a specified element and filters rows in tables based on the
     * input.
     * @param e - e is the event object that is passed to the _onInputEvent function when the input event
     * is triggered. It contains information about the event, such as the target element that triggered the
     * event.
     */

    var _input;

    function _onInputEvent(e) {
      _input = e.target;
      var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
      Arr.forEach.call(tables, function (table) {
        Arr.forEach.call(table.tBodies, function (tbody) {
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

    /* This code is defining an object with a single method `init`, which initializes a search filter
    for a table. The `init` method selects all elements with the class `light-table-filter`, which
    are assumed to be search input elements, and adds an `oninput` event listener to each of them.
    When the user types into the search input, the `_onInputEvent` function is called to filter the
    rows in the table based on the input value. The `LightTableFilter` object is returned by an
    immediately invoked function expression (IIFE) that takes `Array.prototype` as a parameter,
    which allows the `forEach` method to be used on arrays. */
    return {
      init: function () {
        var inputs = document.getElementsByClassName('light-table-filter');
        Arr.forEach.call(inputs, function (input) {
          input.oninput = _onInputEvent;
        });
      }
    };
  })(Array.prototype);

  /* The code is adding an event listener to the `readystatechange` event of the `document` object.
  When the `readystatechange` event is fired, the callback function checks if the `readyState`
  property of the `document` object is equal to `'complete'`. If it is, the `init` method of the
  `LightTableFilter` object is called to initialize a search filter for a table. This ensures that
  the search filter is only initialized after the document has been completely loaded and parsed. */
  document.addEventListener('readystatechange', function () {
    if (document.readyState === 'complete') {
      LightTableFilter.init();
    }
  });

})(document);


/* The `async function fillTable(form = null)` is a function that populates a table with data obtained
from an API. It first clears the contents of the table body and a text element, and then sends a
request to the API to retrieve data related to a specific order. The data is then used to populate
the table with rows containing information about each product in the order, including the product
name, price, quantity, and subtotal. The function also calculates the total amount to be paid for
the order. */

async function fillTable(form = null) {
  TBODY_ROWS.innerHTML = '';
  RECORDS.textContent = '';

  /* These lines of code are creating a new instance of the `FormData` object and assigning it to a
  constant variable `FORM`. The `FormData` object is a built-in JavaScript object that allows the
  creation of a set of key/value pairs representing form fields and their values. */

  const FORM = new FormData();
  FORM.append('id_pedido', PARAMS.get('id'));

  const JSON = await dataFetch(PEDIDO_API, 'readOrderFinish', FORM);

  // Se declara e inicializa una variable para calcular el importe por cada producto.
  let subtotal = 0;
  // Se declara e inicializa una variable para sumar cada subtotal y obtener el monto final a pagar.
  let total = 0;

    if (JSON.status) {
        JSON.dataset.forEach(row => {
            subtotal = row.precio * row.cantidad;
            total += subtotal;
            (row.estado_producto) ? icon = 'visibility' : icon = 'visibility_off';
            TBODY_ROWS.innerHTML += `
                <tr>
                    <td>${row.titulo}</td>
                    <td>${row.precio}</td>
                    <td>${row.cantidad}</td>
                    <td>${subtotal.toFixed(2)}</td>
                </tr>
            `;
    });
    /* `RECORDS.textContent = JSON.message;` is setting the text content of the HTML element referenced by
    the `RECORDS` constant variable to the value of the `message` property of the `JSON` object. This is
    likely used to display a message related to the data being displayed in the table, such as the
    number of records retrieved or an error message if the data retrieval was unsuccessful. */
    RECORDS.textContent = JSON.message;
  } else {
    /* The `sweetAlert(4, JSON.exception, true)` function call is likely displaying a pop-up alert message
    using the SweetAlert library. The first argument `4` is likely specifying the type of alert to
    display (e.g. success, error, warning, etc.). The second argument `JSON.exception` is likely the
    message to display in the alert, and the third argument `true` is likely a boolean value indicating
    whether to display a confirmation button in the alert. However, without more context or information
    about the `sweetAlert` function, it is difficult to determine the exact behavior of this function
    call. */
    sweetAlert(4, JSON.exception, true);
  }
}





