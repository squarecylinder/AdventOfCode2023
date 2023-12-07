const fs = require('fs')
const textArg = process.argv[2] || 'input'
const maxDiceSets = {
'red': 12,
'green': 13,
'blue': 14
}

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
    gameId = fullGame.split(':')[0].slice(4)
    gameSets = fullGame.split(':').pop().split(';')

    const gamePossibilitis = gameSets.map(setOfDice => {
        singleSetView = setOfDice.trim().split(',')
        return singleSetView.map(singleDiceColor => {
            singleDiceColor = removeWhiteSpace(singleDiceColor.split(' '))
            return singleDiceColor[0] <= maxDiceSets[singleDiceColor[1]] ? true : false
        })
    }) 
    const isItPossible = !gamePossibilitis.flat().includes(false)
    return isItPossible ? gameId : 0
}

const removeWhiteSpace = (array) => {
    return array.filter(element => element !== '')
}