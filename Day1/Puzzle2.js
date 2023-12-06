const fs = require('fs')

// let digitNamesArr = [{'zero': 0}, {'one': 1}, {'two': 2}, {'three': 3}, {'four': 4}, {'five': 5}, {'six': 6}, {'seven': 7}, {'eight': 8}, {'nine': 9}]
let digitNamesArr = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
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
    const foundDigitsFromString = integerFromStringName(string)
    // console.log('right before the loop: ', foundDigitsFromString)
    for(let i = 0; i < foundDigitsFromString.length; i++) {
        // If the first integer is not an integer yet
        if(!Number.isInteger(parseInt(firstInt))){
            // If we find a number in the string save it as first Int
            if(Number.isInteger(parseInt(foundDigitsFromString[i])) || foundDigitsFromString[i]){
                firstInt = foundDigitsFromString[i]
            }
        }
        // If the first integer is already saved as an integer 
        else {
            //we save the next integer as last integer, this is fine if it gets overwritten a few times since we only care for the last integer
            if(Number.isInteger(parseInt(foundDigitsFromString[i]))){
                lastInt = foundDigitsFromString[i]
            }
        }
    }
    // if the last integer is undefined(IE. there were no more integers after the first one, set the last integer to also be the first integer)
    if(lastInt === undefined){
        lastInt = firstInt
    }
   console.log(foundDigitsFromString, string, [firstInt + lastInt]) 
    return [firstInt + lastInt]
}

// Gotta make this recursive somehow
integerFromStringName = (stringToCheck) => {
    let updatedString = stringToCheck
    digitNamesArr.forEach(
        (integerString, integerNumber) => {
            subStrIndex = updatedString.search(integerString)
            if(subStrIndex !== -1){
                    updatedString = updatedString.replace(integerString, integerNumber)
                    // console.log("NEW STRING: ", updatedString)
                }
            }
    )
    let hasDigitNames = digitNamesArr.find(digitName => updatedString.includes(digitName))
    // console.log('after: ', updatedString)
    if(hasDigitNames){ 
        // console.log('recursion cond: ', updatedString)
        return integerFromStringName(updatedString) 
    }
    else {
        // console.log('no more matches, should return the string: ', updatedString)
        return updatedString
    }
}

// sumOfFirstAndLast("eightnineseven21seven")