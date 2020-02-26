import React, { Component } from "react";
import "./about.css";
import { Container } from "react-bootstrap";

class About extends Component {
  render() {
    return (
      <Container fluid>
        <br />
        <h1>Sky House</h1>
        <blockquote>As the sky reach the ground</blockquote>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam enim
          perferendis reprehenderit debitis cupiditate et culpa unde beatae
          officia, veniam velit quia placeat consequuntur eveniet suscipit saepe
          vel. Blanditiis, non. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Voluptates nesciunt ipsum, illum praesentium, ea
          adipisci suscipit a deserunt eveniet repellendus mollitia commodi
          quidem culpa exercitationem aperiam itaque, amet voluptas sed.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
          perspiciatis fuga vel, quos, atque ipsam distinctio odio mollitia hic
          veritatis aliquid reprehenderit culpa, pariatur ipsum qui architecto
          deserunt! Sunt, provident.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae
          commodi ullam laudantium ipsa, aliquid expedita aperiam quam
          doloremque dicta impedit obcaecati velit explicabo veniam tempora.
          Quae doloremque qui sit facere!
        </p>
      </Container>
    );
  }
}

export default About;
