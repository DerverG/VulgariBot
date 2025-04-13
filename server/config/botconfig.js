const { Client, Events, GatewayIntentBits, Collection, ActivityType  } = require('discord.js');
const axiosClient = require('./axiosClient')
const path = require('path')
const fs = require('fs')

const fetchServerConfig = async (serverGuildId) => {
    try {
        const response = await axiosClient.get(`/server/getServerConfig?serverGuildId=${serverGuildId}`)
        return response.data.config
    } catch (err) {
        console.error('Error fetching server config:', err)
        return null
    }
}

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

    readyClient.user.setPresence({
        activities: [
            {
                name: 'tus modales.', // Displayed activity name
                type: ActivityType.Watching // 'Competing', 'Custom', 'Listening', 'Playing', 'Streaming', 'Watching'
            }
        ],
        status: 'online' // 'online', 'idle', 'dnd', 'invisible'
    })
})

// Config Guild creation
client.on(Events.GuildCreate, async guild => {
    const serverGuildId = guild.id
    const serverName = guild.name
    const serverPrefix = '!' // Default prefix

    try {
        await axiosClient.post('/server/setup', {
            serverGuildId,
            serverName,
            serverPrefix,
        })
        console.log(`Server configuration created for ${serverName}, ID: ${serverGuildId}`)
    } catch (err) {
        console.error('Error creating server configuration:', err)
    }
})


// Slash command handler
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand() || !interaction.guild) return

    const command = client.slashCommands.get(interaction.commandName)
    if (!command) return

    const config = await fetchServerConfig(interaction.guild.id)

    try {
        await command.execute(interaction, config)
    } catch (error) {
        console.error(error)
        await interaction.reply({ content: 'Hubo un error al ejecutar el comando.', ephemeral: true })
    }
})

// Prefixed command handler
client.on(Events.MessageCreate, message => {
    if (message.author.bot || !message.guild) return
    
    const config = fetchServerConfig(message.guild.id)

    if (!config) return

    const PREFIX = config.prefix

    if (!message.content.startsWith(PREFIX)) return
    
    const args = message.content.slice(PREFIX.length).trim().split(/ +/)
    const commandName = args.shift().toLowerCase()

    const command = client.prefixCommands.get(commandName)
    if (!command) return

    try {
        command.run(client, message, args, config)
    } catch (error) {
        console.error(error)
        message.channel.send('Hubo un error al ejecutar el comando.')
    }
})

module.exports = client