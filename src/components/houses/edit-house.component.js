import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

class UpdateHouse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      housename: "",
      description: "",
      ownername: "",
      location: 0,
      datePurchased: new Date(),
      owners: [] //list of owners to choose to associate to a house
    };

    this.handleChangeHousename = this.handleChangeHousename.bind(this);
    this.handleChangeOwnername = this.handleChangeOwnername.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeDatePurchased = this.handleChangeDatePurchased.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/houses/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          housename: res.data.housename,
          description: res.data.description,
          ownername: res.data.ownername,
          location: res.data.location,
          datePurchased: new Date(res.data.datePurchased)
        });
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });

    axios.get("http://localhost:5000/owners/").then(res => {
      if (res.data.length > 0) {
        this.setState({
          owners: res.data.map(owner => owner.ownername),
          ownername: res.data[0].ownername
        });
      }
    });
  }

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
      datePurchased: this.state.datePurchased
    };

    console.log(house);

    axios
      .post(
        "http://localhost:5000/houses/edit/" + this.props.match.params.id,
        house
      )
      .then(res => console.log(res.data));

    window.location = "/"; //return to home page
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Edit {this.state.housename}</h1>
        <div className="form-group">
          <label>House</label>
          <input
            required
            type="text"
            name="housename"
            value={this.state.housename}
            onChange={this.handleChangeHousename}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            required
            name="description"
            value={this.state.description}
            onChange={this.handleChangeDescription}
            className="form-control"
            rows="3"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Owner name</label>
          <select
            name="ownername"
            value={this.state.ownername}
            onChange={this.handleChangeOwnername}
            className="form-control"
          >
            {this.state.owners.map(owner => {
              return (
                <option key={owner} value={owner}>
                  {owner}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            required
            type="number"
            name="location"
            value={this.state.location}
            onChange={this.handleChangeLocation}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <div>
            <DatePicker
              required
              selected={this.state.datePurchased}
              onChange={this.handleChangeDatePurchased}
            />
          </div>
        </div>
        <button className="btn btn-primary">Save Changes</button>
      </form>
    );
  }
}

export default UpdateHouse;
