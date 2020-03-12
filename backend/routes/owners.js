const router = require("express").Router();
let Owner = require("../models/owner.model");

//1st HTTP GET req endpoint - /owners/
router.route("/").get((req, res) => {
  Owner.find()
    .then(owners => res.json(owners))
    .catch(err => res.status(400).json("Error: " + err));
});

//2nd HTTP POST req endpoint - /owners/register
router.route("/register").post((req, res) => {
  const {
    ownername,
    password,
    ownerImg,
    country,
    state,
    coordinateX,
    coordinateY
  } = req.body;

  if (!ownername) {
    res.status(500).json("Cannot leave ownername blank!");
  }
  if (!password) {
    res.status(500).json("Cannot leave password blank!");
  }
  if (password.length < 8) {
    res.status(500).json("Password must be more than 8 characters!");
  }

  const newOwner = new Owner({
    ownername,
    password,
    ownerImg,
    country,
    state,
    coordinateX,
    coordinateY
  });

  // TODO: add password length validation on frontend
  newOwner.password = newOwner.generateHash(password);

  Owner.findOne({
    ownername: newOwner.ownername
  }).then(owner => {
    if (!owner) {
      //not existing yet
      newOwner
        .save()
        .then(() => res.json("Owner added!"))
        .catch(err => res.status(400).json("Error: " + err));
    } else {
      //already exist
      res.status(403).json("Error: Username already exist!");
    }
  });
});

//3rd HTTP POST req endpoint - /owners/login
router.route("/login").post((req, res) => {
  const { ownername, password } = req.body;

  // Owner.findOne({
  //   ownername: ownername
  // })
  //   .then(owner => {
  //     if (!owner) {
  //       res.status(400).json("Error: " + err);
  //     } else {
  //       if (owner.validPassword(password)) {
  //         res.json("User found!");
  //         // TODO: create jwt token
  //       } else {
  //         res.status(500).json("Incorrect password!");
  //       }
  //     }
  //   })
  //   .catch(res.status(400).json("User not found"));

  Owner.find({ ownername: ownername }, (err, owners) => {
    if (err) {
      res.status(404).json("Error: User does not exist! " + err);
    }

    const owner = owners[0];
    if (owner.validPassword(password)) {
      res.json("User found!");
      // TODO: create jwt token
    } else {
      res.status(500).json("Incorrect password!");
    }
  });
});

//2nd HTTP POST req endpoint - /owners/add
router.route("/add").post((req, res) => {
  const {
    ownername,
    password,
    ownerImg,
    country,
    state,
    coordinateX,
    coordinateY
  } = req.body;

  const newOwner = new Owner({
    ownername,
    password,
    ownerImg,
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
