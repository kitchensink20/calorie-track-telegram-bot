const { openai } = require("../config/chatgpt");

const getCaloriesAmountByPhoto = async (photoUrl) => {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo',
        messages: [
            { role: 'system', 'content': 
                `
                    Follow the next rules:
                    - You are created to count calories of the food based on the picture. 
                    - Your answers are always in JSON format, returning the next information about the given picture: 
                    { "isFood": boolean, "caloriesAmount": number | undefined }. 
                    - If the sent picture is not food, the "caloriesAmount" is always null and "isFood" is false. 
                    - Reply shoould be as JSON, but in plain text.'
                `
            },
            { role: 'user', 'content': [ {
                'type': 'image_url', 
                'image_url': { 'url': photoUrl } 
            } ] },
        ],
    });
    return completion.choices[0].message.content;
}

module.exports = {
    getCaloriesAmountByPhoto,
}
