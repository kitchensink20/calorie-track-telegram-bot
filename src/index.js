const express = require('express');
const dotenv = require('dotenv');
const bot = require('./bot');
const { connectDB } = require('./config/db.js');

dotenv.config();
connectDB();

bot.launch().then(() => {
    console.log('Bot is running.');
});

const app = express();
const port = process.env.EXPRESS_PORT || 5010;

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
  
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
