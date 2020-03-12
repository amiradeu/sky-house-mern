const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

//create the owner schema
const ownerSchema = new Schema(
  {
    ownername: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8
    },
    ownerImg: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    coordinateX: { type: Number, required: true },
    coordinateY: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

ownerSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

ownerSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

//create model for it
const Owner = mongoose.model("Owner", ownerSchema);
module.exports = Owner;
