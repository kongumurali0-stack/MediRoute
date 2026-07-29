import React from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline
} from "react-leaflet";

import "leaflet/dist/leaflet.css";


function LiveMap({location, hospital}) {


  const defaultPosition = [
    11.0168,
    76.9558
  ];


  const userPosition = location
    ? [
        location.latitude,
        location.longitude
      ]
    : defaultPosition;



  return (

    <div className="card">

      <h3>
        🗺️ Offline Route Map
      </h3>


      <MapContainer

        center={userPosition}

        zoom={13}

        style={{
          height:"400px",
          width:"100%"
        }}

      >


        <TileLayer

          url="/maps/{z}/{x}/{y}.png"

        />



        {
          location &&

          <Marker position={userPosition}>

            <Popup>
              📍 Your Location
            </Popup>

          </Marker>
        }



        {
          hospital &&

          <Marker

          position={[
            hospital.lat,
            hospital.lng
          ]}

          >

            <Popup>

              🏥 {hospital.name}

            </Popup>


          </Marker>
        }



        {
          location && hospital &&

          <Polyline

          positions={[

            userPosition,

            [
              hospital.lat,
              hospital.lng
            ]

          ]}

          />

        }


      </MapContainer>


    </div>

  );

}


export default LiveMap;