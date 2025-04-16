const Server = require('../schemas/serverSchema');

const setup = async (req, res) => {
    try {
        const { serverGuildId, serverName, serverPrefix } = req.body

        // Verificar si hay un ID de servidor
        if (!serverGuildId) return res.status(400).json({ message: 'Server ID is required' })

        // Si ya existe un documento, borrar y crear uno nuevo
        const serverExists = await Server.findOne({ serverGuildId })
        if (serverExists) {
            await Server.deleteOne({ serverGuildId })
        }

        // Crear configuracion del servidor
        const config = new Server({ serverGuildId, serverName, serverPrefix })
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

        // Función para convertir objetos en dot notation
        const flattenObject = (obj, prefix = '', res = {}) => {
            for (const key of Object.keys(obj)) {
                const value = obj[key]
                const newKey = prefix ? `${prefix}.${key}` : key

                if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
                    flattenObject(value, newKey, res)
                } else {
                    res[newKey] = value
                }
            }
            return res
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