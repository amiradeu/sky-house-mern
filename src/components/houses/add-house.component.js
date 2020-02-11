import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {
  Form,
  Button,
  Col,
  Image,
  OverlayTrigger,
  Popover
} from "react-bootstrap";
import { toJson } from "unsplash-js";
import addOwnerLogo from "../../assets/images/add.png";
import "./form.css";

const unsplash_api = process.env.REACT_APP_UNSPLASH_API;

class AddHouse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      housename: "",
      description: "",
      ownername: "",
      location: "",
      datePurchased: new Date(),
      imgsrc: addOwnerLogo,
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
      accessKey: unsplash_api
    });

    await unsplash.search
      .photos("house", 3, 100)
      .then(toJson)
      .then(json => {
        this.setState({ imglist: json.results });
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

  handleChangeImage(e) {
    this.setState({ imgsrc: e.target.value });
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
      .post("http://localhost:5000/houses/add", house)
      .then(res => console.log(res.data));

    window.location = "/houses/"; //return to home page
  }

  render() {
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
                    className="rounded-circle p-2 apiImg"
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
        <p>Enter the house detail:</p>
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} xs="8">
              <Form.Label>House Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="housename"
                value={this.state.housename}
                onChange={this.handleChangeHousename}
              />
              <Form.Label>Price / night</Form.Label>
              <Form.Control required type="number" name="price" />
            </Form.Group>
            <Form.Group as={Col} xs="4">
              <Image
                src={this.state.imgsrc}
                className="rounded-circle p-2 apiImg"
              ></Image>
              <br />
              <OverlayTrigger
                trigger="click"
                key="bottom"
                placement="bottom"
                overlay={popover}
              >
                <Button variant="dark" className="">
                  house image
                </Button>
              </OverlayTrigger>
            </Form.Group>
          </Form.Row>
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
            <Form.Label>Date Purchased</Form.Label>
            <div>
              <DatePicker
                required
                selected={this.state.datePurchased}
                onChange={this.handleChangeDatePurchased}
              />
            </div>
          </Form.Group>

          <Button variant="dark" type="submit">
            Add House
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default AddHouse;
