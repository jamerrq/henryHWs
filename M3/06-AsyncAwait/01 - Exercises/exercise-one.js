/*********** Yo explico `exerciseUtils` ********
 *
 * excersiceUtils es una variable que viene de un archivo en este repo
 * El archivo `./utils` esta en este nivel y se llama `utils.js`
 *
 * Este archivo crea un `promisifiedReadFile` - FIJATE EN ÉL!!!
 *
 * Las funciones `blue` y `magenta` para mantener tu código DRY
 *
 ***********************************************/

"use strict";

const utils = require("./utils");
let exerciseUtils = require("./utils");

let args = process.argv.slice(2).map(function (st) {
    return st.toUpperCase();
});

module.exports = {
    problemA: problemA,
    problemB: problemB,
    problemC: problemC,
    problemD: problemD,
    problemE: problemE,
    problemF: problemF,
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
    var problem = module.exports["problem" + arg];
    if (problem) problem();
});

async function problemA() {
    // // callback version
    // exerciseUtils.readFile("poem-one/stanza-01.txt", function (err, stanza) {
    //     console.log("-- A. callback version --");
    //     exerciseUtils.blue(stanza);
    // });

    // asyncAwait version
    // Tu código acá:

    // 1. En este ejercicio debes loguear del poem-one
    // la stanza 1 e ignorar errores

    // a. Utiliza el método promisiedReadFile, que se encuentra dentro
    // del archivo util.js. Este método nos deuelve una promesa que a su vez
    // nos entrega el contenido del archivo.
    let promise = utils.promisifiedReadFile("poem-one/stanza-01.txt");

    // b. La función problemA debe tener el async, llama a la función blue
    // que se encuentra en el archivo utils.js

    // c. Dentro de la función blue espera con await el método
    // promisifiedReadFile que a su vez recibe como parámetro la ruta donde se
    // encuentra stanza-01.txt, recuerda que ésta se encuentra en la carpeta
    // poem-one, por el momento ignora los errores
    exerciseUtils.blue(await promise);
};

async function problemB() {
    // // callback version
    // exerciseUtils.readFile("poem-one/stanza-02.txt", function (err, stanza2) {
    //     console.log("-- B. callback version (stanza two) --");
    //     exerciseUtils.blue(stanza2);
    // });
    // exerciseUtils.readFile("poem-one/stanza-03.txt", function (err, stanza3) {
    //     console.log("-- B. callback version (stanza three) --");
    //     exerciseUtils.blue(stanza3);
    // });

    // asyncawait version
    // Tu código acá:

    // 2. En este ejercicio la finalidad es loguear del poem-one las stanzas
    // stanza-02.txt y stanza-03.txt en cualquier orden.

    // a. La función problemB debe tener el async

    // b. Crea una función asíncrona que recibe un parámetro, el cuál será
    // las stanzas en el cuerpo de la función llama al método blue.
    async function subFunction(stanzaPath) {
        // c. Dentro del método, llama a blue y espera que se resuelva
        // el método promisiedReadFile pasándole como argumento el parámetro
        // que recibe de la función asíncrona
        exerciseUtils.blue(await exerciseUtils.promisifiedReadFile(stanzaPath));
    };

    // d. Para finalizar llama a la función asíncrona dos veces, pasa como
    // argumento la stanza-02.txt en una llamada y en la otra llamada la
    // stanza-03.txt
    subFunction('poem-one/stanza-02.txt');
    subFunction('poem-one/stanza-03.txt');
};

