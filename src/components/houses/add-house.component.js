import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { toJson } from "unsplash-js";

class AddHouse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      housename: "",
      description: "",
      ownername: "",
      location: 0,
      datePurchased: new Date(),
      imgsrc: "",
      owners: [] //list of owners to choose to associate to a house
    };

    this.handleChangeHousename = this.handleChangeHousename.bind(this);
    this.handleChangeOwnername = this.handleChangeOwnername.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeDatePurchased = this.handleChangeDatePurchased.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCreateHouse = this.onCreateHouse.bind(this);
  }

  componentDidMount() {
    this.onCreateHouse();

    axios.get("http://localhost:5000/owners/").then(res => {
      if (res.data.length > 0) {
        this.setState({
          owners: res.data.map(owner => owner.ownername),
          ownername: res.data[0].ownername
        });
      }
    });
  }

  onCreateHouse = async () => {
    const Unsplash = require("unsplash-js").default;
    const unsplash = new Unsplash({
      accessKey:
        "deae7f34b9ec4523e01028165bb668fc1ce16f8878ef5e36d21ff6654b75ac10"
    });

    await unsplash.photos
      .getRandomPhoto({ query: "house" })
      .then(toJson)
      .then(json => {
        console.log(json);
        this.setState({ imgsrc: json.urls.regular });
      });
  };

  handleChangeHousename(e) {
    this.setState({
      housename: e.target.value
    });
  }

  handleChangeOwnername(e) {
    this.setState({
      ownername: e.target.value
    });
  }

  handleChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  handleChangeLocation(e) {
    this.setState({
      location: e.target.value
    });
  }

  handleChangeDatePurchased(date) {
    this.setState({
      datePurchased: date
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const house = {
      housename: this.state.housename,
      description: this.state.description,
      ownername: this.state.ownername,
      location: this.state.location,
      datePurchased: this.state.datePurchased,
      imgsrc: this.state.imgsrc
    };

    console.log(house);

    axios
      .post("http://localhost:5000/houses/add", house)
      .then(res => console.log(res.data));

    window.location = "/houses/"; //return to home page
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Add New House</h1>
        <Form.Group>
          <Form.Label>House</Form.Label>
          <Form.Control
            required
            type="text"
            name="housename"
            value={this.state.housename}
            onChange={this.handleChangeHousename}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            as="textarea"
            name="description"
            value={this.state.description}
            onChange={this.handleChangeDescription}
            rows="3"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Owner name</Form.Label>
          <Form.Control
            as="select"
            name="ownername"
            value={this.state.ownername}
            onChange={this.handleChangeOwnername}
          >
            {this.state.owners.map(owner => {
              return (
                <option key={owner} value={owner}>
                  {owner}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control
            required
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.handleChangeLocation}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date Purchased</Form.Label>
          <div>
            <DatePicker
              required
              selected={this.state.datePurchased}
              onChange={this.handleChangeDatePurchased}
            />
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Image Source</Form.Label>
          <Form.Control required readOnly value={this.state.imgsrc} />
        </Form.Group>
        <Button variant="dark" type="submit">
          Add House
        </Button>
      </Form>
    );
  }
}

export default AddHouse;
