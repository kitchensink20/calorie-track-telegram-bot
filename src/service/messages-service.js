const messages = require('../../messages.json'); 

const getParsedReply = (chatgptReply) => {
    console.log('chatgptReply')
    console.log(chatgptReply)
    const parsedReply = JSON.parse(chatgptReply);
    console.log('parsedReply')
    console.log(parsedReply)
    if (!parsedReply.isFood) {
        return messages.foodRecognizingError;
    } else if (parsedReply.caloriesAmount) {
        return `The food in the picture is estimated to contain ${parsedReply.caloriesAmount} calories.`
    }
    return null;
}

module.exports = {
    getParsedReply,
}