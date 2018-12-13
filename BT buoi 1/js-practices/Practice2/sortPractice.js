'use strict'
//interchange sort
// function sort(input) {
//   for(let i = 0; i <= input.length - 2; i++)
//     for(let k = i+1; k <= input.length - 1; k++){
//       if(input[i] > input[k]){
//         let temp = input[i];
//         input[i] = input[k];
//         input[k] = temp;
//       }
//     }
//     return input;
//     // Remove this line and change to your own algorithm
// }

//quick sort 
function sort(input){
  beforeSort(input, 0, input.length - 1);
  return input;
}

function partition(arr, low, high){
  let pivot = arr[high];
  let i = (low - 1);
  for(let j = low; j < high; j++){
    if( arr[j] <= pivot){
      i++;
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  let temp = arr[i+1];
  arr[i+1] = arr[high];
  arr[high] = temp;

  return i+1;
}

function beforeSort(arr, low, high){
  if(low < high){
    let pi = partition(arr, low, high);

    beforeSort(arr, low, pi-1);
    beforeSort(arr, pi+1, high);
  }
}



module.exports = sort
