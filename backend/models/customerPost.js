const mongoose = require('mongoose');

const customerPostSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    author: {type: String, required: true},
    businessId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    business: {type: String, required: true},
    rating: {
        type: Number,
        max: 5,
        min: 1,
        required: true
    },
    comment: {type: String, maxLength: 1500}
});

module.exports = mongoose.model('customerPost', customerPostSchema);