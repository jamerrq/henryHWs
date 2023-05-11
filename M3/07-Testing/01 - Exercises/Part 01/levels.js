const levelOne = (a, b) => {
    return a + b;
};

const levelTwo = (letras) => {
    let answer = '';
    for (let i = 0; i < letras.length; i += 2) {
        answer += letras[i];
    };
    return answer;
};

const levelThree = (a, b) => {
    let c = new Array(a.length + b.length);
    a.forEach((value, index) => {
        c[index] = value;
    });
    b.forEach((value, index) => {
        c[index + a.length] = value;
    });
    return c.sort((a, b) => a - b);
};

// console.log(levelThree([1], [2, 3, 4]));

const levelFour = (num) => {
    let suma = 0;
    let numa = num;
    while (num) {
        suma += (num % 10);
        num = parseInt(num / 10);
        // console.log(num);
    };
    let reverse_num = parseInt(String(suma).split("").reverse().join(""));
    // console.log(suma, reverse_num);
    return suma * reverse_num === numa;
};

levelFour(1729);

module.exports = { levelOne, levelTwo, levelThree, levelFour };
