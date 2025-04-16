const axiosClient = require('./axiosClient')

const fetchWelcomeMessage = async (serverGuildId) => {
    try {
        const response = await axiosClient.get(`/welcome/getWelcomeMessage`, {
            params: { serverGuildId }
        })
        return response.data.welcomeMessage
    } catch (err) {
        console.error('Error fetchin welcome message:', err)
    }
}

module.exports = fetchWelcomeMessage