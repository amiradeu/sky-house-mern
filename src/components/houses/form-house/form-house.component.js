import React from "react";
import {
  Form,
  Button,
  Col,
  Image,
  OverlayTrigger,
  Popover
} from "react-bootstrap";
import Select from "react-select";
import { getCountrylist } from "../../../data/location";
import HideInput from "./hide-input.component";

const data = getCountrylist();

const FormHouse = props => {
  const popover = (
    <Popover id="popover-positioned-bottom">
      <Popover.Title as="h3">Choose image</Popover.Title>
      <Popover.Content>
        <Col>
          {props.state.imgOptions.map(src => (
            <React.Fragment key={src.id}>
              <label>
                <input
                  type="radio"
                  name="img"
                  value={src.urls.regular}
                  onChange={props.handleChangeHouseimg}
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
      <Form onSubmit={props.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} xs="8">
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder="Enter house name..."
                required
                type="text"
                name="housename"
                value={props.state.houseName}
                onChange={props.handleChangeHousename}
                autoComplete="off"
                className="formInput"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                type="number"
                name="price"
                placeholder="$USD per night"
                className="formInput"
                value={props.state.price}
                onChange={props.handleChangePrice}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group as={Col} xs="4">
            <OverlayTrigger
              trigger="click"
              key="bottom"
              placement="bottom"
              overlay={popover}
            >
              <Image
                src={props.state.houseImg}
                className="rounded-circle p-2 apiImg"
              ></Image>
            </OverlayTrigger>
          </Form.Group>
        </Form.Row>
        <Form.Label>Location</Form.Label>
        <Form.Row>
          <Col xs={12} md={6}>
            <Form.Group>
              <Select
                options={data}
                placeholder={
                  props.state.country === ""
                    ? "Select country..."
                    : props.state.country
                }
                isSearchable="true"
                isClearable={true}
                name="country"
                onChange={props.handleChangeCountry}
              />
            </Form.Group>
            <HideInput dataInput={props.state.country}></HideInput>
          </Col>
          <Col xs={12} md={6} style={{ display: props.state.showState }}>
            <Form.Group>
              <Select
                options={props.stateOptions}
                placeholder={
                  props.state.city === "" ? "Select state..." : props.state.city
                }
                isSearchable="true"
                isClearable={true}
                name="state"
                onChange={props.handleChangeCity}
              />
            </Form.Group>
            <HideInput dataInput={props.state.city}></HideInput>
          </Col>
        </Form.Row>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            as="textarea"
            name="description"
            value={props.state.description}
            onChange={props.handleChangeDescription}
            rows="2"
            placeholder="Enter a description of the house..."
          />
        </Form.Group>
        <Button variant="dark" type="submit">
          {props.buttonText}
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default FormHouse;
