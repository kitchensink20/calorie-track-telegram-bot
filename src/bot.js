const dotenv = require('dotenv');
const { Telegraf, Scenes } = require('telegraf');
const messages = require('../messages.json'); 
const { createUserIfNotExist } = require('./service/user-service');
const { getCaloriesAmountByPhoto } = require('./service/chatgpt-service');
const { getParsedReply } = require('./service/messages-service');

dotenv.config();

const stage = new Scenes.Stage([], { ttl: 60 });
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.use(stage.middleware());

bot.command('start', async (ctx) => {
    const user = ctx.from;
    await createUserIfNotExist(user);
    bot.telegram.sendMessage(ctx.chat.id, messages.welcome);
});

bot.on('message', async (ctx) => {
    try {
        const { photo } = ctx.message;
        if (photo) {
            const fileLink = await ctx.telegram.getFileLink(photo[1].file_id);
            ctx.reply(messages.awaitMsg);
            const reply = await getCaloriesAmountByPhoto(fileLink.href);
            const parsedReply = getParsedReply(reply);
            if (parsedReply) {
                ctx.reply(parsedReply);
            } else {
                throw new Error('An error occured.');
            }
        } else {
            ctx.reply(messages.promptErrorMsg);
        }
    } catch (error) {
        console.error('Error handling message:', error);
        ctx.reply(messages.processingErrorMsg);
    }
})

module.exports = bot;