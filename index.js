const express = require('express');
const { Telegraf } = require('telegraf');
const googleTTS = require('google-tts-api');
const { format } = require('date-fns');
const { createResponse, limitRespomse } = require('./gpt');

require('dotenv').config();

const app = express();

const bot = new Telegraf(process.env.BOT_TOKEN);

app.use(bot.webhookCallback('/telegram-bot'));
bot.telegram.setWebhook(`${process.env.BOT_URL}/telegram-bot`);

//Comandos bot


bot.command('test', (ctx) => {
    console.log(ctx.message)
    ctx.reply('ok')
})

let messages = 0

bot.start( (ctx) => {
 
    const welcomeMessage = `
    ¡Hola, ${ctx.chat.first_name || 'usuario'}! 👋
    Bienvenida, ya falta poco para poder empezar el juego de tu cumpleaños. Mañana escribeme y tendrás noticias mías .
    `;

    ctx.sendMessage(welcomeMessage)
});

bot.on('message', async (ctx) => {
    
    const date = new Date()
    const formatDate = format(date, 'yyyy-MM-dd');
    const birthDate = new Date('2025-01-01');
    const formatbirthDate = format(birthDate, 'yyyy-MM-dd')
    console.log(formatDate, formatbirthDate)



      
        if (messages < 1) {
            ctx.sendMessage('Toda aventura comienza con una pequeña excursión...')
            messages++
        }  else if (messages = 1) {
        const response = await createResponse()
        ctx.sendMessage(response);
    } else {
        const response = await limitRespomse()
        ctx.sendMessage(response);
    }







})

app.get('/', (req, res) => {
    res.send('Servidor funciona')
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    const date = new Date()
    console.log('Servidor conectado', date)
})