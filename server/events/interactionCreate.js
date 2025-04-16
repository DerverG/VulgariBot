const { Events, Collection } = require('discord.js')
const fetchServerConfig = require('../api/fetchServerConfig')
const path = require('path')
const fs = require('fs')

module.exports = (client) => {
    // Coleccion para comandos
    client.slashCommands = new Collection()

    // Cargar Slash Commands
    const slashPath = path.join(__dirname, '../commands/slash')
    fs.readdirSync(slashPath).forEach(file => {
        const command = require(`../commands/slash/${file}`)
        client.slashCommands.set(command.data.name, command)
    })

    client.on(Events.InteractionCreate, async (interaction) => {
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
}
