import React from "react";
import { Form, Button, OverlayTrigger, Col, Image } from "react-bootstrap";
// import DatePicker from "react-datepicker";

const FormOwner = props => {
  return (
    <React.Fragment>
      <Form onSubmit={props.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="8">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="ownername"
              value={props.state.ownername}
              onChange={props.handleChangeOwnername}
              placeholder="Enter first name"
            />
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" disabled placeholder="Enter last name" />
          </Form.Group>
          <Form.Group as={Col} md="4">
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
        {/* <Form.Group>
          <Form.Label>Owner name</Form.Label>
          <Form.Control
            as="select"
            name="ownername"
            value={props.state.ownername}
            onChange={props.handleChangeOwnername}
          >
            <option hidden>Choose User</option>
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
              dateFormat="dd/MM/yyyy"
              selected={props.state.datePurchased}
              onChange={props.handleChangeDatePurchased}
              className="inputDate"
            />
          </div>
        </Form.Group> */}
        <Button variant="dark" type="submit">
          Save Changes
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default FormOwner;
