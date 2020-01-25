const router = require("express").Router();
let Owner = require("../models/owner.model");

//1st HTTP GET req endpoint - /owners/
router.route("/").get((req, res) => {
  Owner.find()
    .then(owners => res.json(owners))
    .catch(err => res.status(400).json("Error: " + err));
});

//2nd HTTP POST req endpoint - /owners/add
router.route("/add").post((req, res) => {
  const ownername = req.body.ownername;

  const newOwner = new Owner({ ownername });

  newOwner
    .save()
    .then(() => res.json("Owner added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
