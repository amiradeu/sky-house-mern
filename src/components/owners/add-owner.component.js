import React, { Component } from "react";
import axios from "axios";
import {
  Form,
  Button,
  OverlayTrigger,
  Popover,
  Col,
  Image
} from "react-bootstrap";
import { toJson } from "unsplash-js";
import "./owner.css";
import addOwnerLogo from "../../imgs/add.png";

const unsplash_api = process.env.REACT_APP_UNSPLASH_API;

class CreateOwner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ownername: "",
      imgsrc: addOwnerLogo,
      imglist: []
    };

    this.handleChangeOwnername = this.handleChangeOwnername.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onCreateOwner = async () => {
    const Unsplash = require("unsplash-js").default;
    const unsplash = new Unsplash({
      accessKey: unsplash_api
    });

    await unsplash.search
      .photos("headshot people", 3, 100)
      .then(toJson)
      .then(json => {
        console.log(json.results);
        this.setState({ imglist: json.results });
      });
  };

  handleChangeOwnername(e) {
    this.setState({
      ownername: e.target.value
    });
  }

  componentDidMount() {
    this.onCreateOwner();
  }

  handleChangeImage(e) {
    this.setState({ imgsrc: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const owner = {
      ownername: this.state.ownername,
      imgsrc: this.state.imgsrc
    };

    console.log(owner);

    axios
      .post("http://localhost:5000/owners/add", owner)
      .then(res => console.log(res.data));

    window.location = "/owners/";
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
        <h1>Create New Owner</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="8">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="ownername"
                value={this.state.ownername}
                onChange={this.handleChangeOwnername}
                placeholder="Enter first name"
              />
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                // required
                type="text"
                disabled
                // name="ownername"
                // value={this.state.ownername}
                // onChange={this.handleChangeOwnername}
                placeholder="Enter last name"
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
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
                <Button variant="dark">Choose avatar</Button>
              </OverlayTrigger>
            </Form.Group>
          </Form.Row>
          <Button variant="dark" type="submit">
            Create Owner
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default CreateOwner;
