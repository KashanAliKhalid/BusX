import React,{useState,useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios'

// react-bootstrap components
import SearchField from "react-search-field";
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
    Form, Tooltip, OverlayTrigger,
} from "react-bootstrap";

import  '../assets/css/list.css'
import Pagination from 'react-responsive-pagination';
import 'font-awesome/css/font-awesome.min.css';
import {studentList,deleteStudent} from '../actions/studentActions'
import SimpleLoader from '../components/Loaders/SimpleLoader'
import DeleteLoader from '../components/Loaders/DeleteLoader'


const BusStudentList=({history, location})=>{
    const feeStatus={
        paid:{
            icon:'far fa-check-circle',
            button:'success',
            text:'Fee paid'
        },
        notPaid:{
            icon:' far fa-times-circle',
            button:'danger',
            text:'Fee not paid'
        }

    }
    const {bus,loading,error}=useSelector(state=>state.busProfile)



    const [fee, setFee] = useState(feeStatus.paid)

    const feeHandler=()=>{
        if(fee.button==='danger')
        {
            setFee(feeStatus.paid)
        }else
        {
            setFee(feeStatus.notPaid)
        }
    }





    const list=()=>{
            return(

                <Container fluid>
                    {
                        bus===undefined? '' : bus.students.map(student =>{
                            return(

                                <div key={student._id}  className='table-entry'>
                                    <Row  className=' click justify-content-center flex-row align-items-center' >
                                        <Col className='click'   xs={10} md={1}>
                                            <img className='img-thumbnail click' width={100} height={100}
                                                 src={`data:${student.photoType};charset=utf8;base64,${Buffer.from(student.photo).toString('ascii')}`} />

                                        </Col>
                                        <Col className='click' xs={2} className='d-md-none'>
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
                                        <Col className='click' xs={6} md={6}>
                                            <p className='click'>
                                                <span>{student.firstName} { student.lastName}</span><br/>
                                                <span>{student.regNo}</span>
                                            </p>

                                        </Col>
                                        <Col className=' d-flex justify-content-end' xs={6} md={4}>


                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip id="tooltip-829164576">{fee.text}</Tooltip>
                                                }
                                            >
                                                <Button onClick={feeHandler}  size='sm'  className='btn-fill btn-padding btn-margin' variant={fee.button}><i className={`icon-margin ${fee.icon} fa-2x`}> </i></Button>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip id="tooltip-829164576">Profile</Tooltip>
                                                }
                                            >
                                                <Button onClick={()=>{history.push(`/admin/data/studentprofile/${student._id}`)}} size='sm'  className='btn-fill btn-padding' variant="primary"><i className=" icon-margin far fa-id-card fa-2x "> </i></Button>
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

export default BusStudentList;
