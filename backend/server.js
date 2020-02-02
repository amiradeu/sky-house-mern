const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); //help connect to mongoDB database

//store environment variable in .env file
require("dotenv").config();

//create express server
const app = express();
const port = process.env.PORT || 5000;

//connect to mongoDB Atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection has been established succesfully");
});

//middleware
app.use(cors());
app.use(express.json());

//import routers
const housesRouter = require("./routes/houses");
const ownersRouter = require("./routes/owners");

//implement on app
app.use("/houses", housesRouter);
app.use("/owners", ownersRouter);

//start listening
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
