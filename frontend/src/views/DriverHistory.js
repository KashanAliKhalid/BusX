import React,{useState,useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

// react-bootstrap components
import SearchField from "react-search-field";
import {
    Button,
    Container,
    Row,
    Col,
    Form, Tooltip, OverlayTrigger,
} from "react-bootstrap";

import  '../assets/css/list.css'
import Pagination from 'react-responsive-pagination';
import 'font-awesome/css/font-awesome.min.css';


const DriverHistory=({history, location})=>{

    const dispatch= useDispatch()
    const {bus,loading,error}=useSelector(state=>state.busProfile)
    const {updateLoading, updatedBus}=useSelector(state=>state.updatedBus)
    const drivers=updatedBus?updatedBus.driverHistory :bus.driverHistory



    const list=()=>{
            return(

                <Container fluid>
                    {
                        drivers===undefined? '' : drivers.map(driver =>{
                            return(
                                <div key={driver._id}  className='table-entry'>
                                    <Row  className='justify-content-center flex-row align-items-center' >
                                        <Col xs={10} md={1}>
                                            <img style={{objectFit:'contain'}} className='img-thumbnail ' width={100} height={100}
                                                 src={`data:${driver.photoType};charset=utf8;base64,${Buffer.from(driver.photo).toString('ascii')}`} />

                                        </Col>
                                        <Col xs={2} className='d-md-none'>
                                            <Form.Check className='checkbox'>
                                                <Form.Check.Label>
                                                    <Form.Check.Input
                                                        type="checkbox"
                                                        onClick={(e)=>{console.log(e.target.checked)}}
                                                    ></Form.Check.Input>
                                                    <span className="form-check-sign"></span>
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </Col>
                                        <Col  xs={6} md={6}>
                                            <p >
                                                <span>{driver.firstName} {driver.lastName} </span><br/>
                                                <span>{driver.cnic}</span>
                                            </p>

                                        </Col>
                                        <Col className=' d-flex justify-content-end' xs={6} md={4}>


                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip id="tooltip-829164576">Profile</Tooltip>
                                                }
                                            >
                                                <Button onClick={()=>{history.push(`/admin/data/driverprofile/${driver._id}`)}} size='sm'  className='btn-fill btn-padding' variant="primary"><i className=" icon-margin far fa-id-card fa-2x "> </i></Button>
                                            </OverlayTrigger>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })

                    }

                </Container>
            )
    }

    return (
        <>
            {
                list()
            }
        </>
    );
}

export default DriverHistory;
