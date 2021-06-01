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
import {driverList,deleteDriver} from '../actions/driverActions'
import SimpleLoader from '../components/Loaders/SimpleLoader'
import DeleteLoader from '../components/Loaders/DeleteLoader'


const DriverList=({history, location})=>{

    const dispatch= useDispatch()
    const driverListData =useSelector(state=>state.driverList)
    const deleted =useSelector(state=>state.driverDelete)



    const{loading,error,drivers}=driverListData
    const{success,deleting}=deleted
    const [currentPage, setCurrentPage] = useState(1);
    const[search, setSearch]=useState('')




    const handleDelete=(id)=>{
        dispatch(deleteDriver(id))
    }


    useEffect(()=>{
        if(location.search){
            dispatch(driverList(location.pathname+location.search))
        }
        else{
            dispatch(driverList(location.pathname))
        }



    },[location,dispatch,success])
    const handleSearch= (value,event)=>{
        setCurrentPage(1)
        setSearch(value)
        if(value!=='')
            history.push(`/admin/data/driverlist?search=${value}`)
        else{
            history.push(`/admin/data/driverlist`)
        }
    }

    const pageChangeHandler=(page)=>{
        setCurrentPage(page);
        if(search==='')
        {
            history.push(`/admin/data/driverlist?page=${page}`)
        }
        else{
            history.push(`/admin/data/driverlist?search=${search}&page=${page}`)
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
                        drivers===undefined? '' : drivers.drivers.map(driver =>{
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
                                                    <Tooltip id="tooltip-829164576">Remove</Tooltip>
                                                }
                                            >
                                                <Button onClick={()=>{handleDelete(driver._id)}}  size='sm' className='btn-fill btn-padding btn-margin' variant="danger"><i className=" far fa-trash-alt fa-2x "> </i></Button>
                                            </OverlayTrigger>


                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip id="tooltip-829164576">Profile</Tooltip>
                                                }
                                            >
                                                <Button onClick={()=>{history.push(`/admin/data/driverprofile/${driver._id}`)}} size='sm'  className='btn-fill btn-padding' variant="primary"><i className=" icon-margin far fa-id-card fa-2x "> </i></Button>
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
                        drivers===undefined? '' : (<Pagination
                            current={drivers.page}
                            total={drivers.pages}
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

export default DriverList;
