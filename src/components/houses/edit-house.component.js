import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "../models.css";
import { getHouseUnsplash } from "../../api/unsplash.api";
import FormHouse from "./form-house/form-house.component";
import { getStatelist, getCoordinate } from "../../data/location";

let stateOptions = [];
let coordinate = [];

class EditHouse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      houseName: "",
      houseImg: "",
      price: 0,
      bedroom: 0,
      bathroom: 0,
      country: "",
      city: "",
      coordinateX: 0,
      coordinateY: 0,
      description: "",
      ownerId: 0,
      showState: "block",
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
    axios
      .get("http://localhost:5000/houses/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          houseName: res.data.houseName,
          houseImg: res.data.houseImg,
          price: res.data.price,
          bedroom: res.data.numOfBedroom,
          bathroom: res.data.numofBathroom,
          country: res.data.country,
          city: res.data.city,
          coordinateX: res.data.coordinateX,
          coordinateY: res.data.coordinateY,
          description: res.data.description,
          ownerId: res.data.ownerId
        });
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });
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
    console.log(house);
    axios
      .post(
        "http://localhost:5000/houses/edit/" + this.props.match.params.id,
        house
      )
      .then(res => console.log(res.data));

    window.location = "/houses/"; //return to home page
  }

  render() {
    const buttonText = "Save Changes";
    return (
      <React.Fragment>
        <FormHouse
          state={this.state}
          stateOptions={stateOptions}
          handleChangeHousename={this.handleChangeHousename}
          handleChangePrice={this.handleChangePrice}
          handleChangeBedroom={this.handleChangeBedroom}
          handleChangeBathroom={this.handleChangeBathroom}
          handleChangeDescription={this.handleChangeDescription}
          handleChangeOwnername={this.handleChangeOwnername}
          handleChangeLocation={this.handleChangeLocation}
          handleChangeDatePurchased={this.handleChangeDatePurchased}
          handleChangeImage={this.handleChangeImage}
          handleSubmit={this.handleSubmit}
          buttonText={buttonText}
        ></FormHouse>
      </React.Fragment>
    );
  }
}

export default EditHouse;
