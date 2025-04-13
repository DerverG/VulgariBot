const Word = require('../schemas/wordSchema')

const addWord = async (req, res) => {
    try {
        const { word, addedBy, guildID } = req.body

        // Verificar si la palabra ya existe
        const existingWord = await Word.findOne({ word })
        if (existingWord) {
            return res.status(400).json({ message: 'Word already exists' })
        }

        // Crear una nueva palabra
        const newWord = new Word({
            word,
            addedBy,
            guildID,
        })

        await newWord.save()
        return res.status(201).json({ message: 'Word added successfully', word: newWord })
    } catch ( err ) {
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const getWord = async (req, res) => {
}

const deleteWord = async (req, res) => {
}

module.exports = {
    addWord,
    getWord,
    deleteWord
}