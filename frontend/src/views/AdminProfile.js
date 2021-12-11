import React, {useRef, useState,useEffect} from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col, Alert,
} from "react-bootstrap";

import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";

import {useDispatch, useSelector} from "react-redux";
import YellowButton from "../components/Buttons/YellowButton";
import {updateUser,userProfile} from "../actions/userActions";
import ProfileLoader from "../components/Loaders/ProfileLoader";
import UpdateLoader from "../components/Loaders/UpdateLoader";
const libraries=["places"]
const containerStyle = {
  height: '40vh'
};

function AdminProfile({history}) {

  const dispatch= useDispatch()
  const {loading,error,user}=useSelector(state=>state.userProfile)
  const {userInfo}=useSelector(state=>state.userLogin)
  const {updateLoading}=useSelector(state=>state.updatedUser)

  const[password,setPassword] =useState('');
  const[confirmPassword,setConfirmPassword] =useState(null);
  const[email,setEmail] =useState(null);
  const[institute,setInstitute] =useState(null);
  const [instituteLocation,setInstituteLocation] = useState(user?user.instituteLocation:null);
  const [location,setLocation] = useState(user?user.instituteLocation:null);
  const [center,setCenter] = useState(user?user.instituteLocation:null);
  const [name,setName] = useState(null);
  const[passwordWarning,setPasswordWarning]=useState('none');
  const[updateProfileButton,setUpdateProfileButton]=useState(false)
  const textInput = useRef(null);


  const onSubmitHandler= (e)=>{
    e.preventDefault();
    const data={
      institute,name,instituteLocation,password,email
    }

    dispatch(updateUser(user._id,data,userInfo.type))
  }

  useEffect(()=>{
    dispatch(userProfile(userInfo._id,userInfo.type))
  },[dispatch])

  const validatePassword =(e)=>{
    if(password!==confirmPassword)
    {
      setPasswordWarning('block')
      setUpdateProfileButton(true)
    }
    else{
      setPasswordWarning('none')
      setUpdateProfileButton(false)

    }
  }
  const onMapClick=(e)=>{
    let marker=e.latLng.toJSON();
    setLocation(marker)
    setInstituteLocation(marker)
  }

  const showProfile=()=> {
    if (user !== undefined) {
      if (updateLoading === true)
        return <UpdateLoader/>
      else
        return (
            <Container fluid>
              <Row>
                <Col md="8">
                  <Card>
                    <Card.Header>
                      <Card.Title as="h4">Edit Profile</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Form onSubmit={onSubmitHandler}>
                        <Row>
                          <Col className="pr-1" md="5">
                            <Form.Group>
                              <label>Email</label>
                              <Form.Control
                                  placeholder="Email"
                                  type="email"
                                  required
                                  onChange={(e) => setEmail(e.target.value)}
                                  value={email === null ? user.email : email}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col className="px-1" md="3">
                            <Form.Group>
                              <label>Name</label>
                              <Form.Control
                                  type="text"
                                  required
                                  onChange={(e) => setName(e.target.value)}
                                  value={name === null ? user.name : name}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col className="pl-1" md="4">
                            <Form.Group>
                              <label>
                                Institute Name
                              </label>
                              <Form.Control
                                  placeholder="Institute Name"
                                  type="text"
                                  disabled
                                  required
                                  onChange={(e) => setInstitute(e.target.value)}
                                  value={institute === null ? user.institute : institute}
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
                          <Col className="pl-1" md="3">
                            <Form.Group>
                              <label>Password</label>
                              <Form.Control
                                  type="password"
                                  onChange={(e) => setPassword(e.target.value)}
                                  value={password}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col className="pl-1" md="3">
                            <Form.Group>
                              <label>Renter-Password</label>
                              <Form.Control
                                  type="password"
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                  value={confirmPassword}
                                  onBlur={validatePassword}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>


                        <YellowButton type="Submit" disabled={updateProfileButton}
                                      width={200} className="pull-right" content={'Update Profile'}/>
                        <div className="clearfix"></div>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md="4">


                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center===null?user.instituteLocation:center}
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
                          position={location===null?user.instituteLocation:location}
                          draggable={true}
                          onDragEnd={(e) => {
                            setLocation(e.latLng.toJSON())
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
  const onPlacesChanged = () =>setCenter(textInput.current.state.searchBox.getPlaces()[0].geometry.location.toJSON());
  return (
      <>
        <LoadScript libraries={libraries} googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API}>

        {
          loading===true? <ProfileLoader/> : showProfile()
        }
        </LoadScript>
      </>
  );
}

export default AdminProfile;
