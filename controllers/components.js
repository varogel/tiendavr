
/* Declaring a constant variable named SERVER_URL and assigning it the value of the URL for the API
endpoint that the JavaScript code will be communicating with. */
const SERVER_URL = 'http://localhost/tiendavr/api/';


/* This line of code is selecting all elements in the HTML document that have the attribute
`data-bs-toggle` set to the value `"tooltip"`, and then converting the resulting NodeList into an
array using the `slice` method. The resulting array is then assigned to the variable
`tooltipTriggerList`. This is likely being done in order to initialize Bootstrap tooltips on those
elements. */
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});


/* The `confirmAction` function is displaying a confirmation message to the user using the SweetAlert
library. The message includes a warning icon, a message passed as a parameter, and two buttons
labeled "No" and "Yes". The function returns a promise that resolves to `true` if the user clicks
the "Yes" button, and `false` if the user clicks the "No" button. */
function confirmAction(message) {
    /* The `return swal({...})` code is displaying a confirmation message to the user using the
    SweetAlert library. The message includes a warning icon, a message passed as a parameter, and two
    buttons labeled "No" and "Yes". The function returns a promise that resolves to `true` if the
    user clicks the "Yes" button, and `false` if the user clicks the "No" button. */
    return swal({
        title: 'Advertencia',
        text: message,
        icon: 'warning',
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
            cancel: {
                text: 'No',
                value: false,
                visible: true,
                className: 'red accent-1'
            },
            confirm: {
                text: 'Sí',
                value: true,
                visible: true,
                className: 'grey darken-1'
            }
        }
    });
}
/* The `sweetAlert` function is a custom function that displays a message to the user using the
SweetAlert library. It takes four parameters: `type` (an integer representing the type of message to
display), `text` (a string containing the message to display), `timer` (a boolean indicating whether
or not to display a timer for the message), and `url` (an optional string containing a URL to
redirect the user to after they click the "Accept" button on the message). */

function sweetAlert(type, text, timer, url = null) {
    switch (type) {
        /* This code block is defining the title and icon variables based on the value of the type
        parameter passed to the `sweetAlert` function. The `switch` statement checks the value of
        `type` and assigns the appropriate title and icon values to the variables. These values are
        then used in the options object passed to the SweetAlert library to display a message with the
        appropriate title and icon. */
        case 1:
            title = 'Éxito';
            icon = 'success';
            break;
        case 2:
            title = 'Error';
            icon = 'error';
            break;
        case 3:
            title = 'Advertencia';
            icon = 'warning';
            break;
        case 4:
            title = 'Aviso';
            icon = 'info';
    }
    /* Defining an options object that will be used to display a message to the user using the
    SweetAlert library. The object includes properties such as the title, text, and icon of the
    message, as well as options for closing the message when clicking outside or pressing the escape
    key. It also includes a button with the text "Aceptar" and a class name of "cyan". */
    let options = {
        title: title,
        text: text,
        icon: icon,
        closeOnClickOutside: false,
        closeOnEsc: false,
        button: {
            text: 'Aceptar',
            className: 'cyan'
        }
    };
    /* This line of code is setting the `timer` property of the `options` object to either `3000` or
    `null`, depending on the value of the `timer` parameter passed to the `sweetAlert` function. */
    (timer) ? options.timer = 3000 : options.timer = null;
    /* `swal(options).then(() => {` is displaying a message to the user using the SweetAlert library with
    the options object passed as a parameter. The `.then()` method is used to execute a function after
    the user clicks the "Aceptar" button on the message. In this case, the function checks if a URL was
    passed as a parameter and, if so, redirects the user to that URL using `location.href`. */
    swal(options).then(() => {
        if (url) {
            /* `location.href = url` is redirecting the user to the URL specified in the `url` parameter after they
            click the "Aceptar" button on the SweetAlert message displayed by the `sweetAlert` function. */
            location.href = url
        }
    });
}

/* The `fillSelect` function is an asynchronous function that populates a select element in an HTML
form with options retrieved from a server using the `dataFetch` function. It takes four parameters:
`filename` (a string representing the name of the file on the server that will handle the request),
`action` (a string representing the action to be performed on the server), `select` (a string
representing the ID of the select element to be populated), and `selected` (an optional string
representing the value of the option that should be selected by default). */
async function fillSelect(filename, action, select, selected = null) {
    /* The above code is using the `await` keyword to asynchronously fetch data from a file specified by
    the `filename` parameter and perform an action specified by the `action` parameter. The fetched data
    is stored in a constant variable named `JSON`. */
    const JSON = await dataFetch(filename, action);
    let content = '';
    /* The above code is checking if the `status` property exists in a JSON object. If it does, the
    condition will evaluate to true and the code inside the curly braces will be executed. */
    if (JSON.status) {
        content += '<option disabled selected>Seleccione una opción</option>';
        /* The above code is incomplete and cannot be fully understood without additional context. However, it
        appears to be attempting to iterate through a dataset in JSON format using the `forEach` method and
        perform some action on each row. */
        JSON.dataset.forEach(row => {
            /* The above code is assigning the value of the first property of an object (retrieved using
            `Object.values()`) to a variable named `value`. The object is represented by the variable `row`. */
            value = Object.values(row)[0];
            /* The above code is assigning the value of the second property of an object `row` to the variable
            `text`. The object `row` is not shown in the code snippet, so it is unclear what the property
            represents. The syntax `Object.values()` is used to extract the values of all properties of an
            object and return them as an array. In this case, it is used to extract the value of the second
            property of `row`. */
            text = Object.values(row)[1];
            // Se verifica cada valor para enlistar las opciones.
            if (value != selected) {
                content += `<option value="${value}">${text}</option>`;
            } else {
                content += `<option value="${value}" selected>${text}</option>`;
            }
        });
    } else {
        content += '<option>No hay opciones disponibles</option>';
    }
/* The above code is using JavaScript to select an HTML element with an ID specified by the variable
"select" and setting its content to the value of the variable "content". */
    document.getElementById(select).innerHTML = content;
}

