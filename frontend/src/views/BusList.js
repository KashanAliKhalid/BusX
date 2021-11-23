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
import {busList,deleteBus} from '../actions/busActions'
import SimpleLoader from '../components/Loaders/SimpleLoader'
import DeleteLoader from '../components/Loaders/DeleteLoader'


const BusList=({history, location})=>{
    const dispatch= useDispatch()
    const busListData =useSelector(state=>state.busList)
    const deleted =useSelector(state=>state.busDelete)



    const{loading,error,buses}=busListData
    const{success,deleting}=deleted
    const [currentPage, setCurrentPage] = useState(1);
    const[search, setSearch]=useState('')




    const handleDelete=(id)=>{
        dispatch(deleteBus(id))
    }


    useEffect(()=>{
        if(location.search){
            dispatch(busList(location.pathname+location.search))
        }
        else{
            dispatch(busList(location.pathname))
        }



    },[location,dispatch,success])

    const handleSearch= (value,event)=>{
        setCurrentPage(1)
        setSearch(value)
        if(value!=='')
            history.push(`/admin/data/buslist?search=${value}`)
        else{
            history.push(`/admin/data/buslist`)
        }
    }

    const pageChangeHandler=(page)=>{
        setCurrentPage(page);
        if(search==='')
        {
            history.push(`/admin/data/buslist?page=${page}`)
        }
        else{
            history.push(`/admin/data/buslist?search=${search}&page=${page}`)
        }
    }

    const divert=(id)=>{
        if(location.pathname.toString().includes('data'))
        {
            history.push(`/admin/data/busprofile/${id}`)
        }
        else{
            history.push(`/admin/busprofile/${id}`)
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
                        buses===undefined? '' : buses.buses.map(bus =>{
                            return(
                                <div key={bus._id}  className='table-entry'>
                                    <Row  className='justify-content-center flex-row align-items-center' >
                                        <Col xs={10} md={1}>
                                            <img style={{objectFit:'contain'}} className='img-thumbnail ' width={100} height={100}
                                                 src={`data:${bus.photoType};charset=utf8;base64,${Buffer.from(bus.photo).toString('ascii')}`} />

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
                                                <span>{bus.registrationNumber} </span><br/>
                                                <span>Bus Number:{bus.busNumber}</span>
                                            </p>

                                        </Col>
                                        <Col className=' d-flex justify-content-end' xs={6} md={4}>

                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip id="tooltip-829164576">Remove</Tooltip>
                                                }
                                            >
                                                <Button onClick={()=>{handleDelete(bus._id)}}  size='sm' className='btn-fill btn-padding btn-margin' variant="danger"><i className=" far fa-trash-alt fa-2x "> </i></Button>
                                            </OverlayTrigger>


                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip id="tooltip-829164576">Profile</Tooltip>
                                                }
                                            >
                                                <Button onClick={()=>{divert(bus._id)}} size='sm'  className='btn-fill btn-padding' variant="primary"><i className=" icon-margin far fa-id-card fa-2x "> </i></Button>
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
                        buses===undefined? '' : (<Pagination
                            current={buses.page}
                            total={buses.pages}
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

export default BusList;
