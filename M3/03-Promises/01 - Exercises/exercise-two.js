"use strict";


let exerciseUtils = require("./utils");


let args = process.argv.slice(2).map(function (st) {
    return st.toUpperCase();
});


module.exports = {
    problemAx: problemA,
    problemBx: problemB
};


// Version
const promises = false;


// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
    let problem = module.exports["problem" + arg];
    if (problem) problem();
});


function problemA() {
    if (!promises) {
        // callback version
        exerciseUtils.readFile("poem-two/stanza-01.txt", function (err, stanza) {
            exerciseUtils.blue(stanza);
        });
        exerciseUtils.readFile("poem-two/stanza-02.txt", function (err, stanza) {
            exerciseUtils.blue(stanza);
        });
        return;
    }

    // promise version
    // Tu código acá:
    exerciseUtils.promisifiedReadFile('poem-two/stanza-01.txt').then((stanza01) => {
        exerciseUtils.blue(stanza01);
    });
    exerciseUtils.promisifiedReadFile('poem-two/stanza-02.txt').then((stanza02) => {
        exerciseUtils.blue(stanza02);
    });
    console.log('done');
};


function problemB() {
    let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
        return "poem-two/" + "stanza-0" + n + ".txt";
    });
    if (!promises) {
        let randIdx = Math.floor(Math.random() * filenames.length);
        filenames[randIdx] = "wrong-file-name-" + (randIdx + 1) + ".txt";

        // callback version
        filenames.forEach((filename) => {
            exerciseUtils.readFile(filename, function (err, stanza) {
                exerciseUtils.blue(stanza);
                if (err) exerciseUtils.magenta(new Error(err));
            });
        });
        return;
    }

    // promise version
    // Tu código acá:
    filenames.forEach((filename) => {
        exerciseUtils.promisifiedReadFile(filename).then((content) => {
            exerciseUtils.blue(content);
        }).catch((error) => {
            exerciseUtils.magenta(new Error(error));
        });
    });
    console.log("done");
};


// EJERCICIO EXTRA
function problemC() {
    let fs = require("fs");
    function promisifiedWriteFile(filename, str) {
        // tu código acá:
    }
};

