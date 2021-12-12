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
import SimpleLoader from '../components/Loaders/SimpleLoader'
import DeleteLoader from '../components/Loaders/DeleteLoader'
import {complaintList} from "../actions/complaintActions";
import complaintImg from '../assets/img/complaint.png'


const ComplaintList=({history, location})=>{
    const dispatch= useDispatch()
    const {loading,error,complaints} =useSelector(state=>state.complaintList)
    const [currentPage, setCurrentPage] = useState(1);



    useEffect(()=>{
            dispatch(complaintList(location.pathname))
    },[location,dispatch])

    const pageChangeHandler=(page)=>{
        setCurrentPage(page);
        history.push(`/admin/complaints?page=${page}`)
    }


    const list=()=>{
            return(

                <Container fluid>

                    {
                        complaints===undefined? '' : complaints.complaints.map(complaint =>{
                            return(
                                <div key={complaint._id}  className='table-entry'>
                                    <Row  className='justify-content-center flex-row align-items-center' >
                                        <Col xs={10} md={1}>
                                            <img style={{objectFit:'contain'}} className='img-thumbnail ' width={100} height={100}
                                                 src={complaintImg} />

                                        </Col>
                                        <Col xs={3} className='d-md-none'>
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
                                                <span>Subject: {complaint.subject} </span><br/>
                                                <span>{complaint.description}</span><br/>
                                                <span>{`${complaint.date}-${complaint.month}-${complaint.year}`}</span>
                                            </p>

                                        </Col>
                                        <Col className=' d-flex justify-content-end' xs={6} md={4}>


                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip id="tooltip-829164576">Student Profile</Tooltip>
                                                }
                                            >
                                                <Button onClick={()=>{history.push(`/admin/data/studentprofile/${complaint.student}`)}} size='sm'  className='btn-fill btn-padding' variant="primary"><i className=" icon-margin far fa-id-card fa-2x "> </i></Button>
                                            </OverlayTrigger>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })

                    }
                    {
                        complaints===undefined? '' : (<Pagination
                            current={complaints.page}
                            total={complaints.pages}
                            onPageChange={pageChangeHandler}
                        />)
                    }

                </Container>
            )
    }

    return (
        <>
            {
                loading==true? <SimpleLoader/> : list()
            }
        </>
    );
}

export default ComplaintList;
