'use strict';

/**
 * Solución Tarea # 06 Módulo 1 Henry Full Stack Course
 * Autor: Jamer José Rebolledo Quiroz
 * Github: https://github.com/jamerrq
 * Linkedin: https://linkedin.com/in/jamerrq
 *
 * TAREA: Implementar la clase BinarySearchTree, definiendo los siguientes
          métodos recursivos:

  - size: retorna la cantidad total de nodos del árbol

  - insert: agrega un nodo en el lugar correspondiente

  - contains: retorna true o false luego de evaluar si cierto valor existe
              dentro del árbol

  - depthFirstForEach: recorre el árbol siguiendo el orden depth first (DFS)
                       en cualquiera de sus variantes, según se indique por
                       parámetro ("post-order", "pre-order", o "in-order").
                       Nota: si no se provee ningún parámetro, hará el
                       recorrido "in-order" por defecto.

  - breadthFirstForEach: recorre el árbol siguiendo el orden breadth first (BFS)

  El árbol utilizado para hacer los tests se encuentra representado
  en la imagen bst.png dentro del directorio homework.
*/

class BinarySearchTree {

    // Constructor, recibe un parámetro opcional por si se quiere crear un árbol
    // vacío
    constructor(value = undefined) {
        // Valor de la raíz
        this.value = value;
        // Tamaño del árbol, 0 si no se pasa un valor, 1 caso contrario
        this.sizeV = 0 + Boolean(value != undefined);
        // Rama izquierda
        this.left = null;
        // Rama derecha
        this.right = null;
    }

    // Método size: retorna la cantidad total de nodos del árbol
    size() {
        return this.sizeV;
    }

    // Método insert: agrega un nodo en el lugar correspondiente
    insert(value) {

        // Caso que no haya ningún nodo todavía
        if (this.sizeV == 0) {
            this.value = value;
        }

        // Caso contrario, preguntamos si el valor dado es menor o mayor que el
        // valor actual, en caso que sea menor, ingresamos el nodo por llamado
        // recursivo en la rama izquierda si existe, sino existe, se crea y se
        // guarda su referencia, caso análogo para cuando el valor es mayor
        else {

            // Caso menor que (se inserta en la rama izquierda)
            if (value < this.value) {
                if (!this.left) {
                    // Si no existe una rama izquierda, se crea con el valor pasado
                    this.left = new BinarySearchTree(value);
                } else {
                    // En caso que exista una rama izquierda, se hace un llamado
                    // recursivo para insertar el valor en esta rama
                    this.left.insert(value);
                }
            }

            // Caso mayor que (se inserta en la rama derecha)
            else {
                if (!this.right) {
                    // Si no existe una rama derecha, se crea con el valor pasado
                    this.right = new BinarySearchTree(value);
                } else {
                    // En caso que exista una rama derecha, se hace un llamado
                    // recursivo para insertar el valor en esta rama
                    this.right.insert(value);
                }
            }
            // Falta preguntarse, ¿qué pasaría con una colisión?
            // Hasta ahora, se insertaría en la rama derecha, permitiendo valores
            // duplicados, pero, ¿es esta la manera más eficiente de hacerlo? 🤔
        }
        // Aumentamos el valor suponiendo una inserción exitosa
        this.sizeV++;
    }

    // Método contains: retorna true o false luego de evaluar si cierto valor
    // existe dentro del árbol
    contains(value) {
        // Si no hay nodos
        if (!this.sizeV) return false;

        // Si el nodo actual coincide con el valor
        if (this.value === value) return true;

        // Preguntamos en la rama correspondiente:
        if (value < this.value) {
            return Boolean(this.left) && this.left.contains(value);
        }
        return Boolean(this.right) && this.right.contains(value);
    }

    // Método depthFirstForEach: recorre el árbol siguiendo el orden depth first
    // (DFS) en cualquiera de sus variantes, según se indique por parámetro
    // ("post-order", "pre-order", o "in-order").
    // Nota: si no se provee ningún parámetro,
    // hará el recorrido "in-order" por defecto.
    depthFirstForEach(callback, order = "in-order") {

        // Me ayudé en este video:
        // https://www.youtube.com/watch?v=9RHO6jU--GU&t=461s

        let value = this.value;

        // PRE-ORDEN: Primero la raíz, luego rama izquierda, luego rama derecha
        if (order == "pre-order") {
            callback(value);
            if (this.left) this.left.depthFirstForEach(callback, order);
            if (this.right) this.right.depthFirstForEach(callback, order);
        }

        // POST-ORDEN: Primero la rama izquierda, luego rama derecha, luego raíz
        else if (order == "post-order") {
            if (this.left) this.left.depthFirstForEach(callback, order);
            if (this.right) this.right.depthFirstForEach(callback, order);
            callback(value);
        }

        // EN-ORDEN: Primero la rama izquierda, luego la raíz, luego rama derecha
        else {
            if (this.left) this.left.depthFirstForEach(callback, order);
            callback(value);
            if (this.right) this.right.depthFirstForEach(callback, order);
        }
    }

    // Método breadthFirstForEach: recorre el árbol siguiendo el
    // orden breadth first (BFS)
    // Recibe como parámetros una función callback que se llamara sobre cada nodo
    // visitado, y una raíz para hacer el llamado recursivo

    breadthFirstForEach(callback = null, root = this) {

        // Me ayudé en este video:
        // https://www.youtube.com/watch?v=6ZnyEApgFYg&t=304s

        // Usaremos una cola para ir preservando el orden por niveles
        let queue = [root];

        // Mientras tengamos elementos en la cola:
        while (queue.length) {

            // Sacamos el primer nodo de la cola
            let v = queue.shift();

            // Llamamos la función callback (si existe)
            // sobre el valor del nodo actual
            if (callback) callback(v.value);

            // Si hay rama izquierda, la insertamos en la cola
            if (v.left) queue.push(v.left);

            // Si hay rama derecha, la insertamos en la cola
            if (v.right) queue.push(v.right);

        }
    }
}

/*
let tree = new BinarySearchTree();
let valuesToInsert = [20, 15, 25, 5, 17, 21, 28, 0, 14, 50, 1, 45, 13, 12, 11,
                      30, 35, 33, 31, 34];
valuesToInsert.forEach(value => {tree.insert(value)});

// BFS
let bfsOrder = [];
tree.breadthFirstForEach((val) => {bfsOrder.push(val)});
console.log("BFS ORDER:\n", bfsOrder);

// DFS
let dfsOrder = [];
tree.depthFirstForEach((val) => {dfsOrder.push(val)}, "pre-order");
console.log("\nDFS ORDER (pre-order):\n", dfsOrder);

// DFS in-order
let dfsOrderInOrder = [];
tree.depthFirstForEach((val) => {dfsOrderInOrder.push(val)}, "in-order");
console.log("\nDFS ORDER (in-order):\n", dfsOrderInOrder);
*/

// No modifiquen nada debajo de esta linea
// --------------------------------

let tree = new BinarySearchTree(20);
let testArr = [];
let valuesToInsert = [15, 25, 5, 17, 21, 28, 0, 14, 50, 1, 45, 13, 12, 11, 30, 35, 33, 31, 34];
valuesToInsert.forEach(value => tree.insert(value));
console.log(tree);

module.exports = {
    BinarySearchTree,
};
