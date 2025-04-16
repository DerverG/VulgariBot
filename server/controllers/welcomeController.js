const Welcome = require('../schemas/welcomeSchema')
const flattenObject = require('../utils/flattenObject')

const getWelcomeMessage = async (req, res) => {
    try {
        const { serverGuildId } = req.query

        // Verificar si hay un ID
        if (!serverGuildId) return res.status(400).json({ message: 'Server ID is required' })

        // Buscar mensaje de bienvenida
        const welcomeMessage = await Welcome.findOne({ serverGuildId })
        if (!welcomeMessage) return res.status(404).json({ message: 'Welcome message not found' })

        return res.status(200).json({ message: 'Welcome Message', welcomeMessage })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const addWelcomeMessage = async (req, res) => {
    try {
        const { welcomeMessage } = req.body

        if (!welcomeMessage) return res.status(400).json({ message: 'Welcome message is required' })

        if (!welcomeMessage.serverGuildId) return res.status(400).json({ message: 'Server ID is required' })

        const existingMessage = await Welcome.findOne( { serverGuildId: welcomeMessage.serverGuildId })
        if (existingMessage) return res.status(400).json({ message: 'Welcome message already exists for this server'})

        // Crear nuevo mensaje de bienvenida
        const newWelcomeMessage = new Welcome({
            serverGuildId: welcomeMessage.serverGuildId,
            message: welcomeMessage?.message,
            messageEmbed: {
                enabled: welcomeMessage.messageEmbed.enabled ?? false,
                title: welcomeMessage.messageEmbed?.title,
                description: welcomeMessage.messageEmbed?.description,
                color: welcomeMessage.messageEmbed?.color,
                imageURL: welcomeMessage.messageEmbed?.imageURL,
                thumbailURL: welcomeMessage.messageEmbed?.thumbailURL,
                footerText: welcomeMessage.messageEmbed?.footerText,
            }
        })

        await newWelcomeMessage.save()

        return res.status(200).json({ message: 'Welcome message created', newWelcomeMessage })
    } catch (err) {
        console.error('Error creating welcome message', err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const updateWelcomeMessage = async (req, res) => {
    try {
        const { serverGuildId, messageUpdates } = req.body

        if (!serverGuildId) return res.status(400).json({ message: 'Server ID is required' })

        // Convertir actualizaciones a dot notation
        const flattenedUpdates = flattenObject(messageUpdates)

        const welcomeMessage = await Welcome.findOneAndUpdate(
            { serverGuildId },
            { $set: flattenedUpdates },
            { new: true }
        )

        return res.status(200).json({ message: 'Welcome message content updated', welcomeMessage })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    getWelcomeMessage,
    addWelcomeMessage,
    updateWelcomeMessage,
}