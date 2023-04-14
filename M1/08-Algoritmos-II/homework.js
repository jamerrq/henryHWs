'use strict'

/**
 * Solución Tarea # 08 Módulo 1 Henry Full Stack Course FT
 *    AUTOR: Jamer José Rebolledo Quiroz
 *   GitHub: https://github.com/jamerrq
 * Linkedin: https://linkedin.com/in/jamerrq
 */

const { merge } = require("@11ty/eleventy/src/TemplateData");

// No cambies los nombres de las funciones.

function quickSort(array) {
    // Implementar el método conocido como quickSort para ordenar de menor a
    // mayor el array recibido como parámetro Devolver el array ordenado
    // resultante Tu código:

    let n = array.length;
    if (!n) return [];
    let pivot = array[0];
    let left = array.slice(1).reduce((acc, value) => {
        if (value < pivot) acc.push(value);
        return acc;
    }, []);
    let right = array.slice(1).reduce((acc, value) => {
        if (value >= pivot) acc.push(value);
        return acc;
    }, []);
    return quickSort(left).concat([pivot]).concat(quickSort(right));

}

function mergeSort(array) {
    // Implementar el método conocido como mergeSort para ordenar de menor a
    // mayor el array recibido como parámetro Devolver el array ordenado
    // resultante Tu código:

    let n = array.length;
    if (n <= 1) {
        return array;
    } else {
        let half = parseInt(n / 2);
        let left = mergeSort(array.slice(0, half));
        let right = mergeSort(array.slice(half));
        //
        let merged = [];

        let i = 0, j = 0, k = 0;
        while (k < n) {
            if (i == left.length) {
                merged.push(right[j]);
                j++; k++;
                continue;
            }
            if (j == right.length) {
                merged.push(left[i]);
                i++; k++;
                continue;
            }
            if (left[i] < right[j]) {
                merged.push(left[i]);
                i++;
            } else {
                merged.push(right[j]);
                j++;
            }
            k++;
        }
        return merged;
    }
}

// No modificar nada debajo de esta línea
// --------------------------------

module.exports = {
    quickSort,
    mergeSort,
};
