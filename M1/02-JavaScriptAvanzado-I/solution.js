/**
 * Solución Tarea # 02 Módulo 1 Henry Full Stack Course FT
 *    AUTOR: Jamer José Rebolledo Quiroz
 *   GitHub: https://github.com/jamerrq
 * Linkedin: https://linkedin.com/in/jamerrq
 */

/**
 * EJERCICIO 1
 * Investiga cuál es la diferencia entre declarar una variable con var y
 * directamente asignarle un valor.
 *
 * [R:] La diferencia reside en que estas variables declaradas sin var
 * no se quedarán registradas en el entorno global y podrán producir un error
 * a la hora de ejecutar ciertos comandos.
 */
console.log("EJERCICIO 1\n");

x = 1;
var a = 5;
var b = 10;
var c = function (a, b, c) {
    var x = 10;
    console.log(x); // print(10);
    console.log(a); // print(8);
    var f = function (a, b, c) {
        b = a; // b = 8;
        console.log(b) // print(8);
        b = c;
        var x = 5;
    };
    f(a, b, c);
    console.log(b); // print(9)
};
c(8, 9, 10);
console.log(b); // print(10)
console.log(x); // print(1);

// PRINTS
10
8
8
9
10
1

/**
 * EJERCICIO 2
 */
console.log("\nEJERCICIO 2\n");

console.log(bar); // undefined
// console.log(baz); // [Uncaught Exception] ReferenceError: baz is not defined
foo(); // Hola!
function foo() {
    console.log('Hola!');
}
var bar = 1;
baz = 2;


/**
 * EJERCICIO 3
 */
console.log("\nEJERCICIO 3\n");

var instructor = 'Tony';
if (true) {
    var instructor = 'Franco';
}
console.log(instructor); // Franco

/**
 * EJERCICIO 4
 */
console.log("\nEJERCICIO 4\n");

var instructor = 'Tony';
console.log(instructor); // Tony;
(function () {
    if (true) {
        var instructor = 'Franco';
        console.log(instructor); // Franco
    }
}
)();
console.log(instructor); // Tony

/**
 * EJERCICIO 5
 */
console.log("\nEJERCICIO 5\n");

var instructor = 'Tony';
let pm = 'Franco';
if (true) {
    var instructor = 'The Flash';
    let pm = 'Reverse Flash';
    console.log(instructor); // The Flash
    console.log(pm); // Reverse Flash
}
console.log(instructor); // The Flash (vars objects can be redefined)
console.log(pm); // Franco

/**
 * EJERCICIO 6
 * ¿Cuál crees que será el resultado de la ejecución de estas operaciones?:
 */
console.log("\nEJERCICIO 6\n");

console.log(6 / "3"); // 2
console.log("2" * "3"); // 6
console.log(4 + 5 + "px"); // "9px"
console.log("$" + 4 + 5); // "$45"
console.log("4" - 2); // 2
console.log("4px" - 2); // NaN
console.log(7 / 0); // Infinity
console.log({}[0]); // undefined
console.log(parseInt("09")); // 9
console.log(5 && 2); // 2
console.log(2 && 5); // 5
console.log(5 || 0); // 5
console.log(0 || 5); // 5
console.log([3] + [3] - [10]); // 23
console.log(3 > 2 > 1); // false (true > 1)
console.log([] == ![]); // true


/**
 * EJERCICIO 7
 * ¿Cuál es el output o salida en consola luego de ejecutar este código?
 * Explicar por qué:
 */
console.log("\nEJERCICIO 7\n");

function test() {
    console.log(a); // undefined
    console.log(foo()); // 2

    var a = 1;
    function foo() {
        return 2;
    }
}

test();


/**
 * EJERCICIO 8
 */
console.log("\nEJERCICIO 8\n");

var snack = 'Meow Mix';

function getFood(food) {
    if (food) {
        var snack = 'Friskies';
        return snack;
    }
    return snack;
}

console.log(getFood(false)); // undefined

/**
 * EJERCICIO 9
 * ¿Cuál es el output o salida en consola luego de ejecutar esté código?
 * Explicar por qué:
 */
console.log("\nEJERCICIO 9\n");

var fullname = 'Juan Perez';
var obj = {
    fullname: 'Natalia Nerea',
    prop: {
        fullname: 'Aurelio De Rosa',
        getFullname: function () {
            return this.fullname;
        },
    },
};

console.log(obj.prop.getFullname()); // Aurelio de la Rosa
var test = obj.prop.getFullname;
console.log(test()); // undefined, no hay contexto de this

/**
 * EJERCICIO 10
 * Considerando el siguiente código,
 * ¿Cuál sería el orden en el que se muestra por consola? ¿Por qué?
 */
console.log("\nEJERCICIO 10\n");

function printing() {
    console.log(1);
    setTimeout(function () {
        console.log(2);
    }, 1000);
    setTimeout(function () {
        console.log(3);
    }, 0);
    console.log(4);
}

printing();

// ORDEN
// 1 (inmediat) -> 4 (no timeout) -> 3 (timeout of 0 secs) -> 2 (timeout of 1s)
