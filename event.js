const fs = require("fs");

setImmediate(() => console.log("set immediate"));

Promise.resolve("promis").then(() => {
    process.nextTick(()=>{ 
        // process.nextTick(()=>console.log("in tick"))
        // Promise.resolve("promis").then(()=>console.log("tick promise"));
        console.log("promise tick")});
        Promise.resolve("promis").then(() => console.log("promise promise promise"));
    console.log("promise")
    console.log("next promise")});

process.nextTick(() => {
  process.nextTick(() => console.log("in tick"));
  Promise.resolve("promis").then(() => console.log("tick promise"));
  console.log("next tick");
});

setTimeout(() => console.log("set time out"), 0);

console.log("i am lasy but first");


// 

// 1) i am lasy but first 
// it will run nexttick and all the process next tick inside it they get first priority
// 2)next tick
// 3) in tick

//then it will execute promise 
// 4)promise
// 5) next promise

//after executing promise it will execute those promise which are inside process.nextTick
// 6) tick promise

// then it will excute the promise which were created inside promise
// 7) promise promise promise

// the tick inside promise doesn't execute asap as it will wait for promise to finish its task and then it will run
// 8) promise tick
// 9) set time out
// 10) set immediate