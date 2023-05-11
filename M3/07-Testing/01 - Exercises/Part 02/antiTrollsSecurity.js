const antiTrollsSecurity = (string) => {
    const vowelRegex = /a|e|i|o|u/i;
    let newString = "";
    for (let i = 0; i < string.length; ++i) {
        // console.log(string[i], vowelRegex.test(string[i]));
        if (!vowelRegex.test(string[i])) {
            newString += string[i];
        };
    };
    return newString;
};

module.exports = antiTrollsSecurity;
