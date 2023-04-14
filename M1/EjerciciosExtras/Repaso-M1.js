const {
    Queue,
    Node,
    LinkedList,
    BinarySearchTree
} = require('./DS.js');

/**
 * Solución Ejercicios de Repaso Módulo 1 Henry Full Stack Course
 * Autor: Jamer José Rebolledo Quiroz
 * Github: https://github.com/jamerrq
 * Linkedin: https://linkedin.com/in/jamerrq
 */

var countArray = function (array) {
    if (!Array.isArray(array)) return array;
    return array.reduce((acc, value) => acc + countArray(value), 0);
}

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

var closureMult = function (multiplier) {
    return (arg) => arg * multiplier;
}

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
