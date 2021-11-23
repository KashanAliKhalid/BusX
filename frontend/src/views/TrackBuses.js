import React, {useEffect, useState,useRef} from 'react'
import socketIOClient from "socket.io-client";
require('dotenv').config()
import {socket} from "../socket";
import {useDispatch, useSelector} from "react-redux";

import {
    GoogleMap,
    LoadScript,
    Marker,
    StandaloneSearchBox,
    DirectionsRenderer,
    DirectionsService,
    DistanceMatrixService
} from "@react-google-maps/api";
import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import YellowButton from "../components/Buttons/YellowButton";
import '../assets/css/trackBuses.css'
import * as locations from "react-bootstrap/ElementChildren";

const containerStyle = {
    height: '80vh'
};




const libraries=["places"]


 const TrackBuses=()=>{

     const [center,setCenter]=useState({
         lat: 33.68749873779495,
         lng: 73.05121603557306
     })

     const [buses,setBuses]=useState([])

    const mapStyle= [
         { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
         { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
         { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
         {
             featureType: "administrative.locality",
             elementType: "labels.text.fill",
             stylers: [{ color: "#d59563" }],
         },
         {
             featureType: "poi",
             elementType: "labels.text.fill",
             stylers: [{ color: "#d59563" }],
         },
         {
             featureType: "poi.park",
             elementType: "geometry",
             stylers: [{ color: "#263c3f" }],
         },
         {
             featureType: "poi.park",
             elementType: "labels.text.fill",
             stylers: [{ color: "#6b9a76" }],
         },
         {
             featureType: "road",
             elementType: "geometry",
             stylers: [{ color: "#38414e" }],
         },
         {
             featureType: "road",
             elementType: "geometry.stroke",
             stylers: [{ color: "#212a37" }],
         },
         {
             featureType: "road",
             elementType: "labels.text.fill",
             stylers: [{ color: "#9ca5b3" }],
         },
         {
             featureType: "road.highway",
             elementType: "geometry",
             stylers: [{ color: "#746855" }],
         },
         {
             featureType: "road.highway",
             elementType: "geometry.stroke",
             stylers: [{ color: "#1f2835" }],
         },
         {
             featureType: "road.highway",
             elementType: "labels.text.fill",
             stylers: [{ color: "#f3d19c" }],
         },
         {
             featureType: "transit",
             elementType: "geometry",
             stylers: [{ color: "#2f3948" }],
         },
         {
             featureType: "transit.station",
             elementType: "labels.text.fill",
         },
         {
             featureType: "water",
             elementType: "geometry",
             stylers: [{ color: "#17263c" }],
         },
         {
             featureType: "water",
             elementType: "labels.text.fill",
             stylers: [{ color: "#515c6d" }],
         },
         {
             featureType: "water",
             elementType: "labels.text.stroke",
             stylers: [{ color: "#17263c" }],
         },
     ]


     const changeData=(change)=>{
         console.log(change)
     }

     const initialData=(data)=>{
         let locations=[]
         data.forEach((location)=>{
             let bus={
                 id:location._id,
                 location:location.currentLocation
             }
             locations.push(bus)
         })
         console.log(locations)
         setBuses(locations)
     }

     const renderMarkers=()=>{
         return buses.map((bus,index)=>{
             console.log(bus)
             return (
                 <Marker
                     key={index}
                     icon={"https://i.ibb.co/ThymvQs/bus.png"}
                     position={bus.location}
                 />
             )
         })
     }


     const loadContent=()=>{

         return   <LoadScript libraries={libraries} googleMapsApiKey= {process.env.REACT_APP_GOOGLE_MAPS_API} >

             <GoogleMap
                 mapContainerStyle={containerStyle}
                 center={center}
                 zoom={12}
                 options={{styles:mapStyle}}>

                 {renderMarkers()}

             </GoogleMap>
         </LoadScript>

     }


     useEffect(()=>{
         socket.emit("initial_track_bus_data")
         socket.on("initial_track_bus_data",initialData)
         socket.on("track_bus_data_changed",changeData)
     },[])

   return(
      <>
          {loadContent()}
      </>
   )
}


export default TrackBuses;
