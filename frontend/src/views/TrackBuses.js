import React from 'react'
require('dotenv').config()
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow
} from "@react-google-maps/api";

const containerStyle = {
    height: '80vh'
};

const center = {
    lat: 33.684422,
    lng: 73.047882
};

 const TrackBuses=()=>{
   return(
       <LoadScript googleMapsApiKey= {process.env.REACT_APP_GOOGLE_MAPS_API} >
           <GoogleMap
               mapContainerStyle={containerStyle}
               center={center}
               zoom={14}
           >
               { /* Child components, such as markers, info windows, etc. */ }
               <></>
           </GoogleMap>
       </LoadScript>
   )
}


export default TrackBuses;
