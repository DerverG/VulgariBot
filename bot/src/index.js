const { client } = require('./botconfig')
require('dotenv').config()

const TOKEN = process.env.TOKEN

client.login(TOKEN)
    .then(() => {
        console.log('Bot conectado correctamente.')
    })
    .catch(err => {
        console.error('Error al iniciar sesión:', err)
    })