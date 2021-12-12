import React, {useEffect, useState} from 'react';
import {
    Button,
    Container,
    Row,
    Col,
    Form, Tooltip, OverlayTrigger,
} from "react-bootstrap";
import YellowButton from "../components/Buttons/YellowButton";

import  '../assets/css/list.css'
import Pagination from 'react-responsive-pagination';
import 'font-awesome/css/font-awesome.min.css';
import MaintenanceLogo from '../assets/img/maintenance.png'
import {maintenanceList,deleteMaintenance} from '../actions/maintenanceActions'
import {useDispatch, useSelector} from "react-redux";
import DeleteLoader from "../components/Loaders/DeleteLoader";
import SimpleLoader from "../components/Loaders/SimpleLoader";
import {getBus,updateBus} from '../actions/busActions.js';


    const MaintenanceList=({history, location,match})=>{
        const dispatch= useDispatch()
        const {loading,error,maintenance} =useSelector(state=>state.maintenanceList)
        const {success,deleting} =useSelector(state=>state.maintenanceDelete)
        const {bus}=useSelector(state=>state.busProfile)


        const [currentPage, setCurrentPage] = useState(1);
        const[search, setSearch]=useState('')




        const handleDelete=(id)=>{
            dispatch(deleteMaintenance(id))
        }


        useEffect(()=>{
            if(bus) {
                dispatch(maintenanceList(`/admin/maintenancelist/${bus._id}`))
            }
            else{
                dispatch(getBus(match.params.id))

            }



        },[location,dispatch,success,bus])


        const pageChangeHandler=(page)=>{
            setCurrentPage(page);
                history.push(`/admin/maintenancelist/${bus._id}?page=${page}`)
        }



        const list=()=>{
            if(deleting===true)
            {
                setTimeout(function(){return; }, 2000);
                return <DeleteLoader/>
            }
            else
                return(

                    <Container fluid>
                        <Row>
                            <Col className="ml-xs-2" xs={3} md={2}>
                                <YellowButton onClick={()=>{history.push('/admin/addmaintenance')}} content=" Add Record"/>
                            </Col>


                        </Row>
                        {

                            maintenance===undefined? '' : maintenance.maintenance.map(value =>{
                                return(
                                    <div key={value._id}  className='table-entry'>
                                        <Row  className='justify-content-center flex-row align-items-center' >
                                            <Col xs={10} md={1}>
                                                <img style={{objectFit:'contain'}} className='img-thumbnail ' width={100} height={100}
                                                     src={MaintenanceLogo} />

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
                                                    <span>Amount:{value.amount} </span><br/>
                                                    <span>Date:{value.maintenanceDate}</span>
                                                </p>

                                            </Col>
                                            <Col className=' d-flex justify-content-end' xs={6} md={4}>

                                                <OverlayTrigger
                                                    overlay={
                                                        <Tooltip id="tooltip-829164576">Remove</Tooltip>
                                                    }
                                                >
                                                    <Button onClick={()=>{handleDelete(value._id)}}  size='sm' className='btn-fill btn-padding btn-margin' variant="danger"><i className=" far fa-trash-alt fa-2x "> </i></Button>
                                                </OverlayTrigger>


                                                <OverlayTrigger
                                                    overlay={
                                                        <Tooltip id="tooltip-829164576">Profile</Tooltip>
                                                    }
                                                >
                                                    <Button onClick={()=>{history.push(`/admin/maintenancedetails/${value._id}`)}} size='sm'  className='btn-fill btn-padding' variant="primary"><i className=" icon-margin far fa-id-card fa-2x "> </i></Button>

                                                </OverlayTrigger>
                                            </Col>
                                            <Col md={1} className='d-none d-md-block'>
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
                                        </Row>
                                    </div>
                                )
                            })

                        }
                        {
                            maintenance===undefined? '' : (<Pagination
                                current={maintenance.page}
                                total={maintenance.pages}
                                onPageChange={pageChangeHandler}
                            />)
                        }

                    </Container>
                )
        }

        return (
            <>
                {
                    (loading==true || !bus)? <SimpleLoader/> : list()
                }
            </>
        );
    }

    export default MaintenanceList;


