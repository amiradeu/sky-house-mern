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
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const ownerImg = req.body.ownerImg;
  const birthDate = Date.parse(req.body.birthDate);
  const country = req.body.country;
  const state = req.body.state;
  const coordinateX = req.body.coordinateX;
  const coordinateY = req.body.coordinateY;

  const newOwner = new Owner({
    firstName,
    lastName,
    ownerImg,
    birthDate,
    country,
    state,
    coordinateX,
    coordinateY
  });

  newOwner
    .save()
    .then(() => res.json("Owner added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

//3rd endpoint GET - /owners/:id
router.route("/:id").get((req, res) => {
  Owner.findById(req.params.id)
    .then(owner => res.json(owner))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

//4th endpoint DELETE - /owners/:id
router.route("/:id").delete((req, res) => {
  Owner.findByIdAndDelete(req.params.id)
    .then(() => res.json("Owner deleted."))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

//5th endpoint POST - /owners/edit/:id
router.route("/edit/:id").post((req, res) => {
  Owner.findById(req.params.id)
    .then(owner => {
      owner.firstName = req.body.firstName;
      owner.lastName = req.body.lastName;
      owner.ownerImg = req.body.ownerImg;
      owner.birthDate = Date.parse(req.body.birthDate);
      owner.country = req.body.country;
      owner.state = req.body.state;
      owner.coordinateX = req.body.coordinateX;
      owner.coordinateY = req.body.coordinateY;

      owner
        .save()
        .then(() => res.json("Owner updated!"))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
