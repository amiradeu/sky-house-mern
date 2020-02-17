import React, { Component } from "react";
import { getHouseUnsplash } from "../../api/unsplash.api";
import { getStatelist, getCoordinate } from "../../data/location";
import axios from "axios";
import FormHouse from "./form-house/form-house.component";
import addOwnerLogo from "../../assets/images/add.png";
import "./form-house/form.css";
let stateOptions = [];
let coordinate = [];

class AddHouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houseName: "",
      houseImg: addOwnerLogo,
      price: 0,
      bedroom: 0,
      bathroom: 0,
      country: "",
      city: "",
      coordinateX: 0,
      coordinateY: 0,
      description: "",
      ownerId: 0,
      showState: "none",
      imgOptions: []
    };

    this.handleChangeHousename = this.handleChangeHousename.bind(this);
    this.handleChangeHouseimg = this.handleChangeHouseimg.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeBedroom = this.handleChangeBedroom.bind(this);
    this.handleChangeBathroom = this.handleChangeBathroom.bind(this);
    this.handleChangeCountry = this.handleChangeCountry.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeCoordinate = this.handleChangeCoordinate.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getHouseUnsplash().then(res => this.setState({ imgOptions: res }));
  }

  handleChangeHousename(e) {
    this.setState({
      houseName: e.target.value
    });
  }

  handleChangeHouseimg(e) {
    this.setState({
      houseImg: e.target.value
    });
  }

  handleChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }

  handleChangeBedroom(e) {
    this.setState({
      bedroom: e.target.value
    });
  }

  handleChangeBathroom(e) {
    this.setState({
      bathroom: e.target.value
    });
  }

  handleChangeCountry(e) {
    if (e !== null) {
      stateOptions = getStatelist(e.value);
      this.setState({
        country: e.value,
        showState: "block"
      });
    } else {
      this.setState({
        country: "",
        showState: "none"
      });
    }
  }

  handleChangeCity(e) {
    if (e !== null) {
      this.setState({
        city: e.value
      });
      this.handleChangeCoordinate(e.value);
    } else {
      this.setState({
        city: "",
        coordinateX: 0,
        coordinateY: 0
      });
    }
  }

  handleChangeCoordinate(stateValue) {
    coordinate = getCoordinate(stateValue);
    this.setState({
      coordinateX: coordinate[0],
      coordinateY: coordinate[1]
    });
  }

  handleChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const house = {
      houseName: this.state.houseName,
      houseImg: this.state.houseImg,
      price: this.state.price,
      numOfBedroom: this.state.bedroom,
      numofBathroom: this.state.bathroom,
      country: this.state.country,
      city: this.state.city,
      coordinateX: this.state.coordinateX,
      coordinateY: this.state.coordinateY,
      description: this.state.description,
      ownerId: this.state.ownerId
    };

    axios
      .post("http://localhost:5000/houses/add", house)
      .then(res => console.log(res.data));

    window.location = "/houses/"; //return to home page
  }

  render() {
    const buttonText = "Add House";

    return (
      <React.Fragment>
        <FormHouse
          state={this.state}
          stateOptions={stateOptions}
          buttonText={buttonText}
          handleChangeHousename={this.handleChangeHousename}
          handleChangeHouseimg={this.handleChangeHouseimg}
          handleChangePrice={this.handleChangePrice}
          handleChangeBedroom={this.handleChangeBedroom}
          handleChangeBathroom={this.handleChangeBathroom}
          handleChangeCountry={this.handleChangeCountry}
          handleChangeCity={this.handleChangeCity}
          handleChangeDescription={this.handleChangeDescription}
          handleSubmit={this.handleSubmit}
        ></FormHouse>
      </React.Fragment>
    );
  }
}

export default AddHouse;
