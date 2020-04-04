import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import MapMarker from "./marker.component";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/houses")
      .then(res => {
        this.setState({
          houses: res.data
        });
      })
      .catch(err => console.log(`Error: ${err}`));
  }

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

    const getMapOptions = {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "on" }]
        }
      ]
    };

    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API }}
          options={getMapOptions}
          defaultCenter={[0, 0]}
          defaultZoom={3}
          hoverDistance={40}
        >
          {MarkerList}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
