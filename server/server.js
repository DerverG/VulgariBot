const databaseConfig = require('./config/database')
const client = require('./config/botconfig')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors(
    {
        origin: [`http://localhost:${process.env.CLIENT_PORT}`],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }
))


app.use(express.json())

// Discord Bot Connection
client.login(process.env.DISCORD_TOKEN)
    .then(() => {
        console.log('Bot successfully connected.')
    })
    .catch(err => {
        console.error('Error logging in:', err)
    })

// MongoDB Connection
databaseConfig()

// Import Routes
const wordRoutes = require('./routes/wordRoutes')
const serverRoutes = require('./routes/serverRoutes')

// Routes
app.use('/api/word', wordRoutes)
app.use('/api/server', serverRoutes)


const SERVER_PORT = process.env.SERVER_PORT

app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`)
})