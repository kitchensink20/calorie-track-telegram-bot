const messages = require('../../messages.json'); 

const getParsedReply = (chatgptReply) => {
    const parsedReply = JSON.parse(chatgptReply);
    if (!parsedReply.isFood) {
        return messages.foodRecognizingError;
    } else if (parsedReply.caloriesAmount) {
        return `The food in the picture is estimated to contain ${parsedReply.caloriesAmount} calories.`
    } else if (parsedReply.isFood && !parsedReply.caloriesAmount) {
        return messages.missunderstandingMsg;
    }
    return null;
}

module.exports = {
    getParsedReply,
}