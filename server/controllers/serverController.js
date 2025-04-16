const Server = require('../schemas/serverSchema')
const flattenObject = require('../utils/flattenObject')

const setup = async (req, res) => {
    try {
        const { serverGuildId, serverPrefix } = req.body

        // Verificar si hay un ID de servidor
        if (!serverGuildId) return res.status(400).json({ message: 'Server ID is required' })

        // Si ya existe un documento, borrar y crear uno nuevo
        const serverExists = await Server.findOne({ serverGuildId })
        if (serverExists) {
            await Server.deleteOne({ serverGuildId })
        }

        // Crear configuracion del servidor
        const config = new Server({ serverGuildId, serverPrefix })
        await config.save()

        return res.status(200).json({ message: 'Server configuration created', config })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const getServerConfig = async (req, res) => {
    try {
        const { serverGuildId } = req.query

        // Verificar si hay un ID de servidor
        if (!serverGuildId) return res.status(400).json({ message: 'Server ID is required' })

        // Buscar configuracion del servidor
        const config = await Server.findOne({ serverGuildId })
        if (!config) return res.status(404).json({ message: 'Server configuration not found' })

        // Regresar configuracion del servidor
        return res.status(200).json({ message: 'Server configuration', config })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const updateServerConfig = async (req, res) => {
    try {
        const { serverGuildId, configUpdates } = req.body

        if (!serverGuildId) {
            return res.status(400).json({ message: 'Server ID is required' })
        }

        // Convertir actualizaciones a dot notation para evitar sobreescritura total
        const flattenedUpdates = flattenObject(configUpdates)

        const config = await Server.findOneAndUpdate(
            { serverGuildId },
            { $set: flattenedUpdates },
            { new: true }
        )

        return res.status(200).json({ message: 'Server configuration updated', config })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    setup,
    getServerConfig,
    updateServerConfig,
}