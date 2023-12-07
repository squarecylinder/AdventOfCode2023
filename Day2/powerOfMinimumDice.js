const fs = require('fs')
const textArg = process.argv[2] || 'input'

fs.readFile(`${textArg}.txt`, 'utf-8', (err, fullText) => {
    if (err) throw err;
    const possibleGames = []
    const textArray = fullText.split('\n')
    textArray.forEach(game => possibleGames.push(checkDiceCount(game)))
    const possibleGamesSum = possibleGames.reduce((acc, cur) => {
        return acc + parseInt(cur)
    }, 0)
    console.log(possibleGamesSum)
})

//check to see if the dice count for a specific color is more than possible
const checkDiceCount = (fullGame) => {
    gameSets = fullGame.split(':').pop().split(';')
    const highestCountPerColor = gameSets.map(setOfDice => {
        singleSetView = setOfDice.trim().split(',')
        return singleSetView.map(singleDiceColor => {
            singleDiceColor = removeWhiteSpace(singleDiceColor.split(' '))
            return { color: singleDiceColor[1], count: singleDiceColor[0] }
        })
    })
        .flat()
        .sort((a, b) => b.count - a.count)
        .reduce((result, item) => {
            const color = item.color;
            const count = parseInt(item.count);

            // Check if the color is not in the result array or if it is but with a lower count
            if (!result.find(i => i.color === color) || result.find(i => i.color === color && parseInt(i.count) < count)) {
                // Remove any previous occurrences of the same color
                result = result.filter(i => i.color !== color);
                // Add the current item to the result array
                result.push(item);
            }

            return result;
        }, []);
    const productOfCounts = highestCountPerColor.reduce((product, item) => {
        const count = parseInt(item.count);
        return product * count;
    }, 1);

    return productOfCounts
}
const removeWhiteSpace = (array) => {
    return array.filter(element => element !== '')
}