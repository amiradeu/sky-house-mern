const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create the house schema
const houseSchema = new Schema(
  {
    housename: { type: String, required: true },
    ownername: { type: String, required: false },
    description: { type: String, required: true },
    location: { type: Number, required: true },
    datePurchased: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

//create model for it
const House = mongoose.model("House", houseSchema);

module.exports = House;