async function problemC() {
    // // callback version
    // exerciseUtils.readFile("poem-one/stanza-02.txt", function (err, stanza2) {
    //     console.log("-- C. callback version (stanza two) --");
    //     exerciseUtils.blue(stanza2);
    //     exerciseUtils.readFile("poem-one/stanza-03.txt", function (err, stanza3) {
    //         console.log("-- C. callback version (stanza three) --");
    //         exerciseUtils.blue(stanza3);
    //         console.log("-- C. callback version done --");
    //     });
    // });

    // asyncawait version
    // Tu código acá:

    // 3. En este ejercicio el objetivo es leer y loguear el poema uno, la
    // stanza-02.txt y después leer y loguear la stanza-03.txt, luego debes
    // loguear 'done' cuando ambas promesas hayan terminado, los tests esperan
    // la palabra exacta done (case sensitive) para ser logueada y pasar.
    // Ignora el manejo de errores para este ejercicio.

    // a. La función problemC debe tener el async, llama a la función blue
    // que se encuentra en el archivo utils.js

    exerciseUtils.blue(
        // b. Dentro de la función blue espera con await el método
        // promisifiedReadFile que a su vez recibe como parámetro la ruta donde
        // se encuentra stanza-02.txt
        // recuerda que por el momento ignora errores
        await exerciseUtils.promisifiedReadFile('poem-one/stanza-02.txt'),
    );

    // c. Haz lo mismo que en el punto b pero para stanza-03.txt
    exerciseUtils.blue(
        await exerciseUtils.promisifiedReadFile('poem-one/stanza-03.txt'),
    );

    // d. Por último consologue done.
    console.log('done');
};

async function problemD() {

    // // callback version
    // exerciseUtils.readFile(
    //     "poem-one/wrong-file-name.txt",
    //     function (err, stanza4) {
    //         console.log("-- D. callback version (stanza four) --");
    //         if (err) exerciseUtils.magenta(new Error(err));
    //         else exerciseUtils.blue(stanza4);
    //     }
    // );

    // asyncawait version
    // Tu código acá:

    // 4. En este ejercicio debes loguear del poem-one la stanza-04.txt o un
    // error si llega a ocurrir

    // a. La función problem D debe tener el async

    // b. Maneja los errores con el bloque try-catch
    try {

        // c. Dentro del bloque try llama a la función blue que se encuentra
        // en el archivo utils.js
        let badRoute = 'poem-one/wrong-filename.txt';
        exerciseUtils.blue(
            // d. Dentro de la función blue espera con await el método
            // promisifiedReadFile que a su vez recibe como parámetro la
            // ruta donde se encuentra stanza-04.txt o un ruta errada,
            // por ejemplo, poem-one/wrong-filename.txt
            await exerciseUtils.promisifiedReadFile(badRoute),
        );

    } catch (error) {

        // e. Dentro del bloque catch quien recibe como parámetro un error,
        // en el cuerpo del catch invoca la función magenta que se encuetra
        // en el archivo utils.js, pasándole como argumento el error.

        exerciseUtils.magenta(error);
    };

};

