const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Plant = require("../models/plant");
const checkAuth = require("../middleware/check-auth");

router.get("/", (req, res, next) => {
    Plant.find()
    .select("_id label inlineDistance rowDistance timeToPlant depth harvestTime wateringInfo")
    .then(docs => {
        res.status(200).json({
            plants: docs.map(doc => {
                return{
                    _id: doc._id,
                    label: doc.label,
                    inlineDistance: doc.inlineDistance,
                    rowDistance: doc.rowDistance,
                    timeToPlant: doc.timeToPlant,
                    depth: doc.depth,
                    harvestTime: doc.harvestTime,
                    wateringInfo: doc.wateringInfo

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


router.get("/:label", (req, res, next) => {
  Plant.find({label:req.params.label})
  .select("_id rowDistance timeToPlant depth harvestTime wateringInfo")
  .exec()
  .then(docs => {
    res.status(200).json({
      count: docs.length,
      plants: docs.map(doc => {
        return{
            label: doc.label,
            rowDistance: doc.rowDistance,
            timeToPlant: doc.timeToPlant,
            depth: doc.depth,
            harvestTime: doc.harvestTime,
            wateringInfo: doc.wateringInfo
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


router.get("/:plantId", (req, res, next) => {
  Plant.find({_id:req.params.plantId})
  .select("label rowDistance timeToPlant depth harvestTime wateringInfo")
  .exec()
  .then(docs => {
    res.status(200).json({
      count: docs.length,
      plants: docs.map(doc => {
        return{
            label: doc.label,
            rowDistance: doc.rowDistance,
            timeToPlant: doc.timeToPlant,
            depth: doc.depth,
            harvestTime: doc.harvestTime,
            wateringInfo: doc.wateringInfo
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



router.post("/addPlant", (req, res, next) => {
    const plant = new Plant({
       _id: new mongoose.Types.ObjectId(),
       label: req.body.label,
       inlineDistance: req.body.inlineDistance,
        rowDistance: req.body.rowDistance,
        timeToPlant: req.body.timeToPlant,
        depth: req.body.depth, 
        harvestTime: req.body.harvestTime,
        wateringInfo: req.body.wateringInfo
    });
            plant
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "Plant created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          });


router.delete("/:_id", (req, res, next) => {
    customerPost.deleteOne({ _id: req.params._id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Plant deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/purge", (req, res, next) => {
    customerPost.deleteMany()
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Plants purged"
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

