const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const path = require('path')
const fs = require('fs')

const PREFIX = '!'

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
})

// Colecciones para comandos
client.slashCommands = new Collection()
client.prefixCommands = new Collection()

// Cargar Slash Commands
const slashPath = path.join(__dirname, '../commands/slash')
fs.readdirSync(slashPath).forEach(file => {
    const command = require(`../commands/slash/${file}`)
    client.slashCommands.set(command.data.name, command)
})

// Cargar Prefix Commands
const prefixPath = path.join(__dirname, '../commands/prefix')
fs.readdirSync(prefixPath).forEach(file => {
    const command = require(`../commands/prefix/${file}`)
    client.prefixCommands.set(command.name, command)
})

client.on(Events.ClientReady, readyClient => {
    console.log(`Logged in as ${readyClient.user.tag}!`);
})

// Slash command handler
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return

    const command = client.slashCommands.get(interaction.commandName)
    if (!command) return

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply({ content: 'Hubo un error al ejecutar el comando.', ephemeral: true })
    }
})

// Prefixed command handler
client.on(Events.MessageCreate, message => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return

    const args = message.content.slice(PREFIX.length).trim().split(/ +/)
    const commandName = args.shift().toLowerCase()

    const command = client.prefixCommands.get(commandName)
    if (!command) return

    try {
        command.run(client, message, args)
    } catch (error) {
        console.error(error)
        message.channel.send('Hubo un error al ejecutar el comando.')
    }
})

module.exports = {
    client
}