import React from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline
} from "react-leaflet";


function RouteMap({ userLocation, hospital }) {


  if (!userLocation || !hospital) {

    return (
      <p>
        Waiting for GPS and hospital selection...
      </p>
    );

  }



  const userPosition = [
    userLocation.latitude,
    userLocation.longitude
  ];


  const hospitalPosition = [
    hospital.lat,
    hospital.lng
  ];



  return (

    <MapContainer

      center={userPosition}

      zoom={13}

      style={{
        height: "400px",
        width: "100%"
      }}

    >


      <TileLayer

        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"

      />



      <Marker position={userPosition}>

        <Popup>
          📍 Your Current Location
        </Popup>

      </Marker>




      <Marker position={hospitalPosition}>

        <Popup>
          🏥 {hospital.name}
        </Popup>

      </Marker>




      <Polyline

        positions={[
          userPosition,
          hospitalPosition
        ]}

      />


    </MapContainer>

  );

}


export default RouteMap;