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

const userMessages = {};

bot.command(/\/start/, (ctx) => {
 
    const welcomeMessage = `
    ¡Hola, ${ctx.chat.first_name || 'usuario'}! 👋
    Bienvenida, ya falta poco para poder empezar el juego de tu cumpleaños. Cada vez que quieras pedirme algo debes escribir /pista .
    `;

    ctx.reply(welcomeMessage)
});

bot.on('message', async (ctx) => {

    const date = new Date()
    const formatDate = format(date, 'yyyy-MM-dd');
    const birthDate = new Date('2025-01-01');
    const formatbirthDate = format(birthDate, 'yyyy-MM-dd')
    console.log(formatDate, formatbirthDate)

    

    const chatId = ctx.chat.id;



    if (!userMessages[chatId]) {
        userMessages[chatId] = {
            messages: 0,
            date: formatDate,
        };
    }


    if (userMessages[chatId].date !== formatDate) {
        userMessages[chatId].messages = 0;
        userMessages[chatId].date = formatDate;
    }

    const userData = userMessages[chatId];





    
    // mensaje antes de la fecha
    if (formatDate < birthDate) {
      
        if (userData.messages < 1) {
            ctx.reply('Aún falta un poquito para tu cumpleaños, paciencia')
            userData.messages++
        }  else {
        const response = await limitRespomse()
        ctx.reply(response);
    }
}

    //mensaje el dia de la fehca
    if (formatDate == formatbirthDate) {
     
        if (userData.messages < 1) {
            const url = googleTTS.getAudioUrl('Feliz cumpleaños', {
                lang: 'es',
                slow: false,
                host: 'translate.google.com'
            })
            ctx.replyWithAudio(url);
            ctx.reply('A partir de hoy empieza el juego. Para conocer más sobre las sorpesas que te esperan este mes tienes derecho a una pregunta cada día hasta que se te indique que el juego a finalizado')
            userData.messages++
        } else if (userData.messages < 2 && userData.messages > 0) {
            const response = await createResponse()
            console.log(messages)
            ctx.reply(response);
            userData.messages++
        } else {
            const response = await limitRespomse()
            console.log(messages)
            ctx.reply(response);
        }
    }

    //mensaje despues de la fecha

    if (formatDate < format(new Date(2025, 1, 4), 'yyyy-MM-dd') && formatDate > format(new Date(2025, 1, 1), 'yyyy-MM-dd')) {
       
        if (userData.messages < 1) {
            const response = await createResponse()
            console.log(messages)
            ctx.reply(response);
            userData.messages++
        } else {
            const response = await limitRespomse()
            console.log(messages)
            ctx.reply(response);
        }
    }

    // mensaje el día 04

    if (formatDate == format(new Date(2025, 1, 4), 'yyyy-MM-dd')) {

        if (userData.messages < 1) {
            ctx.reply('Hoy es sabado, quizás deberías ir pensando en un look para esta noche')
            userData.messages++
        } else {
            const response = await limitRespomse()
            console.log(messages)
            ctx.reply(response);
        }
    }

    // mensaje el día 05

    if (formatDate == format(new Date(2025, 1, 5), 'yyyy-MM-dd')) {
       
        if (userData.messages < 1) {

            ctx.reply('Hoy es la cabalgata de reies, no tengo tiempo de darte mas pistas')
            userData.messages++
        } else {
            const response = await limitRespomse()
            console.log(messages)
            ctx.reply(response);
        }
    }

    // mensaje del día 5 al 10

    if (formatDate == format(new Date(2025, 1, 5), 'yyyy-MM-dd')) {
      
        if (userData.messages < 1) {
            const response = await createResponse()
            console.log(messages)
            ctx.reply(response);
            userData.messages++

        } else {
            const response = await limitRespomse()
            console.log(messages)
            ctx.reply(response);
        }
    }

    // mensaje el día 10

    if (formatDate == format(new Date(2025, 1, 10), 'yyyy-MM-dd')) {
        
        if (userData.messages < 1) {
            ctx.reply('Esta tarde tienes una misión, preparar una maleta. En algún momento del día recibiras más instrucciones.')
            userData.messages++

        } else {
            const response = await limitRespomse()
            console.log(messages)
            ctx.reply(response);
        }
    }

    // Continuara...






})

app.get('/', (req, res) => {
    res.send('Servidor funciona')
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor conectado')
})