const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create the owner schema
const ownerSchema = new Schema(
  {
    ownername: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    }
  },
  {
    timestamps: true
  }
);

//create model for it
const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;
