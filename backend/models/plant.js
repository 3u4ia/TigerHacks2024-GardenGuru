const mongoose = require('mongoose');

const plantSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    label: {type: String},
    inlineDistance: {type: Number},
    rowDistance: {type: Number},
    timeToPlant: {type: String},
    depth: {type: Number},
    harvestTime: {type: String},
    wateringInfo: {type: String}
});

module.exports = mongoose.model('Plant', plantSchema);

