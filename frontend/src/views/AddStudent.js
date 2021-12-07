import React from "react";
import { useState } from "react";
import QRCode from 'qrcode.react'
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import {useDispatch, useSelector} from "react-redux";
import {addStudent} from '../actions/studentActions.js'


import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginFileEncode,FilePondPluginImageResize,FilePondPluginImagePreview,FilePondPluginFileValidateSize);
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
    Col, Alert, Modal,
} from "react-bootstrap";

import '../assets/css/addData.css'
import YellowButton from "../components/Buttons/YellowButton";


const User=({match})=> {
    const dispatch= useDispatch();
    const addedStudent =useSelector(state=>state.addedStudent)
    const{loading,error,student}=addedStudent

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
    const[regNo,setRegNo] =useState('');
    const[email,setEmail] =useState('');
    const [show, setShow] = useState(false);
    const [rfid, setRfid] = useState('');
    const [profile, setProfile]=useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmitHandler= (e)=>{
        e.preventDefault();
        const data={
            cnic,contact,password,city,country,postalCode,address,firstName,lastName,regNo,email,rfid,
            photo:profile[0].getFileEncodeBase64String(),
            photoType:profile[0].fileType,
        }
        dispatch(addStudent(data))
    }


    const handleRFID=()=>{
        if(rfid==='')
            setShow(true)
        else
            setShow(false)
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


    return (
        <>

            <Container fluid>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Body><img width='310' src={require("assets/img/scan rfid.gif").default} alt='scan rfid'/></Modal.Body>
                    <Modal.Footer>
                        <Form.Control
                            style={{width:'310px',marginLeft:'-0.5px'} }
                            placeholder="RFID"
                            required
                            type="number"
                            value={rfid}
                            onChange={(e)=>{setRfid(e.target.value) ;handleRFID()}}
                        ></Form.Control>
                    </Modal.Footer>
                </Modal>
                <Row>
                    <Col md="8">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Add Student</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={(e)=>{onSubmitHandler(e)}}>
                                    <Row>
                                        <Col className="pr-1" md="5">
                                            <Form.Group>
                                                <label>Contact</label>
                                                <Form.Control
                                                    onChange={(value)=>validateNum(value,11)}
                                                    value={contact}
                                                    placeholder="03XX5XXXXXX"
                                                    type="number"
                                                    required
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="px-1" md="3">
                                            <Form.Group>
                                                <label>Registration Number</label>
                                                <Form.Control
                                                    placeholder="SP18-BCS-073"
                                                    type="text"
                                                    onChange={(e)=>setRegNo(e.target.value)}
                                                    value={regNo}
                                                    required
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="4">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1">
                                                    Email address
                                                </label>
                                                <Form.Control
                                                    placeholder="Email"
                                                    type="email"
                                                    onChange={(e)=>setEmail(e.target.value)}
                                                    value={email}
                                                    required
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>First Name</label>
                                                <Form.Control
                                                    onChange={(e)=>setFirstName(e.target.value)}
                                                    value={firstName}
                                                    type="text"
                                                    required
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
                                                    required
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
                                                <label>CNIC</label>
                                                <Form.Control
                                                    placeholder="3630229314081"
                                                    type="number"
                                                    required
                                                    onChange={(value)=>validateNum(value,13)}
                                                    value={cnic}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="3">
                                            <Form.Group>
                                                <label>Password</label>
                                                <Form.Control
                                                    type="password"
                                                    onChange={(e)=>setPassword(e.target.value)}
                                                    value={password}
                                                    required
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="3">
                                            <Form.Group>
                                                <label>Renter-Password</label>
                                                <Form.Control
                                                    type="password"
                                                    onChange={(e)=>setConfirmPassword(e.target.value)}
                                                    value={confirmPassword}
                                                    required
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
                                                    required
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
                                                    required
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
                                                    required
                                                    type="number"
                                                    value={postalCode}
                                                    onChange={(e)=>{setPostalCode(e.target.value)}}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>


                                    <Row>
                                        <Col className="pl-3" md="4">
                                            <Form.Group>
                                                <label>RFID</label>
                                                <Form.Control
                                                    placeholder="RFID"
                                                    type="number"
                                                    required
                                                    value={rfid}
                                                    onChange={(e)=>{setRfid(e.target.value) ;handleRFID()}}
                                                    onFocus={handleRFID}
                                                    onBlur={handleRFID}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-3" md="4">
                                            <FilePond
                                                allowMultiple={false}
                                                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                                imageResizeTargetHeight={150}
                                                imageResizeTargetWidth={150}
                                                files={profile}
                                                onupdatefiles={setProfile}
                                                maxFileSize='100KB'
                                            />
                                        </Col>
                                        {profile===''? '' :console.log(profile)}
                                    </Row>
                                    <YellowButton
                                        className="pull-right"
                                        type="submit"
                                        width={200}
                                        content="Add Student"
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
                                            <h5 className="title">Kashan Ali</h5>
                                        </a>
                                        <p className="description">sp18-bcs-073</p>
                                    </div>
                                    <p className="description text-center">

                                    </p>
                                </Card.Body>
                                <hr></hr>

                            </Card>
                        </Row>

                        <Row  style={{display:rfid === '' ? 'none' :'block'}}>
                            <QRCode style={{marginLeft:'6vw'}} value={rfid.toString()} size={250}/>
                        </Row>

                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default User;
