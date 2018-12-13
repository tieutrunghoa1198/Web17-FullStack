'use strict'
// to search an element and return to its index 
function search(array, target) {
  return  array.indexOf(target);
}
//to sort an array after it were generated
function sort(array) {
   return array.sort((a,b) =>{a-b});
}
//to create an array by using data.json file
function rawArray(value) {
  var array = [];
  for(var i = 0; i < value; i++){
    array[i] = Math.floor(Math.random()*101);
  }
  sort(array);
  return array;
}

function generate(arrayData){
  var testCase = [];
  for(var i = 0; i < arrayData.length - 3; i++){
    let randomNum = Math.floor(Math.random()*101);
    var array = rawArray(arrayData[i]);
    var x = {
      input: array,
      target: randomNum, 
      output: search(array, randomNum)
    }
    testCase.push(x);
  }
  //special case
  //first index
  array = rawArray(arrayData[arrayData.length - 3])
  x = {
    input: array,
    target: array[0], 
    output: search(array, array[0])
  }
  testCase.push(x);
  //last index
  array = rawArray(arrayData[arrayData.length - 2])
  x = {
    input: array,
    target: array[array.length - 1],
    output: search(array, array[array.length - 1])
  }
  testCase.push(x);

  //not found 
  array = rawArray(arrayData[arrayData.length - 1])
  //var maxRange = Math.max.apply(Math, array);
  x = {
    input: array,
    target: array[array.length], 
    output: search(array, array[array.length])
  }
  testCase.push(x);
  
  return testCase;
}

module.exports = generate
