const {
    Queue,
    Node,
    LinkedList,
    BinarySearchTree
} = require('./DS.js');

/**
 * Solución Ejercicios de repaso Módulo 1 Henry Full Stack Course FT
 *    AUTOR: Jamer José Rebolledo Quiroz
 *   GitHub: https://github.com/jamerrq
 * Linkedin: https://linkedin.com/in/jamerrq
 */

// Implementar la función countArray: a partir de un array en el cual cada
// posición puede ser un único número u otro array anidado de números,
// determinar la suma de todos los números contenidos en el array.
// El array será recibido por parámetro.
// Ejemplo:
//    const array = [1, [2, [3,4]], [5,6], 7];
//    countArray(array); --> Debería devolver 28 (1 + 2 + 3 + 4 + 5 + 6 + 7)
// Pista: utilizar el método Array.isArray() para determinar si algun elemento
// de array es un array anidado

var countArray = function (array) {
    if (!Array.isArray(array)) return array;
    return array.reduce((acc, value) => acc + countArray(value), 0);
}

// Implementar la función countProps: a partir de un objeto en el cual cada
// propiedad puede contener cualquier tipo de dato, determinar la cantidad de
// propiedades de objetos en cualquier nivel, ya sea el inicial
// u objetos anidados
// Ejemplo:
// var obj = {
//   a: {
//     a1: 10,
//     a2: 'Franco',
//     a3: {f: 'r', a: 'n', c: {o: true}}
//   },
//   b: 2,
//   c: [1, {a: 1}, 'Franco']
// }
// countProps(obj)--> Deberia devolver 10 ya que el objeto inicial tiene 3
// propiedades, pero a su vez dentro de a tenemos 3 propiedades mas, luego a3
// tiene otras 3 y por ultimo c tiene una extra.
// Propiedades: a, a1, a2, a3, f, a, c, o, b, c --> 10 en total

var countProps = function (obj) {
    if (Array.isArray(obj)) {
        return obj.reduce((acc, value) => acc + countProps(value), 1);
    }
    if (obj instanceof Object) {
        let keys = Object.keys(obj);
        return keys.reduce((acc, value) => acc + countProps(obj[value]), 0);
    }
    return 1;
}

// Implementar el método changeNotNumbers dentro del prototype de LinkedList que
// deberá cambiar aquellos valores que no puedan castearse a numeros por
// 'Kiricocho' y devolver la cantidad de cambios que hizo
// Aclaracion: si el valor del nodo puede castearse a número NO hay que
// reemplazarlo
// Ejemplo 1:
//    Suponiendo que la lista actual es:
//    Head --> [1] --> ['2'] --> [false] --> ['Franco']
//    lista.changeNotNumbers();
//    Ahora la lista quedaría:
//    Head --> [1] --> ['2'] --> [false] --> ['Kirikocho] y la función debería
//    haber devuelto el valor 1

LinkedList.prototype.changeNotNumbers = function () {
    let head = this.head;
    let count = 0;
    while (head) {
        if (isNaN(head.value)) {
            head.value = "Kiricocho";
            count++;
        }
        head = head.next;
    }
    return count;
}

// Implementar la función mergeQueues que a partir de dos queues recibidas por
// parametro debe devolver una nueva Queue que vaya mergeando los nodos de las
// anteriores.
// Ejemplo:
// - queueOne: [7,3,5]
// - queueTwo: [2,4,6]
// mergeQueues(queueOne, queueTwo) --> [7,2,3,4,5,6]
// IMPORTANTE: NO son arreglos sino que son Queues.

var mergeQueues = function (queueOne, queueTwo) {
    let queue = new Queue();

    let min_value = Math.min(queueOne.size(), queueTwo.size());
    for (let i = 0; i < min_value; ++i) {
        let value_queue_1 = queueOne.dequeue();
        let value_queue_2 = queueTwo.dequeue();
        queue.enqueue(value_queue_1);
        queue.enqueue(value_queue_2);
    }

    let value;

    while (queueOne.size()) {
        value = queueOne.dequeue();
        queue.enqueue(value);
    }

    while (queueTwo.size()) {
        value = queueTwo.dequeue();
        queue.enqueue(value);
    }

    return queue;
}

// Implementar la funcion closureMult que permita generar nuevas funciones que
// representen las tablas de multiplicación de distintos numeros Ejemplo:
// - var multByFour = closureMult(4);
// - multByFour(2) --> 8 (2 * 4)
// - multByFour(5) --> 20
// - var multBySix = closureMult(6);
// - multBySix(4) --> 24

var closureMult = function (multiplier) {
    return (arg) => arg * multiplier;
}

// Implementar el método sum dentro del prototype de BinarySearchTree
// que debe retornar la suma total de los valores dentro de cada nodo del arbol

BinarySearchTree.prototype.sum = function () {
    let total = this.value;
    if (this.left) total += this.left.sum();
    if (this.right) total += this.right.sum();
    return total;
}

module.exports = {
    countArray,
    countProps,
    mergeQueues,
    closureMult
}
