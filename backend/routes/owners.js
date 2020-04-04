const router = require("express").Router();
const jwt = require("jsonwebtoken");
let Owner = require("../models/owner.model");

// const authenticateJWT = require("../auth");
const refreshTokens = [];

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

//1st HTTP GET req endpoint - /owners/
router.route("/").get(authenticateJWT, (req, res) => {
  Owner.find()
    .then((owners) => res.json(owners))
    .catch((err) => res.status(400).json("Error: " + err));
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
    coordinateY,
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
    coordinateY,
  });

  // TODO: add password length validation on frontend
  newOwner.password = newOwner.generateHash(password);

  Owner.findOne({
    ownername: newOwner.ownername,
  }).then((owner) => {
    if (!owner) {
      //not existing yet
      newOwner
        .save()
        .then(() => res.json("Registration succesfull. New user added!"))
        .catch((err) => res.status(400).json("Error: " + err));
    } else {
      //already exist
      res.status(403).json("Error: Username already exist!");
    }
  });
});

//3rd HTTP POST req endpoint - /owners/login
router.route("/login").post((req, res) => {
  const { ownername, password } = req.body;

  Owner.find({ ownername: ownername }, (err, owners) => {
    if (err) {
      res.status(404).json("Error: User does not exist! " + err);
    }
    const owner = owners[0];
    if (owner.validPassword(password)) {
      //create access token
      const accessToken = jwt.sign(owner.toJSON(), process.env.JWT_SECRET, {
        expiresIn: "20m",
      });
      const refreshToken = jwt.sign(
        owner.toJSON(),
        process.env.JWT_SECRET_REFRESH
      );
      refreshTokens.push(refreshToken);
      res.json({
        accessToken,
        refreshToken,
      });
    } else {
      res
        .status(500)
        .json("Authentication failed. Incorrect password/username!");
    }
  });
});

// - /owners/logout
router.route("/logout").post((req, res) => {
  const { token } = req.body;

  // refreshTokens = refreshTokens.filter((t) => t !== token);
  res.json(token);
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
    coordinateY,
  } = req.body;

  const newOwner = new Owner({
    ownername,
    password,
    ownerImg,
    country,
    state,
    coordinateX,
    coordinateY,
  });

  newOwner
    .save()
    .then(() => res.json("Owner added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//3rd endpoint GET - /owners/:id
router.route("/:id").get((req, res) => {
  Owner.findById(req.params.id)
    .then((owner) => res.json(owner))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//4th endpoint DELETE - /owners/:id
router.route("/:id").delete((req, res) => {
  Owner.findByIdAndDelete(req.params.id)
    .then(() => res.json("Owner deleted."))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//5th endpoint POST - /owners/edit/:id
router.route("/edit/:id").post((req, res) => {
  Owner.findById(req.params.id)
    .then((owner) => {
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
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
