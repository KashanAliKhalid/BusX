import React from "react";
import { useState, useEffect } from "react";
import QRCode from 'qrcode.react'
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import {useDispatch, useSelector} from "react-redux";
import {getBus,updateBus} from '../actions/busActions.js';
import LoginButton from "../components/Buttons/LoginButton";



import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
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
    Col,
} from "react-bootstrap";

import '../assets/css/addData.css'
import ProfileLoader from "../components/Loaders/ProfileLoader";
import UpdateLoader from "../components/Loaders/UpdateLoader";


const BusProfileUpdate=({match})=> {
    const dispatch= useDispatch();
    const busProfile=useSelector(state=>state.busProfile)
    const updatedBusProfile=useSelector(state=>state.updatedBus)

    const {bus,loading,error}=busProfile;
    const{updateLoading, updatedBus}=updatedBusProfile;

    const[busNumber,setBusNumber] =useState(null);
    const[registrationNumber,setRegistrationNumber] =useState(null);
    const [profile, setProfile]=useState('')
    const [fitnessReport, setFitnessReport]=useState('')
    const [registrationCard, setRegistrationCard]=useState('')
    const[manufacturer,setManufacturer]=useState(null)
    const[model,setModel]=useState(null)
    const [purchaseDate, setPurchaseDate]=useState(null)



    const onSubmitHandler= (e)=>{
        console.log("hi")
        e.preventDefault();
        const data={
            busNumber,registrationNumber,manufacturer,model,purchaseDate,
            registrationCard:registrationCard===''? bus.registrationCard: registrationCard[0].getFileEncodeBase64String(),
            fitnessReport:fitnessReport===''? bus.fitnessReport: fitnessReport[0].getFileEncodeBase64String(),
            photo:profile===''? bus.photo: profile[0].getFileEncodeBase64String(),
            photoType:profile===''?bus.photoType: profile[0].fileType,
        }
        dispatch(updateBus(bus._id,data))
    }

    useEffect(()=>{
        dispatch(getBus(match.params.id))

    },[dispatch,updatedBus])

    const showProfile=()=>{
        if(bus!==undefined)
        {
            if(updateLoading===true)
                return <UpdateLoader/>
            else
                return (
                <Container fluid>
                    <Row>
                        <Col md="8">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">{bus.registrationNumber} Profile</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Form onSubmit={(e)=>{onSubmitHandler(e)}}>
                                        <Row>
                                            <Col className="pr-1" md="5">
                                                <Form.Group>
                                                    <label>Bus Registration Number</label>
                                                    <Form.Control
                                                        required='true'
                                                        onChange={(e)=>{setRegistrationNumber(e.target.value)}}
                                                        value={registrationNumber===null? bus.registrationNumber : registrationNumber}
                                                        placeholder="APX-XXX"
                                                        type="string"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="px-1" md="3">
                                                <Form.Group>
                                                    <label>Manufacturer</label>
                                                    <Form.Control
                                                        required='true'
                                                        placeholder="Daewoo"
                                                        type="text"
                                                        onChange={(e)=>setManufacturer(e.target.value)}
                                                        value={manufacturer===null ? bus.manufacturer :manufacturer}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pl-1" md="4">
                                                <Form.Group>
                                                    <label>
                                                        Model
                                                    </label>
                                                    <Form.Control
                                                        required='true'
                                                        placeholder="1998"
                                                        type="email"
                                                        onChange={(e)=>setModel(e.target.value)}
                                                        value={model===null? bus.model : model}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-1" md="4">
                                                <Form.Group>
                                                    <label>Purchase Date</label>
                                                    <Form.Control
                                                        required='true'
                                                        onChange={(e)=>setPurchaseDate(e.target.value)}
                                                        value={purchaseDate===null? bus.purchaseDate : purchaseDate}
                                                        type="date"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pl-1" md="4">
                                                <Form.Group>
                                                    <label>Bus Number</label>
                                                    <Form.Control
                                                        required='true'
                                                        placeholder='3'
                                                        onChange={(e)=>setBusNumber(e.target.value)}
                                                        value={busNumber===null ? bus.busNumber : busNumber}
                                                        type="number"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pl-3" md="4">
                                                <FilePond
                                                    allowMultiple={false}
                                                    labelIdle='Bus Image <span class="filepond--label-action">Browse</span>'
                                                    imageResizeTargetHeight={150}
                                                    imageResizeTargetWidth={150}
                                                    files={profile}
                                                    onupdatefiles={setProfile}
                                                    maxFileSize='100KB'
                                                />
                                            </Col>
                                            <Col className="pl-3" md="4">
                                                <FilePond
                                                    acceptedFileTypes={['application/pdf']}
                                                    allowMultiple={false}
                                                    labelIdle='Bus Registration Card <span class="filepond--label-action">Browse</span>'
                                                    files={registrationCard}
                                                    onupdatefiles={setRegistrationCard}
                                                    maxFileSize='500KB'
                                                />
                                            </Col>
                                            <Col className="pl-3" md="4">
                                                <FilePond
                                                    allowMultiple={false}
                                                    acceptedFileTypes={['application/pdf']}
                                                    labelIdle='Bus Fitness report <span class="filepond--label-action">Browse</span>'
                                                    files={fitnessReport}
                                                    onupdatefiles={setFitnessReport}
                                                    maxFileSize='500KB'
                                                />
                                            </Col>
                                        </Row>
                                        <LoginButton
                                            className="pull-right"
                                            onClick={(e) => {
                                                onSubmitHandler(e)
                                            }}
                                            width={200}
                                            content="Update Profile"
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
                                    <Card.Body>
                                        <div className="author">
                                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                {
                                                    profile === '' ?
                                                        <img
                                                            style={{width:'auto', height:'auto'}}
                                                            alt="check"
                                                            className="avatar border-gray"
                                                            src={`data:${bus.photoType};charset=utf8;base64,${Buffer.from(bus.photo).toString('ascii')}`}
                                                        ></img>
                                                        : profile[0] !==undefined? <img
                                                            style={{width:'auto', height:'auto'}}
                                                            alt="check"
                                                            className="avatar border-gray"
                                                            src={`data:${profile[0].fileType};charset=utf8;base64,${profile[0].getFileEncodeBase64String()}`}
                                                        ></img> : ''
                                                }
                                                <h5 className="title">{registrationNumber}</h5>
                                            </a>
                                            <p className="description">{model} {manufacturer}</p>
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
    }

    return (
        <>
            {loading === true ? <ProfileLoader/> : showProfile()}
        </>
    );
}

export default BusProfileUpdate;
