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
  const houseName = req.body.houseName;
  const houseImg = req.body.houseImg;
  const price = req.body.price;
  const numOfBedroom = req.body.numOfBedroom;
  const numofBathroom = req.body.numofBathroom;
  const country = req.body.country;
  const city = req.body.city;
  const coordinateX = req.body.coordinateX;
  const coordinateY = req.body.coordinateY;
  const description = req.body.description;
  const ownerId = req.body.ownerId;

  const newHouse = new House({
    houseName,
    houseImg,
    price,
    country,
    city,
    coordinateX,
    coordinateY,
    description,
    ownerId,
    numOfBedroom,
    numofBathroom
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
    .then(() => res.json("House deleted."))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

//5th endpoint POST - /houses/edit/:id
router.route("/edit/:id").post((req, res) => {
  House.findById(req.params.id)
    .then(house => {
      house.houseName = req.body.houseName;
      house.houseImg = req.body.houseImg;
      house.price = req.body.price;
      house.numOfBedroom = req.body.numOfBedroom;
      house.numofBathroom = req.body.numofBathroom;
      house.country = req.body.country;
      house.city = req.body.city;
      house.coordinateX = req.body.coordinateX;
      house.coordinateY = req.body.coordinateY;
      house.description = req.body.description;
      house.ownerId = req.body.ownerId;

      house
        .save()
        .then(() => res.json("House updated!"))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
