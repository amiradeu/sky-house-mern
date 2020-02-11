import React from "react";
import { Form, Button, Col, Image, OverlayTrigger } from "react-bootstrap";
import DatePicker from "react-datepicker";

const FormHouse = props => {
  return (
    <React.Fragment>
      <Form onSubmit={props.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} xs="8">
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder="House name"
                required
                type="text"
                name="housename"
                value={props.state.housename}
                onChange={props.handleChangeHousename}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                type="number"
                name="price"
                placeholder="$USD per night"
              />
            </Form.Group>
          </Form.Group>
          <Form.Group as={Col} xs="4">
            <OverlayTrigger
              trigger="click"
              key="bottom"
              placement="bottom"
              overlay={props.popover}
            >
              <Image
                src={props.state.imgsrc}
                className="rounded-circle p-2 apiImg"
              ></Image>
            </OverlayTrigger>
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Row>
            <Col>
              <Form.Control
                required
                type="text"
                name="location"
                value={props.state.location}
                onChange={props.handleChangeLocation}
                placeholder="Country"
              />
            </Col>
            <Col>
              <Form.Control
                disabled
                type="text"
                // name="location"
                // value={props.state.location}
                // onChange={props.handleChangeLocation}
                placeholder="State"
              />
            </Col>
          </Form.Row>
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            as="textarea"
            name="description"
            value={props.state.description}
            onChange={props.handleChangeDescription}
            rows="3"
            placeholder="Enter a description of the house..."
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Owner name</Form.Label>
          <Form.Control
            as="select"
            name="ownername"
            value={props.state.ownername}
            onChange={props.handleChangeOwnername}
          >
            {props.state.owners.map(owner => {
              return (
                <option key={owner} value={owner}>
                  {owner}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Date Purchased</Form.Label>
          <div>
            <DatePicker
              required
              selected={props.state.datePurchased}
              onChange={props.handleChangeDatePurchased}
            />
          </div>
        </Form.Group>

        <Button variant="dark" type="submit">
          {props.buttonText}
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default FormHouse;
