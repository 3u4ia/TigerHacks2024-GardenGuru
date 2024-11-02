const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const customerPost = require("../models/customerPost");
const checkAuth = require("../middleware/check-auth");

const User = require("../models/user");


router.get("/", (req, res, next) => {
  User.find()
  .select("email rating businessType username userType _id state city")
  .exec()
  .then(docs => {
    res.status(200).json({
      count: docs.length,
      users: docs.map(doc => {
        return{
          username: doc.username,
          businessType: doc.businessType,
          email: doc.email,
          state: doc.state,
          city: doc.city,
          rating: doc.rating,
          userType: doc.userType,
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

router.get("/locationSearch", (req, res, next) => {
  User.find({city: req.body.city, state: req.body.state, userType: "business"})
  .select("username rating businessType state city")
  .exec()
  .then(docs => {
    res.status(200).json({
      businesses: docs.map(doc => {
        return{
          username: doc.username,
          email: doc.email,
          businessType: doc.businessType,
          state: doc.state,
          city: doc.city,
          rating: doc.rating,
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
  .select("email rating username businessType userType _id state city")
  .exec()
  .then(docs => {
    res.status(200).json({
      count: docs.length,
      users: docs.map(doc => {
        return{
          username: doc.username,
          businessType: doc.businessType,
          email: doc.email,
          state: doc.state,
          rating: doc.rating,
          city: doc.city,
          userType: doc.userType,
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
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } }, User.find({ username: req.body.username})
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
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
              city: req.body.city,
              state: req.body.state,
              userType: req.body.userType,
              businessType: req.body.businessType,
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
  User.find({email: req.body.email})
  .then(user=> {
    if(user.length < 1) {
      return res.status(401).json({
        message: "Auth failed"
      })
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if(err) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      if (result) {
        const token = jwt.sign({
          email: user[0].email,
          userId: user[0]._id
        }, process.env.JWT_KEY, 
        {
          expiresIn:"1h"
        });
        return res.status(200).json({
          message: "Auth successful",
          token: token,
          userType: user[0].userType,
          _id: user[0]._id
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

router.patch("/rating/:businessId", checkAuth, (req, res, next) => {
  const id = req.params.businessId;
  var total = 0;
  var numberCount = 0;
  var average = 0;
  customerPost.find({businessId: id})
  .select("rating")
  .then(docs => {
      numberCount = docs.length;
      docs.map(doc => {
          total += doc.rating
      });
      average = Math.floor(total/numberCount);
      User.updateOne({ _id: id }, { $set: {rating: average} })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Rating updated',
            number_count: numberCount,
            total: total,
            new_average: average
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
});

module.exports = router;