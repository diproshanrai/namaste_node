const fs = require('fs');
const https = require('https');

console.log('Hello World');

var a = 321;

setTimeout(()=>{
    console.log('setTimeout executed after 5 sec')
}, 5000);
var b = 452;



https.get('https://dummyjson.com/products/1', (res)=>{
    console.log("Data fetched successfully");
});

fs.readFile('//chap 7/file.txt', 'utf-8', (err, data)=>[
    console.log('Data is read:', data)
]);


function multiply(x,y){
    const result = x * y;
    return result;
};

var c = multiply(a,b);

console.log(c);