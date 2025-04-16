const { Client, Events, GatewayIntentBits, Collection, ActivityType  } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
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
require('../events/GuildCreate')(client)

// Slash command handler
require('../events/InteractionCreate')(client)

// Prefix command handler
require('../events/MessageCreate')(client)

// Welcome message handler
require('../events/WelcomeMessage')(client)

module.exports = client