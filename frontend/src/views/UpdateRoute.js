import React, {useEffect, useState,useRef} from 'react'
require('dotenv').config()
import {useDispatch, useSelector} from "react-redux";
import {getRoute,updateRoute} from "../actions/routeActions";
import MapsLoader from "../components/Loaders/MapsLoader";
import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API);
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");


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



const UpdateRoute=({match})=>{

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
    const [name,setName]=useState(null)
    const [center,setCenter]=useState({
        lat: 33.68749873779495,
        lng: 73.05121603557306
    })
    const[origin,setOrigin]=useState('')
    const [destination,setDestination]=useState('')
    const [response,setResponse]=useState('')
    const [path,setPath]=useState([])
    const [distance,setDistance]=useState(0)
    const [time,setTime]=useState(0)
    const [addresses,setAddresses]=useState([])

    const [req,setReq]=useState(0)
    const textInput = useRef(null);

    const routeData=useSelector(state=>state.routeDetails)
    const userLogindata=useSelector(state=>state.userLogin)
    const {updateLoading,updatedRoute}=useSelector(state=>state.updatedRoute)
    const {loading,error,route}=routeData
    const {userInfo}=userLogindata
    const dispatch=useDispatch()


    useEffect(()=>{
        if(!route)
        {
            dispatch(getRoute(match.params.id))
        }



        if(route){
            setStops([userInfo.instituteLocation,...route.stops])
            setRouteOptions()
            const stop=route.stops[0]
            delete stop["_id"]
            setCenter(stop)
            setName(route.name)
        }

    },[route])

    const onMapClick=(e)=>{
        let markers=[...stops,e.latLng.toJSON()];
        setStops(markers)
    }

    const stopAddresses=()=>{
        const addressArr=[]
        stops.forEach((value,index,arr)=>{
            if(index!==0)
            {
                Geocode.fromLatLng(value.lat.toString(), value.lng.toString()).then(
                    (response) => {
                        const address = response.results[0].formatted_address;
                        addressArr.push(address)
                        console.log(addressArr)
                        setAddresses(addressArr)

                    },
                    (error) => {
                        console.error(error);
                    }
                );
            }


        })
    }

    const deleteMarker=(deleteStop)=>{
        let updatedStops=stops.filter((stop)=>{
            delete stop["_id"];
            return !(JSON.stringify(stop)===JSON.stringify(deleteStop))
        })
        stopAddresses()
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
                        console.log(e.latLng.toJSON())
                        console.log(stops)
                        deleteMarker(e.latLng.toJSON())
                    }}
                    draggable={true}
                    onDragEnd={(e)=>{
                        const updateStop=[...stops]
                        updateStop[index]=e.latLng.toJSON();
                        setStops(updateStop)
                    }}
                    animation='DROP'
                />
            )
        })
    }

    const setRouteOptions=()=>{
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
        setDistance(0)
        setTime(0)
        setReq(0)
        setPath(updatePath)
        stopAddresses()
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
            let destinations=[]
            let origins=[]
            stops.forEach((value,index,arr)=>{
                if(index===0)
                {
                    origins.push(value)
                }
                else if(index===(arr.length-1))
                {
                    destinations.push(value)
                }
                else {
                    destinations.push(value)
                    origins.push(value)
                }
            })

            return ( <DistanceMatrixService
                options={{
                    destinations: destinations,
                    origins: origins,
                    travelMode: "DRIVING",
                    drivingOptions:{
                        departureTime: new Date(Date.now()),
                    }

                }}
                callback = {(response) => {
                    let distance=0
                    let duration=0
                    response.rows.forEach((value,index,arr)=>{
                        distance=distance +value.elements[index].distance.value
                        duration=duration+value.elements[index].duration.value
                    })
                    setDistance(distance);
                    setTime(duration)
                }}
            />)
        }

    }

    const onPlacesChanged = () =>setCenter(textInput.current.state.searchBox.getPlaces()[0].geometry.location.toJSON());

    const routeClickHandler=()=>{
        const addStops=[...stops]
        addStops.shift()
        const data={name,stops:addStops,addresses,
            traveltime:(time/60).toFixed(2),
            distance:(distance/1000).toFixed(2)
        }
        dispatch(updateRoute(route._id,data));

    }

    const loadContent=()=>{

        return  <>
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
                                value={name}
                            ></Form.Control>
                        </Form.Group>


                    </Col>
                    <Col xs={6} className="pt-2" >
                        <YellowButton onClick={routeClickHandler} content="Update Route"></YellowButton>
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
                                        <Card.Title as="h4">{(time/60).toFixed(2)} Minutes</Card.Title>
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
                                        <Card.Title as="h4">{(distance/1000).toFixed(2)} Km</Card.Title>
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
                                        <Card.Title as="h4">{stops.length-1}</Card.Title>
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

                {}

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

                {calculateDistance()}
                {renderMarkers()}

                <YellowButton onClick={setRouteOptions} className="draw-route-button ml-1" content="Draw Route"/>

            </GoogleMap>
        </>

    }

    return(
        <>
            <LoadScript libraries={libraries} googleMapsApiKey= {process.env.REACT_APP_GOOGLE_MAPS_API} >
            {
                (loading||updateLoading)===true? <MapsLoader/>: loadContent()
            }
            </LoadScript>
        </>

    )
}


export default UpdateRoute;