function barGraph(canvas, xAxis, yAxis, legend, title) {
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    xAxis.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });
    // Se establece el contexto donde se mostrará el gráfico, es decir, la etiqueta canvas a utilizar.
    const CONTEXT = document.getElementById(canvas).getContext('2d');
    // Se crea una instancia para generar el gráfico con los datos recibidos. Requiere la librería chart.js para funcionar.
    const CHART = new Chart(CONTEXT, {
        type: 'bar',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors
            }]
        },
        options: {
            aspectRatio: 1,
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}



function lineGraph(canvas, xAxis, yAxis, legend, title) {
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    xAxis.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });
    // Se establece el contexto donde se mostrará el gráfico, es decir, la etiqueta canvas a utilizar.
    const CONTEXT = document.getElementById(canvas).getContext('2d');
    // Se crea una instancia para generar el gráfico con los datos recibidos. Requiere la librería chart.js para funcionar.
    const CHART = new Chart(CONTEXT, {
        type: 'line',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors
            }]
        },
        options: {
            aspectRatio: 1,
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    min: 0, // Establece el mínimo del eje Y a 0.
                    max: 5, // Establece el máximo del eje Y a 5.
                    stepSize: 1 // Establece el paso entre cada etiqueta en el eje Y a 1.
                }
            }
        }
    });
}


/*
*   Función para generar un gráfico de pastel.
*   Parámetros: canvas (identificador de la etiqueta canvas), legends (valores para las etiquetas), values (valores de los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/
function pieGraph(canvas, legends, values, title) {
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    values.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });
    // Se establece el contexto donde se mostrará el gráfico, es decir, se define la etiqueta canvas a utilizar.
    const context = document.getElementById(canvas).getContext('2d');
    // Se crea una instancia para generar el gráfico con los datos recibidos. Requiere la librería chart.js para funcionar.
    const chart = new Chart(context, {
        type: 'pie',
        data: {
            labels: legends,
            datasets: [{
                data: values,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        }
    });
}


function donnutGraph(canvas, legends, values, title) {
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    values.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });
    // Se establece el contexto donde se mostrará el gráfico, es decir, se define la etiqueta canvas a utilizar.
    const context = document.getElementById(canvas).getContext('2d');
    // Se crea una instancia para generar el gráfico con los datos recibidos. Requiere la librería chart.js para funcionar.
    const chart = new Chart(context, {
        type: 'doughnut',
        data: {
            labels: legends,
            datasets: [{
                data: values,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        }
    });
}

function polarGraph(canvas, legends, values, title) {
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    values.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });
    // Se establece el contexto donde se mostrará el gráfico, es decir, se define la etiqueta canvas a utilizar.
    const context = document.getElementById(canvas).getContext('2d');
    // Se crea una instancia para generar el gráfico con los datos recibidos. Requiere la librería chart.js para funcionar.
    const chart = new Chart(context, {
        type: 'polarArea',
        data: {
            labels: legends,
            datasets: [{
                data: values,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        }
    });
}

/*
*   Función asíncrona para cerrar la sesión del usuario.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
async function logOut() {
    // Se muestra un mensaje de confirmación y se captura la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Está seguro de cerrar la sesión?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Petición para eliminar la sesión.
        const JSON = await dataFetch(USER_API, 'logOut');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (JSON.status) {
            sweetAlert(1, JSON.message, true, 'index.html');
        } else {
            sweetAlert(2, JSON.exception, false);
        }
    }
}

/*
*   Función asíncrona para intercambiar datos con el servidor.
*   Parámetros: filename (nombre del archivo), action (accion a realizar) y form (objeto opcional con los datos que serán enviados al servidor).
*   Retorno: constante tipo objeto con los datos en formato JSON.
*/
async function dataFetch(filename, action, form = null) {
    // Se define una constante tipo objeto para establecer las opciones de la petición.
    const OPTIONS = {};
    // Se determina el tipo de petición a realizar.
    if (form) {
        OPTIONS.method = 'post';
        OPTIONS.body = form;
    } else {
        OPTIONS.method = 'get';
    }
    try {
        // Se declara una constante tipo objeto con la ruta específica del servidor.
        const PATH = new URL(SERVER_URL + filename);
        // Se agrega un parámetro a la ruta con el valor de la acción solicitada.
        PATH.searchParams.append('action', action);
        // Se define una constante tipo objeto con la respuesta de la petición.
        const RESPONSE = await fetch(PATH.href, OPTIONS);
        // Se retorna el resultado en formato JSON.
        return RESPONSE.json();
    } catch (error) {
        // Se muestra un mensaje en la consola del navegador web cuando ocurre un problema.
        console.log(error);
    }
}