"use strict";

const { captureRejectionSymbol } = require("@11ty/eleventy/src/Util/AsyncEventEmitter");
let exerciseUtils = require("./utils");

let args = process.argv.slice(2).map(function (st) {
    return st.toUpperCase();
});

module.exports = {
    problemAx: problemA,
    problemBx: problemB,
    problemCx: problemC,
    problemDx: problemD,
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
    let problem = module.exports["problem" + arg];
    if (problem) problem();
});

async function problemA() {
    // // callback version
    // exerciseUtils.readFile("poem-one/stanza-01.txt", function (err, stanza) {
    //     exerciseUtils.blue(stanza);
    // });
    // exerciseUtils.readFile("poem-one/stanza-02.txt", function (err, stanza) {
    //     exerciseUtils.blue(stanza);
    // });

    // async await version
    // Tu código acá:

    // a. Con el método promisifiedReadFile debes loguear la stanza-01.txt
    // y la stanza-02.txt que se encuentra en la carpeta poem-two

    // b. Por el momento ignora los errores

    // c. Las dos promesas deben leerse simultáneamente en cualquier orden
    await Promise.all([
        exerciseUtils.promisifiedReadFile('poem-two/stanza-01.txt').then(
            (stanza) => exerciseUtils.blue(stanza)
        ),
        exerciseUtils.promisifiedReadFile('poem-two/stanza-02.txt').then(
            (stanza) => exerciseUtils.blue(stanza)
        ),
    ]);

    // d. Por último debes loguear 'done' cuando ambas promesas hayan terminado.
    console.log('done');

};

async function problemB() {
    let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
        return "poem-two/" + "stanza-0" + n + ".txt";
    });

    // // callback version
    // filenames.forEach((filename) => {
    //     exerciseUtils.readFile(filename, function (err, stanza) {
    //         exerciseUtils.blue(stanza);
    //     });
    // });

    // async await version
    // Tu código acá:

    // a. Con el método promisifiedReadFile debes loguear todos los stanzas
    // que se encuentran en la carpeta poem-two

    // b. Por el momento ignora los errores

    // c. Las promesas deben ser resueltas simultáneamente en cualquier orden
    let promises = [];
    filenames.forEach(filename => {
        promises.push(exerciseUtils.promisifiedReadFile(filename).then(
            (stanza) => exerciseUtils.blue(stanza),
        ));
    });
    await Promise.all(promises);

    // d. Por último debes loguear 'done' cuando todas las promesas
    // hayan terminado
    console.log('done');
};

async function problemC() {
    let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
        return "poem-two/" + "stanza-0" + n + ".txt";
    });

    // // callback version
    // filenames.forEach((filename) => {
    //     exerciseUtils.readFile(filename, function (err, stanza) {
    //         exerciseUtils.blue(stanza);
    //     });
    // });

    // async await version
    // Tu código acá:

    // a. Con el método promisifiedReadFile debes loguear todas las stanzas
    // que se encuentran en la carpeta poem-two

    // b. Por el momento ignora los errores

    // c. Las promesas deben ser resueltas en orden y en serie, es decir,
    // cada promesa se resuelve cuando la anterior haya terminado
    for (let i = 0; i < filenames.length; ++i) {
        await exerciseUtils.promisifiedReadFile(filenames[i]).then(
            (stanza) => exerciseUtils.blue(stanza),
        );
    };

    // d. Por último debes loguear 'done' cuando todas las promesas
    // hayan terminado
    console.log('done');
};

async function problemD() {
    let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
        return "poem-two/" + "stanza-0" + n + ".txt";
    });
    let randIdx = Math.floor(Math.random() * filenames.length);
    filenames[randIdx] = "wrong-file-name-" + (randIdx + 1) + ".txt";

    // // callback version
    // filenames.forEach((filename) => {
    //     exerciseUtils.readFile(filename, function (err, stanza) {
    //         exerciseUtils.blue(stanza);
    //         if (err) exerciseUtils.magenta(new Error(err));
    //     });
    // });

    // async await version
    // Tu código acá:

    // a. Con el método promisifiedReadFile debes loguear todas las
    // stanzas que se encuentran en la carpeta poem-two

    // b. En este ejercicio debes tener en cuenta los errores

    // c. Las promesas deben ser resueltas en orden y en serie,
    // es decir, cada promesa se resuelve cuando la anterior haya terminado
    for (let i = 0; i < filenames.length; ++i) {

        try {
            await exerciseUtils.promisifiedReadFile(filenames[i]);
        } catch (error) {
            exerciseUtils.magenta(error);
        };

    };

    // d. Por último debes loguear 'done' cuando todas las promesas hayan
    // terminado
    console.log('done');

};
