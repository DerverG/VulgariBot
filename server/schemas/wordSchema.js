const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
    word: { type: String, required: true },
    addedBy: { type: String, required: true },
    guildID: { type: mongoose.Schema.Types.ObjectId, ref: 'Server', required: true },
    uploadAt: { type: Date, default: Date.now },
})

const Word = mongoose.model('Word', wordSchema)

module.exports = Word