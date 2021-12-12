import React from "react";
import { useState,useEffect,useRef } from "react";
import QRCode from 'qrcode.react'
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import {useDispatch, useSelector} from "react-redux";
import {getStudent, updateStudent} from '../actions/studentActions'
import ProfileLoader from "../components/Loaders/ProfileLoader";
import UpdateLoader from "../components/Loaders/UpdateLoader";
import YellowButton from "../components/Buttons/YellowButton";



import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginFileEncode,FilePondPluginImageResize,FilePondPluginImagePreview,FilePondPluginFileValidateSize);
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


const StudentProfileUpdate=({match})=> {
    const dispatch= useDispatch();
    const studentProfile =useSelector(state=>state.studentProfile)
    const updateStudentData=useSelector(state=>state.updatedStudent)
    const{loading,student}=studentProfile
    const {updateLoading, updatedStudent,error}=updateStudentData


    const [cnic,setCnic] =useState( null);
    const [contact,setContact] =useState(null);
    const[password,setPassword] =useState('');
    const[confirmPassword,setConfirmPassword] =useState(null);
    const[passwordWarning,setPasswordWarning]=useState('none');
    const[addProfileButton,setAddProfileButton]=useState(false)
    const[city,setCity] =useState(null);
    const[country,setCountry] =useState(null);
    const[postalCode,setPostalCode] =useState(null);
    const[address,setAddress] =useState(null);
    const[firstName,setFirstName] =useState(null);
    const[lastName,setLastName] =useState(null);
    const[regNo,setRegNo] =useState(null);
    const[email,setEmail] =useState(null);
    const [show, setShow] = useState(false);
    const [rfid, setRfid] = useState(null);
    const [profile, setProfile]=useState('')
    const [alertBox,setAlertBox] = useState(true)
    const[feeStatus,setFeeStatus]=useState(null)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(()=>{
        dispatch(getStudent(match.params.id))

    },[updatedStudent,dispatch])

    const onSubmitHandler= (e)=>{
        e.preventDefault();
        const data={
            cnic,contact,password,city,country,postalCode,address,firstName,lastName,regNo,email,rfid,
            photo:profile==='' ?student.photo : profile[0].getFileEncodeBase64String(),
            photoType:profile===''?student.photoType: profile[0].fileType,
        }

        dispatch(updateStudent(student._id,data))
    }


    const handleRFID=()=>{
        if(rfid==='')
            setShow(true)
        else
            setShow(false)
    }

    const showAlert=()=>{
        if(error) {
            if(alertBox)
                return (
                    <Alert variant="danger" onClose={() => setAlertBox(false)} dismissible>
                        <Alert.Heading>Profile not updated!</Alert.Heading>
                    </Alert>
                )
        }
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


    const showProfile= ()=>{
        if(student!==undefined) {
            if(updateLoading===true)
            return <UpdateLoader/>
            else
                return (
                <Container fluid>
                    {
                        showAlert()
                    }
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Body><img width='310' src={require("assets/img/scan rfid.gif").default} alt='scan rfid'/></Modal.Body>
                        <Modal.Footer>
                            <Form.Control
                                style={{width: '310px', marginLeft: '-0.5px'}}
                                placeholder="RFID"
                                type="number"
                                required
                                value={rfid===null?student.rfid :rfid}
                                onChange={(e) => {
                                    setRfid(e.target.value)
                                    handleRFID()
                                }}
                            ></Form.Control>
                        </Modal.Footer>
                    </Modal>
                    <Row>
                        <Col md="8">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">{student.firstName} {student.lastName}'s Profile</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Form onSubmit={(e)=>{onSubmitHandler(e)}}>
                                        <Row>
                                            <Col className="pr-1" md="5">
                                                <Form.Group>
                                                    <label>Contact</label>
                                                    <Form.Control
                                                        onChange={(value) => validateNum(value, 11)}
                                                        value={contact===null? student.contact :contact}
                                                        placeholder="03XX5XXXXXX"
                                                        type="number"
                                                        required
                                                        defaultValue={6456465465}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="px-1" md="3">
                                                <Form.Group>
                                                    <label>Registration Number</label>
                                                    <Form.Control
                                                        placeholder="SP18-BCS-073"
                                                        type="text"
                                                        onChange={(e) => setRegNo(e.target.value)}
                                                        required
                                                        value={regNo===null? student.regNo: regNo}
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
                                                        required
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        value={email===null ? student.email: email}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-1" md="6">
                                                <Form.Group>
                                                    <label>First Name</label>
                                                    <Form.Control
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        value={firstName===null ? student.firstName : firstName }
                                                        type="text"
                                                        required
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pl-1" md="6">
                                                <Form.Group>
                                                    <label>Last Name</label>
                                                    <Form.Control
                                                        onChange={(e) => setLastName(e.target.value)}
                                                        value={lastName===null?student.lastName :lastName}
                                                        type="text"
                                                        required
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
                                            <Col className="pr-1" md="6">
                                                <Form.Group>
                                                    <label>CNIC</label>
                                                    <Form.Control
                                                        placeholder="3630229314081"
                                                        type="number"
                                                        required
                                                        onChange={(value) => validateNum(value, 13)}
                                                        value={cnic === null ? student.cnic : cnic}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
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
                                        <Row>
                                            <Col md="12">
                                                <Form.Group>
                                                    <label>Address</label>
                                                    <Form.Control
                                                        placeholder="Home Address"
                                                        type="text"
                                                        required
                                                        value={address===null?student.address:address}
                                                        onChange={(e) => {
                                                            setAddress(e.target.value)
                                                        }}
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
                                                        value={city===null?student.city:city}
                                                        required
                                                        onChange={(e) => {
                                                            setCity(e.target.value)
                                                        }}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="px-1" md="4">
                                                <Form.Group>
                                                    <label>Country</label>
                                                    <Form.Control
                                                        type="text"
                                                        value={country===null?student.country:country}
                                                        onChange={(e) => {
                                                            setCountry(e.target.value)
                                                        }}
                                                        required
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pl-1" md="4">
                                                <Form.Group>
                                                    <label>Postal Code</label>
                                                    <Form.Control
                                                        placeholder="ZIP Code"
                                                        type="number"
                                                        required
                                                        value={postalCode===null?student.postalCode:postalCode}
                                                        onChange={(e) => {
                                                            setPostalCode(e.target.value)
                                                        }}
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
                                                        value={rfid===null?student.rfid:rfid}
                                                        onChange={(e) => {
                                                            setRfid(e.target.value);
                                                            handleRFID()
                                                        }}
                                                        onFocus={handleRFID}
                                                        onBlur={handleRFID}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pl-3" md="4">
                                                <Form.Group>
                                                    <label>Fee status</label>
                                                    <Form.Control
                                                        type="number"
                                                        as="select"
                                                        required
                                                        value={feeStatus===null?student.feeStatus:feeStatus}
                                                        onChange={(e) => {
                                                            setFeeStatus(e.target.value);
                                                        }}
                                                    >
                                                        <option selected={feeStatus===null?student.feeStatus==="Paid":feeStatus==="Paid"} value="Paid">Paid</option>
                                                        <option selected={feeStatus===null?student.feeStatus==="Not Paid":feeStatus==="Not Paid"} value="Not Paid">Not Paid</option>
                                                    </Form.Control>
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
                                        </Row>

                                        <YellowButton type="Submit" disabled={addProfileButton}
                                         width={200} className="pull-right" content={'Update Profile'}/>
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
                                    <Card.Body>
                                        <div className="author">
                                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                {
                                                    profile === '' ?
                                                        <img
                                                            alt="check"
                                                            className="avatar border-gray"
                                                            src={`data:${student.photoType};charset=utf8;base64,${Buffer.from(student.photo).toString('ascii')}`}
                                                        ></img>
                                                        : profile[0] !==undefined? <img
                                                            alt="check"
                                                            className="avatar border-gray"
                                                            src={`data:${profile[0].fileType};charset=utf8;base64,${profile[0].getFileEncodeBase64String()}`}
                                                        ></img> : ''
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
                            {
                                 rfid === null ? <Row style={{}}>
                                     <QRCode style={{marginLeft: '6vw'}} value={student.rfid.toString()} size={250}/>
                                 </Row> :  <Row style={{}}>
                                     <QRCode style={{marginLeft: '6vw'}} value={rfid.toString()} size={250}/>
                                 </Row>
                        }


                        </Col>
                    </Row>
                </Container>
            )
        }
    }


    return (
        <>
            {
                loading==true? <ProfileLoader/> : showProfile()
            }
        </>
    );
};

export default StudentProfileUpdate;
