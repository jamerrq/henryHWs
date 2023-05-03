const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");


function pwd(print) {
    print(process.cwd());
}


function date(print) {
    print(Date());
}


function echo(print, args) {
    print(args);
}


function ls(print) {
    let callback = (error, files) => {
        if (error) {
            throw error;
        };
        print(files.join(" "));
    };
    fs.readdir('.', callback);
}


function cat(print, args) {
    let callback = (error, data) => {
        if (error) {
            throw error;
        };
        print(String(data));
    };
    fs.readFile(args, 'utf-8', callback);
}


function head(print, args) {
    let callback = (error, data) => {
        if (error) {
            throw error;
        };
        let lines = String(data).split("\n");
        print(lines[0]);
    };
    fs.readFile(args, 'utf-8', callback);
}


function tail(print, args) {
    let callback = (error, data) => {
        if (error) {
            throw error;
        };
        let lines = String(data).split("\n");
        lines = lines.map(line => line.trim());
        print(String(lines[lines.length - 1]));
    };
    fs.readFile(args, 'utf-8', callback);
}


function curl(print, args) {
    let callback = (error, response) => {
        if (error) {
            throw error;
        }
        print(String(response));
    }
    // console.log(args);
    utils.request(args, callback);
}


module.exports = {
    pwd,
    date,
    echo,
    ls,
    cat,
    head,
    tail,
    curl,
};
