const express = require('express');
const { Telegraf } = require('telegraf');
const googleTTS = require('google-tts-api');
const { format } = require('date-fns');
const { createResponse } = require('./gpt');

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

bot.on('message', async (ctx) => {
    const date = new Date()
    const formatDate = format(date, 'yyyy-MM-dd');
    const birthDate = new Date('2024-01-01');
    const formatbirthDate = format(birthDate, 'yyyy-MM-dd')
    console.log(formatDate, formatbirthDate)



    if (messages < 1) {
        // mensaje antes de la fecha
        if (date < birthDate) {
            ctx.sendMessage('Aún falta un poquito para tu cumpleaños, paciencia')
        }

        //mensaje el dia de la fehca
        if (formatDate == formatbirthDate) {
            const url = googleTTS.getAudioUrl('Feliz cumpleaños', {
                lang: 'es',
                slow: false,
                host: 'translate.google.com'
            })
            ctx.replyWithAudio(url);
            ctx.sendMessage('A partir de hoy empieza el juego. Para conocer más sobre las sorpesas que te esperan este mes tienes derecho a una pregunta cada día hasta que se te indique que el juego a finalizado')
        }

        //mensaje despues de la fecha

        if (formatDate < format(new Date(2025, 1, 4), 'yyyy-MM-dd') && formatDate > format(new Date(2025, 1, 1), 'yyyy-MM-dd')) {

            const response = await createResponse
            console.log(messages)
            ctx.reply(response);
        }

        // mensaje el día 04

        if (formatDate == format(new Date(2025, 1, 4), 'yyyy-MM-dd')) {
            ctx.sendMessage('Hoy es sabado, quizás deberías ir pensando en un look para esta noche')
        }

        // mensaje el día 05

        if (formatDate == format(new Date(2025, 1, 5), 'yyyy-MM-dd')) {
            ctx.sendMessage('Hoy es la cabalgata de reies, no tengo tiempo de darte mas pistas')
        }

        // mensaje del día 5 al 10

        if (formatDate == format(new Date(2025, 1, 5), 'yyyy-MM-dd')) {
            const response = await createResponse
            console.log(messages)
            ctx.reply(response);
        }

        // mensaje el día 10

        if (formatDate == format(new Date(2025, 1, 10), 'yyyy-MM-dd')) {
            ctx.sendMessage('Esta tarde tienes una misión, preparar una maleta. En algún momento del día recibiras más instrucciones.')
        }

        // Continuara...



        messages++

    } else {
        ctx.sendMessage('Solo puedes hacer una pregunta al día')
    }

})

app.get('/', (req, res) => {
    res.send('Servidor funciona')
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor conectado')
})