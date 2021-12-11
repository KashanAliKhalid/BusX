import React from "react";
import { useState,useEffect } from "react";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import {useDispatch, useSelector} from "react-redux";
import {addBus} from '../actions/busActions.js';
import {routeList} from '../actions/routeActions'
import {driverList} from '../actions/driverActions'

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
import YellowButton from "../components/Buttons/YellowButton";


const AddBus=({match})=> {
    const dispatch= useDispatch();
    const addedBus=useSelector(state=>state.addedBus)
    const {routes} =useSelector(state=>state.routeList)
    const {drivers} =useSelector(state=>state.driverList)
    const {userInfo} =useSelector(state=>state.userLogin)
    const {bus,loading,error}=addedBus;

    const[busNumber,setBusNumber] =useState('');
    const[registrationNumber,setRegistrationNumber] =useState('');
    const [profile, setProfile]=useState('')
    const [fitnessReport, setFitnessReport]=useState('')
    const [registrationCard, setRegistrationCard]=useState('')
    const[manufacturer,setManufacturer]=useState('')
    const[model,setModel]=useState('')
    const [purchaseDate, setPurchaseDate]=useState('')
    const [driver, setDriver]=useState('')
    const [route, setRoute]=useState('')



    const onSubmitHandler= (e)=>{
        e.preventDefault();
        const data={
            busNumber,registrationNumber,manufacturer,model,purchaseDate,route,driver,
            registrationCard:registrationCard[0].getFileEncodeBase64String(),
            fitnessReport:fitnessReport[0].getFileEncodeBase64String(),
            photo:profile===undefined?'':profile[0].getFileEncodeBase64String(),
            photoType:profile===undefined?'':profile[0].fileType,
            institute:userInfo.institute
        }
        dispatch(addBus(data))
    }

    useEffect(()=>{

            dispatch(routeList())
            dispatch(driverList())



    },[dispatch])

    return (
        <>

            <Container fluid>
                <Row>
                    <Col md="8">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Add Bus</Card.Title>
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
                                                    value={registrationNumber}
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
                                                    value={manufacturer}
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
                                                    type="number"
                                                    onChange={(e)=>setModel(e.target.value)}
                                                    value={model}
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
                                                    value={purchaseDate}
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
                                                    value={busNumber}
                                                    type="number"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col className="pl-1" md="4">
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Driver Name</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={driver}
                                                    required={true}
                                                    onChange={e=>{
                                                        setDriver(e.target.value)
                                                    }}
                                                >
                                                    <option value=""></option>
                                                    {
                                                        !drivers?'': drivers.drivers.map((value)=>{
                                                            return(<option value={value._id}>{`${value.firstName} ${value.lastName}`}</option>)
                                                        })
                                                    }
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col className="pl-3" md="4">
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Route Number</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={route}
                                                    required={true}
                                                    onChange={e=>{
                                                        console.log(e.target.value)
                                                        setRoute(e.target.value)
                                                    }}
                                                >
                                                    <option value=""></option>
                                                    {
                                                        !routes?'': routes.routes.map((value)=>{
                                                            return(<option value={value._id}>{value.name}</option>)
                                                        })
                                                    }


                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pl-3" md="4">
                                            <FilePond
                                                required={true}
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
                                                required={true}
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
                                                required={true}
                                                allowMultiple={false}
                                                acceptedFileTypes={['application/pdf']}
                                                labelIdle='Bus Fitness report <span class="filepond--label-action">Browse</span>'
                                                files={fitnessReport}
                                                onupdatefiles={setFitnessReport}
                                                maxFileSize='500KB'
                                            />
                                        </Col>
                                    </Row>
                                    <YellowButton
                                        className="pull-right"
                                        type="submit"
                                        width={200}
                                        content="Add Bus"
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
                                                    style={{width:'auto',height:'auto'}}
                                                    alt="check"
                                                    className="avatar border-gray"
                                                    src={`data:${profile[0].fileType};charset=utf8;base64,${profile[0].getFileEncodeBase64String()}`}
                                                ></img>
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
        </>
    );
}

export default AddBus;