async function problemE() {
    // // callback version
    // exerciseUtils.readFile("poem-one/stanza-03.txt", function (err, stanza3) {
    //     console.log("-- E. callback version (stanza three) --");
    //     if (err) return exerciseUtils.magenta(new Error(err));
    //     exerciseUtils.blue(stanza3);
    //     exerciseUtils.readFile(
    //         "poem-one/wrong-file-name.txt",
    //         function (err2, stanza4) {
    //             console.log("-- E. callback version (stanza four) --");
    //             if (err2) return exerciseUtils.magenta(err2);
    //             exerciseUtils.blue(stanza4);
    //         }
    //     );
    // });

    // asyncawait version
    // Tu código acá:

    // 5. Teniendo de base los ejercicios anteriores, en esta función
    // debes leer y loguear la stanza-03.txt, luego debe leer y loguear la
    // stanza-04.txt, maneja errores logueando un error si llegara a
    // suceder para cualquiera de las dos stanzas

    // a. La función problemE debe tener el async

    // b. Maneja los errores con el bloque try-catch
    try {

        // c. Dentro del bloque try llama la función blue dos veces una para
        // la stanza-03.txt y otra para la stanza-04.txt
        exerciseUtils.blue(
            // d. Dentro de cada función blue espera con el await el método
            // promisifiedReadFile que a su vez reciba como parámetro
            // la ruta donde se encuentra stanza-03.txt y stanza-04.txt
            await exerciseUtils.promisifiedReadFile('poem-one/stanza-03.txt'),
        );

        exerciseUtils.blue(
            // d. Dentro de cada función blue espera con el await el método
            // promisifiedReadFile que a su vez reciba como parámetro
            // la ruta donde se encuentra stanza-03.txt y stanza-04.txt
            await exerciseUtils.promisifiedReadFile('poem-one/stanza-04.txt'),
        );

        // e. Prueba colocando dentro de una de las funciones blue una ruta
        // errada o la ruta poem-one/wrong-file-name.txt
        let badRoute = 'poem-one/wrong-file-name.txt';
        exerciseUtils.blue(
            // d. Dentro de cada función blue espera con el await el método
            // promisifiedReadFile que a su vez reciba como parámetro
            // la ruta donde se encuentra stanza-03.txt y stanza-04.txt
            await exerciseUtils.promisifiedReadFile(badRoute),
        );

    } catch (error) {

        // f. Dentro del bloque catch quien recibe como parámetro un error,
        // el cuerpo del catch invoca la función magenta que se encuentra
        // dentro del archivo utils.js, pasándole como argumento el error
        exerciseUtils.magenta(error);

    };
};

async function problemF() {
    // // callback version
    // exerciseUtils.readFile("poem-one/stanza-03.txt", function (err, stanza3) {
    //     console.log("-- F. callback version (stanza three) --");
    //     if (err) {
    //         if (err) exerciseUtils.magenta(new Error(err));
    //         console.log("-- F. callback version done --");
    //         return;
    //     }
    //     exerciseUtils.blue(stanza3);
    //     exerciseUtils.readFile(
    //         "poem-one/wrong-file-name.txt",
    //         function (err2, stanza4) {
    //             console.log("-- F. callback version (stanza four) --");
    //             if (err2) exerciseUtils.magenta(new Error(err2));
    //             else exerciseUtils.blue(stanza4);
    //             console.log("-- F. callback version done --");
    //         }
    //     );
    // });

    // asyncawait version
    // Tu código acá:

    // 6. Teniendo de base los ejercicios anteriores, en esta función debes
    // loguear la stanza-03.txt,
    // Luego debe leer la stanza-04.txt, maneja errores logueando un error
    // si llegara a suceder para cualquiera de las dos stanzas y por último,
    // tanto en el bloque try como en el bloque catch siempre debes loguear done
    // cuando haya terminado todo

    // a. La función problemF debe tener el async

    // b. Maneja los errores con el bloque try-catch
    try {

        // c. Dentro del bloque try llama a la función blue dos veces
        // para la stanza-03.txt y la stanza-04.txt
        exerciseUtils.blue(
            // d. Dentro de cada función blue espera con await el método
            // promisifiedReadFile que a su vez reciba como parámetro
            // la ruta donde se encuentra stanza-03.txt y stanza-04.txt

            await exerciseUtils.promisifiedReadFile('poem-one/stanza-03.txt'),
        );

        exerciseUtils.blue(
            // d. Dentro de cada función blue espera con await el método
            // promisifiedReadFile que a su vez reciba como parámetro
            // la ruta donde se encuentra stanza-03.txt y stanza-04.txt

            await exerciseUtils.promisifiedReadFile('poem-one/stanza-04.txt'),
        );

        // e. Prueba colocando dentro de una de las funciones blue una ruta
        // errada o la ruta poem-one/wrong-file-name.txt

        let badRoute = 'poem-one/wrong-file-name.txt';
        exerciseUtils.blue(
            await exerciseUtils.promisifiedReadFile(badRoute),
        );

    } catch (error) {

        exerciseUtils.magenta(error);

    };

    console.log('done');

};
