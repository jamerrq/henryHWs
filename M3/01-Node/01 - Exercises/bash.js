const process = require('process');
const { Z_ASCII } = require('zlib');
const commands = require('./commands/index.js');


process.stdin.on = function (data, callback) {

};


function bash() {
    process.stdout.write('prompt > ');
    process.stdin.on("data", (data) => {
        let args = String(data).trim().split(" ");
        let cmd = args.length ? args[0] : undefined;
        if (!commands.hasOwnProperty(cmd)) {
            print(`command not found: ${cmd}`);
        } else {
            commands[cmd](print, args.slice(1).join(" "));
        };
    });
};


function print(output) {
    process.stdout.write(String(output));
    process.stdout.write("\nprompt > ");
};


bash();
module.exports = {
    print,
    bash,
};
