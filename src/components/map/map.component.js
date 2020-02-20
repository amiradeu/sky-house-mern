import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";

import MapMarker from "./marker.component";

const M_SIZE = 40;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: []
      // styling: markerStyle
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/houses")
      .then(res => {
        this.setState({
          houses: res.data
        });
        console.log(this.state.houses);
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  _onChildMouseEnter = (key, childProps) => {
    console.log("mouse enter");
    // const markerId = childProps.house._id;
    // const index = this.state.houses.findIndex(h => h._id === markerId);
    // if (childProps.house.onMarkerHover) {
    //   this.childProps.house(index);
    // }
  };

  _onChildMouseLeave = (key, childProps) => {
    console.log("mouse leave");
    // this.setState({ styling: markerStyle });
    // if (childProps.house.onMarkerHover) {
    //   this.childProps.house(-1);
    // }
  };

  _onChildClick = () => {
    console.log("mouse click");
  };

  render() {
    let MarkerList = this.state.houses.map(house => {
      return (
        <MapMarker
          key={house._id}
          lat={house.coordinateX}
          lng={house.coordinateY}
          house={house}
        />
      );
    });

    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API }}
          defaultCenter={[50, 50]}
          defaultZoom={1}
          hoverDistance={M_SIZE / 2}
          // onChildMouseEnter={this._onChildMouseEnter}
          // onChildMouseLeave={this._onChildMouseLeave}
          // onChildClick={this._onChildClick}
        >
          {MarkerList}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
