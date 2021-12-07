import React, {useEffect, useRef, useState} from 'react';
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import YellowButton from "../../components/Buttons/YellowButton";
import {useDispatch, useSelector} from "react-redux";
import {licenseList} from "../../actions/licenseActions";
import {getAdmin,updateAdmin} from '../../actions/adminActions'
import SimpleLoader from "../../components/Loaders/SimpleLoader";
import ProfileLoader from '../../components/Loaders/ProfileLoader'
import {GoogleMap, Marker, StandaloneSearchBox,LoadScript} from "@react-google-maps/api";
import UpdateLoader from "../../components/Loaders/UpdateLoader";

const libraries=["places"]
const containerStyle = {
    height: '40vh'
};

const AdminProfile = ({match}) => {
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


    const dispatch= useDispatch()
    const {loading,admin,error} =useSelector(state=>state.adminDetails)
    const {updateLoading,updatedLicense} =useSelector(state=>state.updatedAdmin)
    const {licenses} =useSelector(state=>state.licenseList)

    const [name,setName]=useState(null)
    const [licenseId,setLicenseId]=useState('')
    const [email,setEmail]=useState(null)
    const [password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')
    const[ institute,setInstitute]=useState(null)
    const [instituteLocation,setInstituteLocation]=useState(null)
    const[passwordWarning,setPasswordWarning]=useState('none');
    const[addProfileButton,setAddProfileButton]=useState(false)
    const [center,setCenter]=useState(null)
    const textInput = useRef(null);


    const validatePassword =(e)=>{
        if(password!==confirmPassword)
        {
            setPasswordWarning('block')
            setAddProfileButton(true)
        }
        else{
            setPasswordWarning('none')
            setAddProfileButton(false)

        }
    }


    useEffect(()=>{
        dispatch(getAdmin(match.params.id))
        dispatch(licenseList())
    },[])
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const data={
            name,email,password,institute,
            license:licenseId===null?admin.license:licenseId,
            instituteLocation:instituteLocation===null?admin.instituteLocation:instituteLocation
        }
        dispatch(updateAdmin(match.params.id,data))
    }

    const onMapClick=(e)=>{
        setInstituteLocation(e.latLng.toJSON())
    }
    const onPlacesChanged = () =>setCenter(textInput.current.state.searchBox.getPlaces()[0].geometry.location.toJSON());


    const displayForm=()=>{
        if(admin!==undefined) {
            if (updateLoading === true)
                return <UpdateLoader/>
            else
                return (

                    <Container fluid>
                        <Row>
                            <Col md="8">
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h4">{admin.name}'s Profile</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form onSubmit={(e) => {
                                            onSubmitHandler(e)
                                        }}>
                                            <Row>
                                                <Col className="pr-1" md="5">
                                                    <Form.Group>
                                                        <label>Name</label>
                                                        <Form.Control
                                                            required='true'
                                                            onChange={(e) => {
                                                                setName(e.target.value)
                                                            }}
                                                            value={name === null ? admin.name : name}
                                                            placeholder="Mr XYZ"
                                                            type="text"
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="px-1" md="3">
                                                    <Form.Group>
                                                        <label>Institute</label>
                                                        <Form.Control
                                                            as="select"
                                                            value={institute === null ? admin.institute : institute}
                                                            required={true}
                                                            onChange={e => {
                                                                setLicenseId(e.target.selectedOptions[0].getAttribute('license-id'))
                                                                setInstitute(e.target.value)
                                                            }}
                                                        >
                                                            <option data="" value=""></option>
                                                            {
                                                                licenses ? licenses.licenses.map(license => {
                                                                    return (
                                                                        <option license-id={license._id}
                                                                                value={license.institute}>{license.institute}</option>
                                                                    )
                                                                }) : ''
                                                            }

                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="4">
                                                    <Form.Group>
                                                        <label>
                                                            Email
                                                        </label>
                                                        <Form.Control
                                                            required='true'
                                                            placeholder="abc@gmail.com"
                                                            type="text"
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            value={email === null ? admin.email : email}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row style={{display: `${passwordWarning}`}}>
                                                <Col>
                                                    <Alert variant="danger">
                                                        <button
                                                            aria-hidden={true}
                                                            className="close"
                                                            data-dismiss="alert"
                                                            type="button"
                                                            onClick={() => {
                                                                setPasswordWarning('none')
                                                            }}

                                                        >
                                                            <i className="nc-icon nc-simple-remove"></i>
                                                        </button>
                                                        <span>
                                                    <b>Warning -</b>
                                                    Passwords do not match
                                                </span>
                                                    </Alert>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col className="pl-3" md="4">
                                                    <Form.Group>
                                                        <label>
                                                            Password
                                                        </label>
                                                        <Form.Control
                                                            type="password"
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            value={password}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>

                                                <Col className="pl-1" md="4">
                                                    <Form.Group>
                                                        <label>
                                                            Confirm Password
                                                        </label>
                                                        <Form.Control
                                                            type="password"
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                            value={confirmPassword}
                                                            onBlur={validatePassword}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>


                                            <YellowButton
                                                className="pull-right"
                                                type="submit"
                                                width={180}
                                                content="Update Details"
                                                disabled={addProfileButton}
                                            />

                                            <div className="clearfix"></div>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col md={4}>
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={center === null ? admin.instituteLocation : center}
                                    zoom={16}
                                    onClick={onMapClick}

                                    options={{styles: mapStyle}}>


                                    <StandaloneSearchBox
                                        ref={textInput}
                                        onPlacesChanged={
                                            onPlacesChanged
                                        }
                                    >
                                        <input
                                            className="mt-5 mt-md-5"
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
                                                top: "2%",
                                                marginLeft: "-120px",
                                            }}
                                        />

                                    </StandaloneSearchBox>

                                    <Marker
                                        icon={"https://i.ibb.co/Fx2mRjW/44641cdc9faf6b9c3baa98dd8d085a05.png"}
                                        position={instituteLocation === null ? admin.instituteLocation : instituteLocation}
                                        draggable={true}
                                        onDragEnd={(e) => {
                                            setInstituteLocation(e.latLng.toJSON())
                                        }}
                                        animation='DROP'
                                    />
                                </GoogleMap>
                            </Col>

                        </Row>
                    </Container>
                )
        }
    }

    return (
        <>
            <LoadScript libraries={libraries} googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API}>
                {
                    loading===true? <ProfileLoader/> :displayForm()
                }
            </LoadScript>
        </>

    );
};

export default AdminProfile;
