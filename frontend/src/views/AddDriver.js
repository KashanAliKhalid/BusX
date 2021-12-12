import React from "react";
import { useState } from "react";
import QRCode from 'qrcode.react'
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import {useDispatch, useSelector} from "react-redux";
import {addDriver} from '../actions/driverActions.js'
import SimpleLoader from "../components/Loaders/SimpleLoader";


import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';


import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginFileEncode,
    FilePondPluginImageResize,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType);

import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col, Alert, Modal,
} from "react-bootstrap";

import '../assets/css/addData.css'
import YellowButton from "../components/Buttons/YellowButton";


const AddDriver=({match})=> {
    const dispatch= useDispatch();
    const addedDriver =useSelector(state=>state.addedDriver)
    const{loading,error,driver}=addedDriver
    const {userInfo} =useSelector(state=>state.userLogin)

    const [cnic,setCnic] =useState('');
    const [contact,setContact] =useState('');
    const[password,setPassword] =useState('');
    const[confirmPassword,setConfirmPassword] =useState('');
    const[passwordWarning,setPasswordWarning]=useState('none');
    const[addProfileButton,setAddProfileButton]=useState(false)
    const[city,setCity] =useState('');
    const[country,setCountry] =useState('');
    const[postalCode,setPostalCode] =useState('');
    const[address,setAddress] =useState('');
    const[firstName,setFirstName] =useState('');
    const[lastName,setLastName] =useState('');
    const [rfid, setRfid] = useState('');
    const [profile, setProfile]=useState('')
    const [license, setLicense]=useState('')
    const [dob, setDob]=useState('')
    const [age,setAge]=useState('')
    const [alertBox,setAlertBox] = useState(true)



    const onSubmitHandler= (e)=>{
        e.preventDefault();
        const data={
            cnic,contact,password,city,country,postalCode,address,firstName,lastName,age,dob,
            photo:profile[0].getFileEncodeBase64String(),
            photoType:profile[0].fileType,
            license:license[0].getFileEncodeBase64String(),
            institute:userInfo.institute
        }
        dispatch(addDriver(data))
    }




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

    const validateNum=(value,len)=>{
        value=value.target.value
        if(value.toString().length<=len)
        {
            if(len===13)
                setCnic(value);
            else if(len===11)
                setContact(value)
        }
    }

    const showAlert=()=>{
        if(error) {
            if(alertBox)
                return (
                    <Alert variant="danger" onClose={() => setAlertBox(false)} dismissible>
                        <Alert.Heading>Student not added!</Alert.Heading>
                    </Alert>
                )
        }
    }
    const displayForm=()=>{
        return(
            <Container fluid>
                {
                    showAlert()
                }
                <Row>
                    <Col md="8">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Add Driver</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={(e)=>{onSubmitHandler(e)}}>

                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>First Name</label>
                                                <Form.Control
                                                    onChange={(e)=>setFirstName(e.target.value)}
                                                    value={firstName}
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>Last Name</label>
                                                <Form.Control
                                                    onChange={(e)=>setLastName(e.target.value)}
                                                    value={lastName}
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Age</label>
                                                <Form.Control
                                                    onChange={(e)=>setAge(e.target.value)}
                                                    value={age}
                                                    type="number"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>Date of birth</label>
                                                <Form.Control
                                                    onChange={(e)=>setDob(e.target.value)}
                                                    value={dob}
                                                    type="date"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row style={{display:`${passwordWarning}`}}>
                                        <Col>
                                            <Alert variant="danger">
                                                <button
                                                    aria-hidden={true}
                                                    className="close"
                                                    data-dismiss="alert"
                                                    type="button"
                                                    onClick={()=>{setPasswordWarning('none')}}
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
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Contact</label>
                                                <Form.Control
                                                    onChange={(value)=>validateNum(value,11)}
                                                    value={contact}
                                                    placeholder="03XX5XXXXXX"
                                                    type="number"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>CNIC</label>
                                                <Form.Control
                                                    placeholder="3630229314081"
                                                    type="number"
                                                    onChange={(value)=>validateNum(value,13)}
                                                    value={cnic}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>Password</label>
                                                <Form.Control
                                                    type="password"
                                                    onChange={(e)=>setPassword(e.target.value)}
                                                    value={password}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>Renter-Password</label>
                                                <Form.Control
                                                    type="password"
                                                    onChange={(e)=>setConfirmPassword(e.target.value)}
                                                    value={confirmPassword}
                                                    onBlur={validatePassword}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group>
                                                <label>Address</label>
                                                <Form.Control
                                                    placeholder="Home Address"
                                                    type="text"
                                                    value={address}
                                                    onChange={(e)=>{setAddress(e.target.value)}}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="4">
                                            <Form.Group>
                                                <label>City</label>
                                                <Form.Control
                                                    type="text"
                                                    value={city}
                                                    onChange={(e)=>{setCity(e.target.value)}}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="px-1" md="4">
                                            <Form.Group>
                                                <label>Country</label>
                                                <Form.Control
                                                    type="text"
                                                    value={country}
                                                    onChange={(e)=>{setCountry(e.target.value)}}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="4">
                                            <Form.Group>
                                                <label>Postal Code</label>
                                                <Form.Control
                                                    placeholder="ZIP Code"
                                                    type="number"
                                                    value={postalCode}
                                                    onChange={(e)=>{setPostalCode(e.target.value)}}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>


                                    <Row>
                                        <Col className="pl-3" md="4">
                                            <FilePond
                                                allowMultiple={false}
                                                required={true}
                                                acceptedFileTypes={['application/pdf']}
                                                labelIdle='Drag & Drop license document <span class="filepond--label-action">Browse</span>'
                                                files={license}
                                                onupdatefiles={setLicense}
                                                maxFileSize='500KB'
                                            />
                                        </Col>
                                        <Col className="pl-3" md="4">
                                            <FilePond
                                                allowMultiple={false}
                                                required={true}
                                                imageResizeTargetHeight={150}
                                                imageResizeTargetWidth={150}
                                                labelIdle='Drag & Drop profile photo <span class="filepond--label-action">Browse</span>'
                                                files={profile}
                                                onupdatefiles={setProfile}
                                                maxFileSize='100KB'
                                            />
                                        </Col>
                                    </Row>
                                    <YellowButton
                                        className="pull-right"
                                        type="submit"
                                        width={200}
                                        content="Add driver"
                                        disabled={addProfileButton}
                                    />

                                    <div className="clearfix"></div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Row>
                            <Card className="card-user">
                                <div className="card-image">
                                    <img
                                        alt="..."
                                        src={
                                            require("assets/img/comasts.jpg")
                                                .default
                                        }
                                    ></img>
                                </div>
                                <Card.Body style={{display:profile !== '' ? 'block':'none'  }}>
                                    <div className="author">
                                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                            {
                                                (profile === '' || profile[0] === undefined) ? '' :   <img
                                                    alt="check"
                                                    className="avatar border-gray"
                                                    src={`data:${profile[0].fileType};charset=utf8;base64,${profile[0].getFileEncodeBase64String()}`}
                                                ></img>
                                            }
                                            <h5 className="title">{firstName} {lastName}</h5>
                                        </a>
                                        <p className="description">{cnic}</p>
                                    </div>
                                    <p className="description text-center">

                                    </p>
                                </Card.Body>
                                <hr></hr>

                            </Card>
                        </Row>

                    </Col>
                </Row>
            </Container>
        )
    }

    return (
        <>
            {loading===true? <SimpleLoader/> : displayForm() }

        </>
    );
}

export default AddDriver;
