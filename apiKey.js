const apiKey = "76ceb0f77ed70a37d5b6c401";


function createCounter(init) {
    let count = init;
    return {
    increment: function() {
    count += 1;
    return count;
    },
    decrement: function() {
    count -= 1;
    return count;
    },
    reset: function() {
    count = init;
    return count;
    }
    };
  }



function filter(arr, fn){
    const filtered = [];
    for(let i=0; i < arr.length; i++){
        if(fn(arr[i], i)){
            filtered.push(arr[i]);
        }
    } 
    return filtered;
}

const arr = [10,20,30,40,50,60,70];
function greaterThan10(n){
    return n > 10;
}

const finishedFiltered = filter(arr, greaterThan10);
console.log(finishedFiltered);