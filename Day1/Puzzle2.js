const fs = require('fs')

// let digitNamesArr = [{'zero': 0}, {'one': 1}, {'two': 2}, {'three': 3}, {'four': 4}, {'five': 5}, {'six': 6}, {'seven': 7}, {'eight': 8}, {'nine': 9}]
const digitsArr = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const digitToIntegerMap = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
};

fs.readFile('input.txt', 'utf-8', (err, fullText) => {
    let doubleDigitArr = [];
    if (err) throw err;
    const textArray = fullText.split('\n')
    textArray.forEach(
        string => {
            doubleDigitArr.push(integerFromStringName(string))
        }
    )
    const reducedArr = doubleDigitArr.reduce((acc, cur) => {
        return acc + parseInt(cur)
    }, 0)
    console.log(reducedArr)
})

integerFromStringName = (stringToCheck) => {
    // Filter the digitsArr to include only the digits present in the stringToCheck
    const matchesWithIndices = digitsArr
        .filter(digit => stringToCheck.includes(digit))
        .map(digit => {
            let index = -1;
            const indices = [];
            // Find all occurrences of the digit in the string and store their indices
            while ((index = stringToCheck.indexOf(digit, index + 1)) !== -1) {
                indices.push(index);
            }
            // Map each index to an object containing the digit and the index
            return indices.map(idx => ({ digit, index: idx }));
        })
        // Flatten the array of arrays into a single array of objects
        .flat()
        // Sort the array of objects based on the index property
        .sort((a, b) => a.index - b.index);

    // Determine the first and last digits based on their occurrences
    const firstAndLastMatches = matchesWithIndices.length >= 1
        ? [matchesWithIndices[0].digit, matchesWithIndices[matchesWithIndices.length - 1].digit]
        : [];

    // Map the first and last digits to their integer counterparts (or use the digit itself if no mapping is available)
    const firstAndLastMatchesWithIntegers = firstAndLastMatches.map(digit => (digitToIntegerMap[digit] ?? digit));

    // Join the mapped digits into a single string and return
    return firstAndLastMatchesWithIntegers.join('');
}