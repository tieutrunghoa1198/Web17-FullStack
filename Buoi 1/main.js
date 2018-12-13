//day 1 
console.log("hello world");
// parameters: const let var 
const constVar = "abc";
// constVar = "XYZ";

let variable = "123456";
console.log(variable);
variable = 5;
console.log(variable);
variable = true;
console.log(variable);

var obj = {
    name: "hoa",
    age: 20
};

// console.log(obj.age);
// console.log(obj["name"]);

// obj.fullName = "tieu hoa";
// obj.fullName += " trung";
// console.log(`minh ten la ${obj.fullName}`);

let arr = [1, 2, 3, 4, "123", true];

// arr.push("asdf");
// console.log(arr);

// for (let i = 0; i < arr.length; i++) {
//     console.log(arr[i]);
// }

// arr.forEach(function(item, index, array){
//     console.log(item, index, array);
// })

console.log(arr.map(function(item){
    return item*2;
}))

function funcA(text, text2) {
    console.log(text, text2);
}

funcA("function A", 123);

const functionC = () => {
    console.log("function C");
}

functionC();

let currentTime = new Date();
currentTime.getDate();

let regex = new RegExp("^[\\w-\\d]+(\\.[\\w\\d]+)*@[\\w-]+(\\.[\\w]+)*(\\.[a-z]{2,4})$");
// regex.test(1234);

// var a = 5;
// function print(){
//     var b = 10;
//     console.log(a); // 5
//     console.log(b); // 10 
// }

// print();
// console.log(a); // 5 
// // console.log(b); // undefined

// setTimeout(function() {
//     console.log("check time out")
// }, 1000);

// function countDown(count){
//     //var index 
//     for (var index = count; index >= 0; index--) {
//         //let index
//         setTimeout(() => {
//            console.log(index); 
//         }, (count - index)*1000);
        
//     }
// }

// countDown(5);

function callback(result){
    console.log(result);
}

function print(onWaitDOne){
    let result = 1 + 1;
    setTimeout(() => {
       onWaitDOne(result); 
    }, 1000);
}

console.log("start");
print(callback);