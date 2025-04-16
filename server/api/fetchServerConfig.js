const axiosClient = require('./axiosClient')

const fetchServerConfig = async (serverGuildId) => {
    try {
        const response = await axiosClient.get(`/server/getServerConfig`, {
            params: { serverGuildId }
        })
        return response.data.config
    } catch (err) {
        if (err.response && err.response.status === 404) {
            console.log(`Configuration not found for Guild ID: ${serverGuildId}. Creating a new one.`)
            try {
                const setupResponse = await axiosClient.post('/server/setup', {
                    serverGuildId,
                    serverPrefix: '!' // Default prefix
                })
                return setupResponse.data.config
            } catch (setupErr) {
                console.error('Error creating server configuration:', setupErr)
            }
            return null
        }
        console.error('Error fetching server config:', err)
        return null
    }
}

module.exports = fetchServerConfig