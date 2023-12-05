const fs = require('fs')

fs.readFile('input.txt', 'utf-8', (err, fullText) => {
    let doubleDigitArr = [];
    if (err) throw err;
    const textArray = fullText.split('\n')
    textArray.forEach(
        string => {
            doubleDigitArr.push(sumOfFirstAndLast(string))
        }
    )
    const reducedArr = doubleDigitArr.reduce((acc, cur) => parseInt(acc) + parseInt(cur), 0)
    console.log(reducedArr)
})

sumOfFirstAndLast = (string) => {
    let firstInt;
    let lastInt;
    for(let i = 0; i < string.length; i++) {
        // If the first integer is not an integer yet
        if(!Number.isInteger(parseInt(firstInt))){
            // If we find a number in the string save it as first Int
            if(Number.isInteger(parseInt(string[i]))){
                firstInt = string[i]
            }
        }
        // If the first integer is already saved as an integer 
        else {
            //we save the next integer as last integer, this is fine if it gets overwritten a few times since we only care for the last integer
            if(Number.isInteger(parseInt(string[i]))){
                lastInt = string[i]
            }
        }
    }
    // if the last integer is undefined(IE. there were no more integers after the first one, set the last integer to also be the first integer)
    if(lastInt === undefined){
        lastInt = firstInt
    }
    
    return [firstInt + lastInt]
}

// sumOfFirstAndLast("r27threeqzx27gspmgncgth")