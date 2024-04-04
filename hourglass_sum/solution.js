'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'hourglassSum' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */
const hourGlassSize = 3;
const hourGlassCenterItem = 1;
const baseGlassDistance = 2;

function hourglassSum(arr) {
    let maxHourGlassSum = 0;
    
    for(let cursorRow=0; cursorRow+hourGlassSize <= arr.length; cursorRow++){
        for(let cursorColumn=0;cursorColumn+hourGlassSize <= arr[cursorColumn].length; cursorColumn++){   
            const topGlassSum = getTopGlasSum(arr, cursorRow, cursorColumn, hourGlassSize);
            const middleGlassValue = getMiddleGlassValue(arr, cursorRow, cursorColumn);
            const bottomGlassSum = getBottomGlassSum(arr, cursorRow, cursorColumn, hourGlassSize);
            const hourGlassSum = topGlassSum + middleGlassValue + bottomGlassSum;
            if(maxHourGlassSum<hourGlassSum){
                maxHourGlassSum = hourGlassSum;
            }
        }
    }
    console.log(maxHourGlassSum);
    return maxHourGlassSum;
}

function getTopGlasSum(arr, cursorRow, cursorColumn, elementQty){
    let sum = 0;
    while(elementQty>0){
        sum += arr[cursorRow][cursorColumn+(elementQty-1)];
        elementQty--;
    }    
    return sum;
}

function getMiddleGlassValue(arr, cursorRow, cursorColumn){
    return arr[cursorRow+hourGlassCenterItem][cursorColumn+hourGlassCenterItem];
}

function getBottomGlassSum(arr, cursorRow, cursorColumn, elementQty){
    let sum = 0;
    while(elementQty>0){
        sum += arr[cursorRow+baseGlassDistance][cursorColumn+(elementQty-1)];
        elementQty--;
    }    
    return sum;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let arr = Array(6);

    for (let i = 0; i < 6; i++) {
        arr[i] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    const result = hourglassSum(arr);

    ws.write(result + '\n');

    ws.end();
}
