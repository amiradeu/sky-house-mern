import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Col, Image, Popover } from "react-bootstrap";
import "../models.css";
import { getHouseUnsplash } from "../../api/unsplash.api";
import FormHouse from "./form-house.component";

class EditHouse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      housename: "",
      description: "",
      ownername: "",
      location: "",
      datePurchased: new Date(),
      imgsrc: "",
      imglist: [],
      owners: [] //list of owners to choose to associate to a house
    };

    this.handleChangeHousename = this.handleChangeHousename.bind(this);
    this.handleChangeOwnername = this.handleChangeOwnername.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeDatePurchased = this.handleChangeDatePurchased.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChangeImage(e) {
    this.setState({ imgsrc: e.target.value });
  }

  componentDidMount() {
    getHouseUnsplash().then(res => this.setState({ imglist: res }));
    axios
      .get("http://localhost:5000/houses/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          housename: res.data.housename,
          description: res.data.description,
          ownername: res.data.ownername,
          location: res.data.location,
          datePurchased: new Date(res.data.datePurchased),
          imgsrc: res.data.imgsrc
        });
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });

    axios.get("http://localhost:5000/owners/").then(res => {
      if (res.data.length > 0) {
        this.setState({
          owners: res.data.map(owner => owner.ownername)
        });
      }
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
    let imagelist = this.state.imglist.map(src => {
      return src;
    });
    const popover = (
      <Popover id="popover-positioned-bottom">
        <Popover.Title as="h3">Choose image</Popover.Title>
        <Popover.Content>
          <Col>
            {imagelist.map(src => (
              <React.Fragment key={src.id}>
                <label>
                  <input
                    type="radio"
                    name="img"
                    value={src.urls.regular}
                    onChange={this.handleChangeImage}
                  />
                  <Image
                    src={src.urls.regular}
                    className="rounded-circle p-2 popoverImg"
                  ></Image>
                </label>
              </React.Fragment>
            ))}
          </Col>
        </Popover.Content>
      </Popover>
    );
    return (
      <React.Fragment>
        <FormHouse
          state={this.state}
          popover={popover}
          handleChangeHousename={this.handleChangeHousename}
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
