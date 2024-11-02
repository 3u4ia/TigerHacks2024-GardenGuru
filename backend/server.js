const express = require('express');
const http = require('http');
const app = require('./app');
const functions = require("firebase-functions");

const port = 5000;


const server = http.createServer(app);

server.listen(port);
console.log(`App listening on port ${port}...`);



exports.api = functions.https.onRequest(app);



/*
const mongoClient = require('mongodb').MongoClient

const app = express();
const port = 5000;
app.use(express.json());

var status;

function checkUserExists(username){
  var exists = false;

  return(exists);
}

function verifyPassword(username, password){
  
}

app.get('/', function(req, res) {
  res.json("GET resonse here")
})

app.post('/login', function(req, res) {
  const cred = JSON.parse(JSON.stringify(req.body));
  const username = cred.user;
  const password = cred.pw;

  if(checkUserExists(username)){
    if(verifyPassword(username, password)){
      status = "Valid User";
    }
    else{
      status = "Invalid Password"
    }
  }
  else{
    status = "User Does Not Exist"
  }

  res.json({message: 'Received POST request', data: status});
});

app.listen(port, () => {
console.log(`App listening on port ${port}...`)
})
*/