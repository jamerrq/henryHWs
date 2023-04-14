'use strict'

/**
 * Solución Tarea # 07 Módulo 1 Henry Full Stack Course FT
 *    AUTOR: Jamer José Rebolledo Quiroz
 *   GitHub: https://github.com/jamerrq
 * Linkedin: https://linkedin.com/in/jamerrq
 */

// No cambies los nombres de las funciones.

function factorear(num) {
    // Factorear el número recibido como parámetro y devolver en un array los
    // factores por los cuales se va dividiendo a dicho número (De menor a
    // mayor) Ej: factorear(180) --> [1, 2, 2, 3, 3, 5] Ya que 1x2x2x3x3x5 = 180
    // y son todos números primos Tu código:

    // Variable temporal para recorrer los dígitos
    let tmp = 2;
    // Variable para guardar los factores, empezamos con 1
    let ans = [1];
    // Mientras quede forma de dividir al número
    while (num > 1) {
        // Si el dígito actual es un divisor:
        if (num % tmp === 0) {
            // Añadimos el factor al resultado
            ans.push(tmp);
            // Se divide al número por el factor
            num /= tmp;
        }

        // Si no, seguimos con el suguiente factor
        else {
            tmp++;
        }
    }
    // Devolvemos el arreglo con los factores
    return ans;
}

function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

function bubbleSort(array) {
    // Implementar el método conocido como bubbleSort para ordenar de menor a
    // mayor el array recibido como parámetro Devolver el array ordenado
    // resultante Tu código:

    // Más información en: https://www.geeksforgeeks.org/bubble-sort/ Longitud
    // del arreglo
    let n = array.length;
    //
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (array[j] > array[j + 1]) swap(array, j, j + 1);
        }
    }
    return array;
}


function insertionSort(array) {
    // Implementar el método conocido como insertionSort para ordenar de menor a
    // mayor el array recibido como parámetro utilizando arreglos Devolver el
    // array ordenado resultante Tu código:

    // Más información en https://www.geeksforgeeks.org/insertion-sort/ Longitud
    // del arreglo
    let n = array.length;
    // Por cada elemento del arreglo, empezando por el segundo:
    for (let i = 1; i < n; ++i) {
        let j = i;
        // Dependiendo qué tan mayor sea el elemento actual, se manda hacia
        // atrás las posiciones necesarias en el arreglo
        while (j > 0 && array[j - 1] > array[j]) { swap(array, j, j - 1); j--; }
    }

    // Devolvemos el mismo arreglo con los cambios
    return array;
}


function selectionSort(array) {
    // Implementar el método conocido como selectionSort para ordenar de menor a
    // mayor el array recibido como parámetro utilizando dos arreglos Devolver
    // el array ordenado resultante Tu código:

    // Más información en: https://www.geeksforgeeks.org/selection-sort/
    // Longitud del array, posición a ordenar
    let n = array.length, sorted = 0;
    while (sorted < n) {
        // Mínimo en el sub arreglo sin ordenar
        let min_so_far = array[sorted];
        // Índice del elemento mínimo en el sub arreglo sin ordenar
        let idx = sorted;
        // Buscamos el mínimo en el sub arreglo sin ordenar
        for (let j = sorted + 1; j < n; ++j) {
            // Si encontramos un valor menor que el mínimo actual Reemplazamos
            // valor e índice
            if (min_so_far > array[j]) min_so_far = array[j], idx = j;
        }
        // Si el mínimo no está en su lugar, se hace intercambio de posiciones
        if (array[sorted] != min_so_far) swap(array, sorted, idx);
        // Aumentamos el tamaño del sub arreglo ordenado
        sorted++;
    }

    // Devolvemos el mismo arreglo con los cambios
    return array;
}


// No modificar nada debajo de esta línea
// --------------------------------

module.exports = {
    factorear,
    bubbleSort,
    insertionSort,
    selectionSort,
};
