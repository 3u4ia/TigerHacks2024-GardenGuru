const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const customerPost = require("../models/customerPost");
const checkAuth = require("../middleware/check-auth");

router.get("/", (req, res, next) => {
    customerPost.find()
    .select("_id author business authorId businessId rating comment")
    .then(docs => {
        res.status(200).json({
            posts: docs.map(doc => {
                return{
                    _id: doc._id,
                    authorId: doc.authorId,
                    author: doc.author,
                    businessId: doc.businessId,
                    business: doc.business,
                    rating: doc.rating,
                    comment: doc.comment
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

router.get("/findByCustomer/:userId", (req, res, next) => {
    customerPost.find({authorId: req.params.userId})
    .select("_id business businessId rating comment")
    .then(docs => {
        res.status(200).json({
            ratings: docs.map(doc => {
                return {
                    _id: doc._id,
                    businessId: doc.businessId,
                    business: doc.business,
                    rating: doc.rating,
                    comment: doc.comment
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

router.get("/findByBusiness/:businessId", (req, res, next) => {
    customerPost.find({businessId: req.params.businessId})
    .select("_id author authorId rating comment")
    .then(docs => {
        res.status(200).json({
            posts: docs.map(doc => {
                return {
                    _id: doc._id,
                    authorId: doc.authorId,
                    author: doc.author,
                    rating: doc.rating,
                    comment: doc.comment
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


router.post("/:businessId", checkAuth, (req, res, next) => {
    var authorString = "";
    var businessString = "";

    User.findById(req.params.businessId)
    .select("email")
    .then(bus => {
        if(!bus) {
            return res.status(404).json({
                message: "Business not found"
            });
        }
        businessString = bus.email;

        User.findById(req.body.authorId)
        .select("email")
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            authorString = user.email;
            const newPost = new customerPost({
                _id: new mongoose.Types.ObjectId(),
                authorId: req.body.authorId,
                author: authorString,
                businessId: req.params.businessId,
                business: businessString,
                rating: req.body.rating
            });
            return newPost.save()
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Customer post created successfully!",
                createdPost: {
                    _id: result._id,
                    authorId: result.authorId,
                    author: result.author,
                    businessId: result.businessId,
                    business: result.business,
                    rating: result.rating
                }
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

router.delete("/:postId", checkAuth, (req, res, next) => {
    customerPost.deleteOne({ _id: req.params.postId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Post deleted"
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
    customerPost.deleteMany()
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Customer posts purged"
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