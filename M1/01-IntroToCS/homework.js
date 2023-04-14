'use strict';

function BinarioADecimal(num) {
   return String(num).split("").reverse().reduce((acc, value, index) => {
      return acc + parseInt(value) * Math.pow(2, index);
   }, 0);
}

function BinarioADecimalEasyVersion(num){
   let ans = 0;
   let str = String(num);
   for(let i = 0; i < str.length; ++i){
      let char = str[str.length - i - 1];
      if(parseInt(char)){
         ans += Math.pow(2, i);
      }
   }
   return ans;
}

function DecimalABinario(num) {
   if(num === 0)return "";
   return DecimalABinario(parseInt(num / 2)) + String(num % 2);
}

function DecimalABinarioEasyVersion(num) {
   let bin = "";
   while(num !== 0){
      let mod = num % 2;
      bin += String(mod);
      num = parseInt(num / 2);
   }
   return bin.split("").reverse().join("");
}

module.exports = {
   BinarioADecimal,
   DecimalABinario,
};
