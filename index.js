// Genera un tablero dinamicamente
function generateBoard(cantidadDeFilas, cantidadDeColumnas) {
    var tablero = "";

    // pinta una primera fila para mostrar los numeros
    // se pone con una clase diferente para darle otros estilos
    tablero += '<div class="disable">'
    for (var column = 1; column <= cantidadDeColumnas; column++) {
        tablero += `<div>${column}</div>`;
    }
    tablero += "</div>"

    var letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"] // ...
    for (var fila = 1; fila <= cantidadDeFilas; fila++) {
        tablero += '<div class="row">'

        // añado como `primera celda de la fila un div para poner las letras
        // se pone con una clase diferente para darle otros estilos
        tablero += `<div class="disable-2">${letras[fila-1]}</div>`;

        for (var column = 1; column <= cantidadDeColumnas; column++) {
            tablero += `<div id="cell_${fila}_${column}" fila="${fila}" columna="${column}" celda="${((fila-1)*cantidadDeColumnas) + column - 1}" onclick="cellClicked('cell_${fila}_${column}')"></div>`;
        }
        tablero += "</div>"
    }
    return tablero;
}

// esta variable indica si se puede o no comenzar
var comenzar = false;

// cuando se da click en el boton start se comienza
function start() {
    comenzar = true;
}

function cellClicked(idCell) {
    // si no se puede comenzar finalizo el metodo
    if (comenzar == false) {
        return;
    }

    // obtenga el attributo celda de la celda donde se dio click
    var celda = parseInt(document.getElementById(idCell).getAttribute("celda"));

    // si la celda clieckeada esta en el array de bombas, lo pinto de rojo y retorno
    for (var i = 0; i < celdasConBombas.length; i++) {
        if (celdasConBombas[i] == celda) {
            document.getElementById(idCell).style.backgroundColor = "red";
            return;
        }
    }

    // sino la pinto de verde
    document.getElementById(idCell).style.backgroundColor = "green";
}

// A parrtir de una celda obtiene el id del div en el tablero
function getCellId(celda, cantidadDeColumnas) {
    var fila = parseInt((celda / cantidadDeColumnas) + 1);
    var columna = (celda % cantidadDeColumnas) + 1;
    return `cell_${fila}_${columna}`;
}

var celdasConBombas = []

function generarBombas(cantidadFilas, cantidadColumnas, cantidadDeBombas) {
    // obtengo la cantidad de celdas del tablero
    var cantidadCeldas = cantidadFilas * cantidadColumnas;

    // si la cantidad de bombas a poner es mayor q la cantidad de celdas doy error
    if (cantidadDeBombas >= cantidadCeldas) {
        throw "La cantidad de bombas no puede ser mayor q la cantidad de columnas"
    }

    // crear array con todas las posiciones (celdas) del tablero
    var celdas = [];
    for (var i = 0; i < cantidadCeldas; i++) {
        celdas.push(i);
    }

    // itero para poner las bombas
    while (cantidadDeBombas > 0) {
        // para escoger en q celda poner una bomba, eligo una posicion aleatoria
        // del array de celdas, y escojo la celda q esta en esa posicion
        var max = celdas.length;
        var i = Math.floor(Math.random() * max); // genera un random entre 0 y (max-1)
        var celda = celdas[i];

        // tengo q sacar la celda del array de celdas para q no se repita
        celdas.splice(i, 1); // elimina el elemento de la posicion i

        // pinto una bomba en el tablero
        document.getElementById(getCellId(celda, cantidadColumnas)).innerHTML = "X";

        celdasConBombas.push(celda);
    }

    return celdasConBombas + 4;
}

document.getElementById("tablero").innerHTML = generateBoard(5, 7);
generarBombas(5, 7, 5)