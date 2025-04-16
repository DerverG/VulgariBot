const { Events, Collection } = require('discord.js')
const fetchServerConfig = require('../api/fetchServerConfig')
const path = require('path')
const fs = require('fs')


module.exports = (client) => {
    // Colecciones para comandos
    client.prefixCommands = new Collection()

    // Cargar Prefix Commands
    const prefixPath = path.join(__dirname, '../commands/prefix')
    fs.readdirSync(prefixPath).forEach(file => {
        const command = require(`../commands/prefix/${file}`)
        client.prefixCommands.set(command.name, command)
    })


    client.on(Events.MessageCreate, async (message) => {
        if (message.author.bot || !message.guild) return

        const config = await fetchServerConfig(message.guild.id)
        if (!config) return

        const PREFIX = config.serverPrefix

        if (!message.content.startsWith(PREFIX)) return

        const args = message.content.slice(PREFIX.length).trim().split(/ +/)
        const commandName = args.shift().toLowerCase()

        const command = client.prefixCommands.get(commandName)
        if (!command) return

        try {
            command.run(client, message, args, config)
        } catch (err) {
            console.error(err)
            message.channel.send('Hubo un error al ejecutar el comando.')
        }
    })
}
