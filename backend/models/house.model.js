const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create the house schema
const houseSchema = new Schema(
  {
    houseName: { type: String, required: true },
    houseImg: { type: String, required: true },
    price: { type: Number, required: true },
    numOfBedroom: { type: Number, required: true },
    numofBathroom: { type: Number, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    coordinateX: { type: Number, required: true },
    coordinateY: { type: Number, required: true },
    description: { type: String, required: true },
    ownerId: { type: Number, required: false }
  },
  {
    timestamps: true
  }
);

//create model for it
const House = mongoose.model("House", houseSchema);
module.exports = House;
