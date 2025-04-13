// Codigo para probar Slash Commands de Discord (modo guild/test)
const { REST, Routes } = require('discord.js')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const commands = []

const commandsPath = path.join(__dirname, '../commands/slash')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`../commands/slash/${file}`)
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON())
    } else {
        console.warn(`[ADVERTENCIA] El comando en ${file} no tiene "data" o "execute".`)
    }
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

rest.put(
    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
    { body: commands }
)
    .then(() => console.log('✅ Comandos de prueba registrados correctamente en el servidor.'))
    .catch(console.error)
