'use strict'

function search(input, target) {
  for (let index = 0; index < input.length ; index++) {
    if(input[index] === target ){
      return index;
    }
  }
  return -1;  // return  input.indexOf(target);  // Remove this line and change to your own algorithm
}

// function search(input, target){
//   var i = 0;
//   while(i < input.length){
//     if(input[i] === target){
//       return i;
//     }
//     i++;
//   }
//   return -1;
// }

module.exports = search
