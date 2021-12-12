import React from "react";
import { useState,useEffect } from "react";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import {useDispatch, useSelector} from "react-redux";
import {addMaintenance,getMaintenance} from "../actions/maintenanceActions";

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
import SimpleLoader from "../components/Loaders/SimpleLoader";
import { Page,pdfjs } from 'react-pdf';
import { Document } from 'react-pdf/dist/esm/entry.webpack';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const MaintenanceDetails=({match})=> {
    const dispatch= useDispatch();
    const {maintenance,loading,error}=useSelector(state=>state.maintenanceDetails)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }


    useEffect(()=>{
        dispatch(getMaintenance(match.params.id))
    },[dispatch])

    const loadContent=()=>{
        if(maintenance)
            return (
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Add Maintenance Record</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col className="pr-1" md="5">
                                            <Form.Group>
                                                <label>Amount</label>
                                                <Form.Control
                                                    required='true'
                                                    value={maintenance.amount}
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
                                                    value={maintenance.maintenanceDate}
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
                                                    value={maintenance.details}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>

                                    </Row>
                                    <div className="clearfix"></div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Document onLoadSuccess={onDocumentLoadSuccess} file={`data:application/pdf;base64,${Buffer.from(maintenance.receipt).toString('ascii')}`} >
                            <Page pageNumber={pageNumber} />
                        </Document>
                    </Col>

                </Row>
            </Container>
        )
    }


    return (

        <>
            {loading ? <SimpleLoader/> : loadContent()}
        </>
    );
};

export default MaintenanceDetails;
