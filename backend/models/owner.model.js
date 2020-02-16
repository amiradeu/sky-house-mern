const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create the owner schema
const ownerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    ownerImg: { type: String, required: true },
    birthDate: { type: Date, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    coordinateX: { type: Number, required: true },
    coordinateY: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

//create model for it
const Owner = mongoose.model("Owner", ownerSchema);
module.exports = Owner;
