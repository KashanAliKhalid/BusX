import React, {useEffect, useState} from 'react';
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
import {routeList,deleteRoute} from '../actions/routeActions'
import {useDispatch, useSelector} from "react-redux";
import DeleteLoader from "../components/Loaders/DeleteLoader";

const RouteList = ({history, location}) => {
    const dispatch= useDispatch()
    const routeListData =useSelector(state=>state.routeList)
    const deleted =useSelector(state=>state.routeDelete)

    const{loading,error,routes}=routeListData
    const{success,deleting}=deleted
    const [currentPage, setCurrentPage] = useState(1);
    const[search, setSearch]=useState('')

    const handleDelete=(id)=>{
        dispatch(deleteRoute(id))
    }

    useEffect(()=>{
        if(location.search){
            dispatch(routeList(location.pathname+location.search))
        }
        else{
            dispatch(routeList(location.pathname))
        }



    },[location,dispatch,success])

    const handleSearch= (value,event)=>{
        setCurrentPage(1)
        setSearch(value)
        if(value!=='')
            history.push(`/admin/routes?search=${value}`)
        else{
            history.push(`/admin/routes`)
        }
    }

    const pageChangeHandler=(page)=>{
        setCurrentPage(page);
        if(search==='')
        {
            history.push(`/admin/routes?page=${page}`)
        }
        else{
            history.push(`/admin/routes?search=${search}&page=${page}`)
        }
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
                    <SearchField
                        placeholder="Search Name"
                        classNames="search"
                        onEnter={handleSearch}
                    />
                    {
                        routes===undefined? '' : routes.routes.map(route =>{
                            return(
                                <div key={route._id}  className='table-entry'>
                                    <Row  className='justify-content-center flex-row align-items-center' >
                                        <Col xs={10} md={1}>
                                            {/*<img style={{objectFit:'contain'}} className='img-thumbnail ' width={100} height={100}*/}
                                            {/*     src={`data:${bus.photoType};charset=utf8;base64,${Buffer.from(bus.photo).toString('ascii')}`} />*/}

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
                                                <span>{route.name} </span><br/>
                                                <span>Routes:{route.stops.length}</span>
                                            </p>

                                        </Col>
                                        <Col className=' d-flex justify-content-end' xs={6} md={4}>

                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip id="tooltip-829164576">Remove</Tooltip>
                                                }
                                            >
                                                <Button onClick={()=>{handleDelete(route._id)}}  size='sm' className='btn-fill btn-padding btn-margin' variant="danger"><i className=" far fa-trash-alt fa-2x "> </i></Button>
                                            </OverlayTrigger>


                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip id="tooltip-829164576">Profile</Tooltip>
                                                }
                                            >
                                                <Button onClick={()=>{history.push(`/admin/data/busprofile/${route._id}`)}} size='sm'  className='btn-fill btn-padding' variant="primary"><i className=" icon-margin far fa-id-card fa-2x "> </i></Button>
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
                        routes===undefined? '' : (<Pagination
                            current={routes.page}
                            total={routes.pages}
                            onPageChange={pageChangeHandler}
                        />)
                    }

                </Container>
            )
    }


    return (
        <div>

        </div>
    );
};

export default RouteList;
