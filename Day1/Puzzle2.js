const fs = require('fs')

// let digitNamesArr = [{'zero': 0}, {'one': 1}, {'two': 2}, {'three': 3}, {'four': 4}, {'five': 5}, {'six': 6}, {'seven': 7}, {'eight': 8}, {'nine': 9}]
const digitNamesArr = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
fs.readFile('example.txt', 'utf-8', (err, fullText) => {
    let doubleDigitArr = [];
    if (err) throw err;
    const textArray = fullText.split('\n')
    textArray.forEach(
        string => {
            doubleDigitArr.push(sumOfFirstAndLast(string))
        }
    )
    const reducedArr = doubleDigitArr.reduce((acc, cur) => {
        console.log("acc: ", acc, "cur: ", cur)
        return acc + parseInt(cur)
    }, 0)
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
   console.log(string, foundDigitsFromString, [firstInt + lastInt]) 
    return [firstInt + lastInt]
}
// Currently cant handle overlapping digits IE eightwothree gives us eigh23 and not 823.
integerFromStringName = (stringToCheck) => {
    let updatedString = stringToCheck
    const arrayOfIntegers = []
    digitNamesArr.forEach(
        (integerString, integerNumber) => {
            subStrIndex = stringToCheck.search(integerString)
            if(subStrIndex !== -1){
                    updatedString = stringToCheck.replace(integerString, integerNumber)
                    arrayOfIntegers.push(integerNumber)
                }
            }
    )
    console.log('arrayOfIntegers: ', arrayOfIntegers)
    let hasDigitNames = digitNamesArr.find(digitName => updatedString.includes(digitName))
    if(hasDigitNames){ 
        return integerFromStringName(updatedString) 
    }
    else {
        return updatedString
    }
}

// sumOfFirstAndLast("eightnineseven21seven")