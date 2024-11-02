const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userType: {
        type: String,
        required: true
    },
    businessType: {type: String},
    username: {type:String, required: true},
    rating: {type: Number, default: 5},
    city: {type: String, required: true},
    state: {type: String, required: true},
    userImage: {type: String},
    email: {type: String,
        required: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);