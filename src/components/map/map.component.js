import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import MapMarker from "./marker.component";
import markerPNG from "../../assets/images/marker.png";
import markerHoverPNG from "../../assets/images/marker-hover.png";
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

  renderMarkers(map, maps) {
    let infowindow = new maps.InfoWindow({
      content: "lorem ipsum akdakdn adj ladjl ja kjl jasl"
    });

    let marker = new maps.Marker({
      position: { lat: 59.325, lng: 18.07 },
      map,
      title: "Hello World!"
      // icon: { markerPNG }
      // animation: maps.Animation.DROP
    });

    marker.addListener("click", function() {
      infowindow.open(map, marker);
    });
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
          defaultCenter={[50, 50]}
          defaultZoom={1}
          hoverDistance={40}
          options={getMapOptions}
          onChildMouseEnter={this._onChildMouseEnter}
          onChildMouseLeave={this._onChildMouseLeave}
          onChildClick={this._onChildClick}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
        >
          {MarkerList}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
