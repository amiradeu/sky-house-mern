import React, { Component } from "react";
import axios from "axios";
import { Popover, Col, Image } from "react-bootstrap";
import "../models.css";
import { getPeopleUnsplash } from "../../api/unsplash.api";
import FormOwner from "./form-owner.component";

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
        <h1>Edit Owner</h1>
        <FormOwner
          state={this.state}
          popover={popover}
          handleChangeOwnername={this.handleChangeOwnername}
          handleChangeImage={this.handleChangeImage}
          handleSubmit={this.handleSubmit}
          buttonText={buttonText}
        ></FormOwner>
      </React.Fragment>
    );
  }
}

export default EditOwner;
