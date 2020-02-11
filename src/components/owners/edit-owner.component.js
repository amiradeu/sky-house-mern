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
import "../models.css";
import { getPeopleUnsplash } from "../../api/unsplash.api";

class EditOwner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ownername: "",
      imgsrc: "",
      imglist: []
    };

    this.handleChangeOwnername = this.handleChangeOwnername.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeOwnername(e) {
    this.setState({
      ownername: e.target.value
    });
  }

  handleChangeImage(e) {
    this.setState({ imgsrc: e.target.value });
  }

  componentDidMount() {
    getPeopleUnsplash().then(res => this.setState({ imglist: res }));
    axios
      .get("http://localhost:5000/owners/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          ownername: res.data.ownername,
          imgsrc: res.data.imgsrc
        });
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });
  }

  handleSubmit(e) {
    e.preventDefault();

    const owner = {
      ownername: this.state.ownername,
      imgsrc: this.state.imgsrc
    };

    axios
      .post(
        "http://localhost:5000/owners/edit/" + this.props.match.params.id,
        owner
      )
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
        <h1>Edit Owner</h1>
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
                type="text"
                disabled
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
            Save Changes
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default EditOwner;
