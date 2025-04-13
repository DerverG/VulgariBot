const express = require('express')
const mongoose = require('mongoose')
const cors =  require('cors')
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

// MongoDB Connection
try {
    mongoose.connect(process.env.MONGO_URI, {})
    console.log('Conectado a la Base de Datos')
} catch (err) {
    console.error(err, 'Error al conectarse a la Base de Datos')
}

// Import Routes

// Routes

const SERVER_PORT = process.env.SERVER_PORT

app.listen(SERVER_PORT, () => {
    console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`)
})