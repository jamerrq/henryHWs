'use strict';

/**
 * Solución Tarea # 04 Módulo 1 Henry Full Stack Course FT
 *    AUTOR: Jamer José Rebolledo Quiroz
 *   GitHub: https://github.com/jamerrq
 * Linkedin: https://linkedin.com/in/jamerrq
 */

/*
Definir las funciones recursivas nFactorial y nFibonacci.

nFactorial(n) debe retornar el factorial de n sabiendo que, siendo n un número
natural, su factorial (representado como n!) es el producto de n por todos los
números naturales menores que él y mayores a 0. Ejemplo: 5! = 5 * 4 * 3 * 2 * 1

nFibonacci(n) debe retornar el enésimo número de la secuencia de Fibonacci,
tomando al 0 y al 1, respectivamente, como primer y segundo elementos de la
misma, y sabiendo que cualquier elemento que se agregue a esta secuencia será el
resultado de la suma del último elemento y el anterior. Ejemplo: nFibonacci(7)
retornará 13, ya que 13 es el dígito que está en la posición 7 de la secuencia.

Secuencia:  0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...


Como ejercicio adicional y completamente opcional, al terminar de resolver este
problema pueden intentar definir funciones que logren los mismos resultados pero
de manera iterativa.
*/

function nFactorial(n) {
    if (!n) return 1;
    return n * iFactorial(n - 1);
}

function iFactorial(n) {
    let fact = 1;
    for (let i = 2; i <= n; ++i)fact *= i;
    return fact;
}

function nFibonacci(n) {
    if (n <= 1) return n;
    return nFibonacci(n - 1) + iFibonacci(n - 2);
}

function iFibonacci(n) {
    if (!n) return 0;
    let f1 = 0, f2 = 1;
    for (let i = 2; i <= n; ++i) {
        let f3 = f2 + f1;
        f1 = f2;
        f2 = f3;
    }
    return f2;
}

/*
Implementar la clase Queue, sabiendo que es una estructura de tipo FIFO, donde
el primer elemento que ingresa es el primero que se quita. Definir los
siguientes métodos:
  - enqueue: agrega un valor respetando el orden.
  - dequeue: remueve un valor respetando el orden. Retorna undefined cuando la
    queue está vacía.
  - size: retorna el tamaño (cantidad de elementos) de la queue.

Pueden utilizar class o función constructora.
*/

class Queue {

    constructor() {
        this.arr = [];
    }

    enqueue(elem) {
        this.arr.push(elem);
    }

    dequeue() {
        return this.arr.shift();
    }

    size() {
        return this.arr.length;
    }

}

/*⚠️ No modificar nada debajo de esta línea ⚠️*/
module.exports = {
    Queue,
    nFactorial,
    nFibonacci,
};
