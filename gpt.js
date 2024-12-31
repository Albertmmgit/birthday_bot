const { OpenAI } = require('openai');
require('dotenv').config()


const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY
})

async function createResponse() {

    const response = await openai.chat.completions.create({
        model: 'chatgpt-4o-latest',
        messages: [
            {role: 'system', content: 'Eres mi asistente para prearar una fiesta de cumpleaños'},
            {role: 'assistant', content: 'Eres un usuario de un chat, por lo que debes usar un lengiaje amigable e informal'},
            {role: 'user', content: 'Debes decir al usuario que todavía es pronto para tener mas pistas sobre la sorpresa de cumpleaños, debes hacerlo de manera divertida y utilizando como mucho veinte palabras'}
        ]
    })
    return response.choices[0].message.content;
}

async function limitRespomse() {
    const response = await openai.chat.completions.create({
        model: 'chatgpt-4o-latest',
        messages: [
            {role: 'system', content: 'Eres mi asistente para prearar una fiesta de cumpleaños'},
            {role: 'assistant', content: 'Eres un usuario de un chat, por lo que debes usar un lengiaje amigable e informal'},
            {role: 'user', content: 'Debes decir al usuario que solo puede realizarte una consulta al dia, debes hacerlo de manera divertida y utilizando como mucho veinte palabras'}
        ]
    })
    return response.choices[0].message.content;

}

module.exports = {
    createResponse,
    limitRespomse
}