const { REST, Routes } = require('discord.js')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

// Crear lista para comandos
const commands = []

console.log('DISCORD_CLIENT_ID:', process.env.DISCORD_CLIENT_ID)
console.log('DISCORD_GUILD_ID:', process.env.DISCORD_GUILD_ID)

// Ruta de los comandos slash
const commandsPath = path.join(__dirname, '../commands/slash')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

// Cargar comandos
for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file))

    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON())
    } else {
        console.warn(`[ADVERTENCIA] El comando en ${file} no tiene "data" o "execute".`)
    }
}

// Crear instancia de REST
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)

// Registrar comandos (modo guild/test)
async function registerCommands() {
    try {
        console.log('🔄 Registrando comandos slash...')

        await rest.put(
            Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID),
            { body: commands }
        )

        console.log('✅ Comandos de prueba registrados correctamente en el servidor.')
    } catch (error) {
        console.error('❌ Error al registrar comandos:', error)
    }
}

registerCommands()