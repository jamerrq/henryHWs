'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor) {
    // El executor tiene que ser una función!
    if (typeof executor !== "function") {
        throw new TypeError("executor must be a function");
    };

    // Guardamos el executor
    this.executor = executor;

    // Comenzamos con un estado inicial "pendiente"
    this._state = 'pending';
    // y un valor undefined por ahora
    this._value = undefined;

    // Handlers
    this._handlerGroups = [];

    // Ejecutamos el executor
    executor(this._internalResolve.bind(this), this._internalReject.bind(this));
};

// Método para resolver internamente la promesa,
// recibe el valor con el que se resuelve
$Promise.prototype._internalResolve = function (value) {
    // Sólo se modifica la promesa si no ha sido alterada previamente
    if (this._state === 'pending') {
        // El estado pasa de pendiente a completado
        this._state = 'fulfilled';
        // Se actualiza el valor con el del pasado por parámetro
        this._value = value;
    };
    // Se hace un llamado a los Handlers de la promesa
    this._callHandlers();
};

// Método para rechazar internamente la promesa,
// recibe la razón con la que se rechaza (valor)
$Promise.prototype._internalReject = function (value) {
    if (this._state === 'pending') {
        this._state = 'rejected';
        this._value = value;
    };
    this._callHandlers();
};

// Método then, recibe dos controloadores (callbacks), el de éxito y el de error
$Promise.prototype.then = function (successCb, errorCb) {
    // En caso que alguno de los controladores no sea una función, estos se
    // setean con un valor de tipo falso
    if (typeof successCb !== 'function') successCb = false;
    if (typeof errorCb !== 'function') errorCb = false;
    // Se crea una nueva promesa
    const downstreamPromise = new $Promise(() => { });
    // Se actualizan los manejadores insertando la nueva promesa
    // y los controladores
    this._handlerGroups.push({
        successCb,
        errorCb,
        downstreamPromise,
    });

    // En caso que la promesa aún esté pendiente, se hace el llamado a los
    // controladores
    if (this._state !== "pending") this._callHandlers();
    // Devolvemos la nueva promesa
    return downstreamPromise;
};

// Un catch es un then sin controlador de éxito:
$Promise.prototype.catch = function (errorCb) {
    return this.then(null, errorCb);
}

// Método para el llamado de los controladores
$Promise.prototype._callHandlers = function () {

    // Llamamos a los controladores en orden
    // para irlos resolviendo uno por uno
    while (this._handlerGroups.length) {

        // Sacamos el primero de la lista
        let handler = this._handlerGroups.shift();
        // Si la promesa tiene como estado completada hacemos lo siguiente:
        if (this._state === 'fulfilled') {
            // En caso que exista un controlador de éxito:
            if (handler.successCb) {
                try {
                    // Consultamos el resultado de pasar el valor
                    // actual de la promesa por el controlador
                    let result = handler.successCb(this._value);
                    // En caso que el resultado haya sido una promesa,
                    // hacemos lo siguiente:
                    if (result instanceof $Promise) {
                        // Devolvemos la resolución de
                        // esa promesa con estos controladores:
                        return result.then(
                            (value) => {
                                // En caso de éxito, hacemos llamado al método
                                // de resolución interno de esa promesa
                                let subPromise = handler.downstreamPromise;
                                subPromise._internalResolve(value);
                            },
                            (error) => {
                                // En caso de error, hacemos llamado al método
                                // de resolución interno de esa promesa
                                let subPromise = handler.downstreamPromise;
                                subPromise._internalReject(error);
                            },
                        );
                    }
                    // En caso que no sea una promesa, estamos listos para
                    // devolver la resolución interna con el resultado
                    // obtenido previamente
                    else { // Llegamos al valor final
                        handler.downstreamPromise._internalResolve(result);
                    }
                }
                // En caso que nos encontremos un error en el camino, debemos
                // resolver internamente esa promesa como rechazada
                catch (error) {
                    handler.downstreamPromise._internalReject(error);
                };
            }
            // Si no es función es una señal para controlarla con el método
            // interno para eso:
            else {
                return handler.downstreamPromise._internalResolve(this._value);
            };
        }
        // En caso que la promesa haya sido marcada como rechazada
        // hacemos lo siguiente:
        else if (this._state === 'rejected') {
            // En el caso que tenemos un controlador de error:
            if (handler.errorCb) {
                try {
                    // Obtenemos el resultado de pasar el valor actual de
                    // la promesa por el controlador
                    let result = handler.errorCb(this._value);
                    // En caso que ese resultado sea una promesa,
                    // hacemos lo siguiente:
                    if (result instanceof $Promise) {
                        // Devolvemos una nueva promesa encadenada con los
                        // siguientes controladores
                        return result.then(
                            (value) => {
                                // En caso de éxito, pasamos el método
                                // de resolución interna para resolver
                                let subPromise = handler.downstreamPromise;
                                subPromise._internalResolve(value);
                            },
                            (error) => {
                                // En caso de error, pasamos el método
                                // de resolución interna para rechazar
                                let subPromise = handler.downstreamPromise;
                                subPromise._internalReject(error);
                            },
                        );
                    }
                    // En caso que el resultado no sea una promesa, es una señal
                    // para manejar ese resultado con el método de resolución
                    // interno:
                    else {
                        handler.downstreamPromise._internalResolve(result);
                    };
                }
                // En caso que haya algún error en el proceso, debemos
                // rechazar la propuesta internamente con controlador interno:
                catch (error) {
                    handler.downstreamPromise._internalReject(error);
                };
            }
            // Finalmente, si no existe un controlador de error, lo manejamos
            // con el controlador interno respectivo:
            else {
                return handler.downstreamPromise._internalReject(this._value);
            };
        };
    };
};


$Promise.resolve = (value) => {
    // Si el valor no es una promesa, la envolvemos en una
    if (!(value instanceof $Promise)) {
        // Devolvemos una nueva promesa con el valor resuelto
        return new $Promise((resolve) => {
            resolve(value);
        });
    }
    // Si el valor es una promesa, la devolvemos
    else {
        return value;
    }
};

$Promise.all = (array) => {
    // Verificamos que el argumento sea un array
    if (!Array.isArray(array))
        throw new TypeError('El argumento debe ser un array');

    // Creamos una nueva promesa
    return new $Promise((resolve, reject) => {
        // Creamos un array para guardar los resultados
        let results = [];
        // Creamos un contador para saber cuándo terminar
        let counter = 0;
        // Iteramos sobre el array
        for (let i = 0; i < array.length; i++) {
            // Resolvemos cada promesa
            $Promise.resolve(array[i]).then(
                // En caso de éxito
                (value) => {
                    // Guardamos el resultado
                    results[i] = value;
                    // Aumentamos el contador
                    counter++;
                    // Si ya terminamos, resolvemos la promesa
                    if (counter === array.length) {
                        resolve(results);
                    }
                },

                // En caso de error
                (error) => {
                    // Rechazamos la promesa
                    reject(error);
                });
        };
    });
};


// Exportamos la clase
module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
