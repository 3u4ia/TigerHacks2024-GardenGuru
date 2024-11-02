const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const customerPost = require("../models/customerPost");
const checkAuth = require("../middleware/check-auth");
const plant = require("../models/plant");

const User = require("../models/user");


router.get("/", (req, res, next) => {
  User.find()
  .select("email username _id")
  .exec()
  .then(docs => {
    res.status(200).json({
      count: docs.length,
      users: docs.map(doc => {
        return{
          username: doc.username,
          email: doc.email,
          _id: doc._id
        }
      })
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});


router.get("/:userId", (req, res, next) => {
  User.find({_id:req.params.userId})
  .select("email username _id")
  .exec()
  .then(docs => {
    res.status(200).json({
      count: docs.length,
      users: docs.map(doc => {
        return{
          username: doc.username,
          email: doc.email,
          _id: doc._id
        }
      })
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

router.post("/signup", (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "User exists"
        });
      } }, User.find({ username: req.body.username})
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "User exists"
          });
        } 
      else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    }))
});

router.post('/login', (req, res, next) => {
  User.findOne({username: req.body.username})
  .then(user=> {
    if(user.length < 1) {
      return res.status(401).json({
        message: "Auth failed"
      })
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if(err || !result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      if (result) {
                return res.status(200).json({
                  message: "Auth successful",
                  user: user,
        });
      }
      return res.status(401).json({
        message: "Auth failed"
      });
    })
  })
  .catch(err => {
    console.log(err),
    res.status(500).json({
      error: err
    })
  })
});

router.delete("/:userId", checkAuth, (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/purge", checkAuth, (req, res, next) => {
  User.deleteMany()
  .exec()
  .then(result => {
    res.status(200).json({
      message: "Users purged"
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

module.exports = router;
