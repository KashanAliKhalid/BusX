import React from "react";
import { useState,useEffect } from "react";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import {useDispatch, useSelector} from "react-redux";
import {addMaintenance} from "../actions/maintenanceActions";

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
    Col, Alert,
} from "react-bootstrap";

import '../assets/css/addData.css'
import YellowButton from "../components/Buttons/YellowButton";


const AddMaintenance=({match})=> {
    const dispatch= useDispatch();
    const {maintenance,loading,error}=useSelector(state=>state.addedMaintenance)
    const {bus}=useSelector(state=>state.busProfile)

    const[amount,setAmount] =useState('');
    const[maintenanceDate,setMaintenanceDate] =useState('');
    const [details, setDetails] = useState('');
    const [receipt, setReceipt]=useState('')
    const [alertBox,setAlertBox] = useState(true)



    const onSubmitHandler= (e)=>{
        e.preventDefault();
        const data={
            receipt:receipt[0].getFileEncodeBase64String(),amount,maintenanceDate,details,
            bus:bus._id
        }
        dispatch(addMaintenance(data))
    }

    const showAlert=()=>{
        if(error) {
            if(alertBox)
                return (
                    <Alert variant="danger" onClose={() => setAlertBox(false)} dismissible>
                        <Alert.Heading>Bus not added!</Alert.Heading>
                    </Alert>
                )
        }
    }

    return (
        <>

            <Container fluid>

                {
                    showAlert()
                }
                <Row>
                    <Col md="12">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Add Maintenance Record</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={(e)=>{onSubmitHandler(e)}}>
                                    <Row>
                                        <Col className="pr-1" md="5">
                                            <Form.Group>
                                                <label>Amount</label>
                                                <Form.Control
                                                    required='true'
                                                    onChange={(e)=>{setAmount(e.target.value)}}
                                                    value={amount}
                                                    type="number"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="px-1" md="3">
                                            <Form.Group>
                                                <label>Maintenance Date</label>
                                                <Form.Control
                                                    required='true'
                                                    type="date"
                                                    onChange={(e)=>setMaintenanceDate(e.target.value)}
                                                    value={maintenanceDate}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="4">
                                            <Form.Group>
                                                <label>
                                                    Details
                                                </label>
                                                <Form.Control
                                                    required='true'
                                                    as='textarea'
                                                    onChange={(e)=>setDetails(e.target.value)}
                                                    value={details}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col className="pl-3" md="4">
                                            <FilePond
                                                required={true}
                                                allowMultiple={false}
                                                labelIdle='Receipt <span class="filepond--label-action">Browse</span>'
                                                acceptedFileTypes={['application/pdf']}
                                                imageResizeTargetHeight={150}
                                                imageResizeTargetWidth={150}
                                                files={receipt}
                                                onupdatefiles={setReceipt}
                                                maxFileSize='500KB'
                                            />
                                        </Col>
                                    </Row>
                                    <YellowButton
                                        className="pull-right"
                                        type="submit"
                                        width={200}
                                        content="Add Record"
                                    />
                                    <div className="clearfix"></div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AddMaintenance;
