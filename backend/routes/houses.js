const router = require("express").Router();
let House = require("../models/house.model");

//1st HTTP GET req endpoint - /houses/
router.route("/").get((req, res) => {
  House.find()
    .then(houses => res.json(houses))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

//2nd HTTP POST req endpoint - /houses/add
router.route("/add").post((req, res) => {
  const housename = req.body.housename;
  const ownername = req.body.ownername;
  const description = req.body.description;
  const location = Number(req.body.location);
  const datePurchased = Date.parse(req.body.datePurchased);

  const newHouse = new House({
    housename,
    ownername,
    description,
    location,
    datePurchased
  });

  newHouse
    .save()
    .then(() => res.json("House added!"))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

//3rd endpoint GET - /houses/:id
router.route("/:id").get((req, res) => {
  House.findById(req.params.id)
    .then(house => res.json(house))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

//4th endpoint DELETE - /houses/:id
router.route("/:id").delete((req, res) => {
  House.findByIdAndDelete(req.params.id)
    .then(house => res.json("House deleted."))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

//4th endpoint POST - /houses/update/:id
router.route("/update/:id").post((req, res) => {
  House.findById(req.params.id)
    .then(house => {
      house.housename = req.body.housename;
      house.ownername = req.body.ownername;
      house.description = req.body.description;
      house.location = Number(req.body.location);
      house.datePurchased = Date.parse(req.body.datePurchased);

      house
        .save()
        .then(() => res.json("House updated!"))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
