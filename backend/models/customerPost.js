const mongoose = require('mongoose');

const customerPostSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    author: {type: String, required: true},
    comment: {type: String, maxLength: 1500}
});

module.exports = mongoose.model('customerPost', customerPostSchema);
