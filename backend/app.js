const express = require('express');
const app = express();
const morgan = require('morgan');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

const customerPostRoutes = require('./routes/customerPost');

const mons = require("./nodemon.json");

var shoop;

if(process.env.MONGO_ATLAS_PW != undefined) {
    shoop = process.env.MONGO_ATLAS_PW;
}
else{
    shoop = mons.env.MONGO_ATLAS_PW; 
}
mongoose.connect('mongodb+srv://frostyData:'+shoop+'@cluster0.nlrrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*', 'null');
    res.header('Acces-Control-Allow-Headers', '*', 'content-type');
    if(req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/customerPost', customerPostRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
    
});


module.exports = app; 
