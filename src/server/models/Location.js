const mongoose = require('mongoose');

//defines schema
const LocationSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    continent: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Locations', LocationSchema);