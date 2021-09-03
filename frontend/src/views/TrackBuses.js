import React, {useEffect, useState,useRef} from 'react'
require('dotenv').config()
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

const containerStyle = {
    height: '80vh'
};




const libraries=["places"]



 const TrackBuses=()=>{

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

     const [stops,setStops]=useState([])
     const [center,setCenter]=useState({
         lat: 33.68749873779495,
         lng: 73.05121603557306
     })
     const [routeNumber,setRouteNumber]=useState('')
     const[origin,setOrigin]=useState('')
     const [destination,setDestination]=useState('')
     const [response,setResponse]=useState('')
     const [path,setPath]=useState([])
     const [distance,setDistance]=useState([])
     const [time,setTime]=useState([])

     const [req,setReq]=useState(0)
     const textInput = useRef(null);

     const userLogindata=useSelector(state=>state.userLogin)
     const {loading,error,userInfo}=userLogindata


     useEffect(()=>{
         navigator.geolocation.getCurrentPosition((position)=>{
             const currentLocation={
                 lat:position.coords.latitude,
                 lng:position.coords.longitude
             }
             setCenter(currentLocation)
         })

         stops.push(userInfo.instituteLocation)
     },[])

      const onMapClick=(e)=>{
         let markers=[...stops,e.latLng.toJSON()];
          setStops(markers)
     }

     const deleteMarker=(deleteStop)=>{
         let updatedStops=stops.filter((stop)=>{
             return !(JSON.stringify(stop)===JSON.stringify(deleteStop))
         })
         setStops(updatedStops);
     }
     const renderMarkers=()=>{
         return stops.map((stop,index)=>{
             return (
                 <Marker
                     key={index}
                     icon={"https://i.ibb.co/Fx2mRjW/44641cdc9faf6b9c3baa98dd8d085a05.png"}
                     position={stop}
                     onClick={(e)=>{
                         deleteMarker(e.latLng.toJSON())
                     }}
                     draggable={true}
                     onDragEnd={(e)=>{
                         const updateStop=[...stops]
                         updateStop[index]=e.latLng.toJSON()
                         setStops(updateStop)
                     }}
                     animation='DROP'
                 />
             )
         })
     }

     const setRouteOptions=(e)=>{
         e.preventDefault();
         if(stops.length!==0){
             setOrigin(stops[0])
             setDestination(stops[stops.length-1])
         }
         const updatePath=stops.map((val,index,arr)=>{
             return{
                 location:{lat:val.lat, lng:val.lng},
             }
         })
         updatePath.shift()
         updatePath.pop()
         setDistance([])
         setTime([])
         setReq(0)
         setPath(updatePath)
     }

     const directionsCallback =(response)=> {
         if (response !== null) {
             if (response.status === 'OK') {
                 setResponse(response)
             }
         }
     }



     const calculateDistance=()=>{
         if(destination !=='' && origin!=='')
         {
             return stops.map((stop,index)=>{

                 if(index!==(stops.length-1)){
                     let originDistance=stops[index]
                     let destinationDistance=stops[index+1]

                     return ( <DistanceMatrixService
                         key={index}
                         options={{
                             destinations: [{lat:destinationDistance.lat, lng:destinationDistance.lng}],
                             origins: [{lng:originDistance.lng, lat:originDistance.lat}],
                             travelMode: "DRIVING",
                             drivingOptions:{
                                 departureTime: new Date(Date.now()),
                             }

                         }}
                         callback = {(response) => {
                             setReq(req+1);
                             let arr=[...distance]
                             let arrTime=[...time]
                             arrTime.push(response.rows[0].elements[0].duration.value)
                             arr.push(response.rows[0].elements[0].distance.value)
                             setDistance(arr);
                             setTime(arrTime)
                         }}
                     />)
                 }

             })
         }
     }

     const onPlacesChanged = () =>setCenter(textInput.current.state.searchBox.getPlaces()[0].geometry.location.toJSON());


   return(
       <LoadScript libraries={libraries} googleMapsApiKey= {process.env.REACT_APP_GOOGLE_MAPS_API} >
           <Form>
               <Row>
                   <Col xs={6}>
                       <Form.Group className="yellow-form-group">
                           <label className="yellow-form-label">Route Number</label>
                           <Form.Control
                               className="yellow-form-field"
                               required={true}
                               placeholder="1"
                               type="Number"
                           ></Form.Control>
                       </Form.Group>


                   </Col>
                   <Col xs={6} className="pt-2" >
                       <YellowButton content="Add Route"></YellowButton>
                   </Col>

               </Row>
           </Form>

           <Row>
               <Col lg="3" sm="6">
                   <Card className="card-stats">
                       <Card.Body>
                           <Row>
                               <Col xs="5">
                                   <div className="icon-big text-center icon-warning">
                                       <i className="nc-icon nc-time-alarm text-warning"></i>
                                   </div>
                               </Col>
                               <Col xs="7">
                                   <div className="numbers">
                                       <p className="card-category">Estimated Travel time</p>
                                       <Card.Title as="h4">{time.reduce(function(acc, val) { return acc + val; }, 0)/60} Minutes</Card.Title>
                                   </div>
                               </Col>
                           </Row>
                       </Card.Body>
                   </Card>
               </Col>
               <Col lg="3" sm="6">
                   <Card className="card-stats">
                       <Card.Body>
                           <Row>
                               <Col xs="5">
                                   <div className="icon-big text-center icon-warning">
                                       <i className="nc-icon nc-ruler-pencil text-success"></i>
                                   </div>
                               </Col>
                               <Col xs="7">
                                   <div className="numbers">
                                       <p className="card-category">Route Distance</p>
                                       <Card.Title as="h4">{distance.reduce(function(acc, val) { return acc + val; }, 0)/1000} Km</Card.Title>
                                   </div>
                               </Col>
                           </Row>
                       </Card.Body>
                   </Card>
               </Col>
               <Col lg="3" sm="6">
                   <Card className="card-stats">
                       <Card.Body>
                           <Row>
                               <Col xs="5">
                                   <div className="icon-big text-center icon-warning">
                                       <i className="nc-icon nc-pin-3 text-danger"></i>
                                   </div>
                               </Col>
                               <Col xs="7">
                                   <div className="numbers">
                                       <p className="card-category">Stops</p>
                                       <Card.Title as="h4">{path.length}</Card.Title>
                                   </div>
                               </Col>
                           </Row>
                       </Card.Body>
                   </Card>
               </Col>
               <Col lg="3" sm="6">
                   <Card className="card-stats">
                       <Card.Body>
                           <Row>
                               <Col xs="5">
                                   <div className="icon-big text-center icon-warning">
                                       <i className="nc-icon nc-notes text-primary"></i>
                                   </div>
                               </Col>
                               <Col xs="7">
                                   <div className="numbers">
                                       <p className="card-category">Complaints</p>
                                       <Card.Title as="h4">5</Card.Title>
                                   </div>
                               </Col>
                           </Row>
                       </Card.Body>
                   </Card>
               </Col>
           </Row>

           <GoogleMap
               mapContainerStyle={containerStyle}
               center={center}
               zoom={16}
               onClick={onMapClick}
               options={{styles:mapStyle}}>


               <StandaloneSearchBox
                   ref={textInput}
                   onPlacesChanged={
                       onPlacesChanged
                   }
               >
                   <input
                       className="mt-5 mt-md-2"
                       type="text"
                       placeholder="Search for places"
                       style={{
                           boxSizing: `border-box`,
                           border: `1px solid transparent`,
                           width: `240px`,
                           height: `32px`,
                           padding: `0 12px`,
                           borderRadius: `3px`,
                           boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                           fontSize: `14px`,
                           outline: `none`,
                           textOverflow: `ellipses`,
                           position: "absolute",
                           left: "50%",
                           top:'1%',
                           marginLeft: "-120px",
                       }}
                   />

               </StandaloneSearchBox>

               {
                   (
                       destination !== '' &&
                       origin !== ''
                   ) && (
                       <DirectionsService
                           options={{
                               destination:destination,
                               origin: origin,
                               travelMode: 'DRIVING',
                               waypoints:path,
                               optimizeWaypoints:true
                           }}
                           callback={directionsCallback}

                       />
                   )
               }

               {
                   response !== '' && (
                       <DirectionsRenderer
                           options={{
                               directions: response,
                               suppressMarkers: true,
                               polylineOptions: { strokeColor: '#fdda00',strokeWeight: 5, strokeOpacity:0.8 },
                           }}
                       />
                   )
               }

               {req===(stops.length-1)?'' : calculateDistance()}
               {renderMarkers()}

               <YellowButton onClick={setRouteOptions} className="draw-route-button ml-1" content="Draw Route"/>

           </GoogleMap>
       </LoadScript>
   )
}


export default TrackBuses;
