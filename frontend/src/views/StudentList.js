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


const StudentList=({history, location})=>{
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
    const dispatch= useDispatch()
    const listStudent =useSelector(state=>state.studentList)
    const deleted =useSelector(state=>state.studentDelete)

    const{loading,error,students}=listStudent
    const{success,deleting}=deleted

    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);

    const [fee, setFee] = useState(feeStatus.paid)
    const[search, setSearch]=useState('')




    const handleDelete=(id)=>{
        dispatch(deleteStudent(id))
    }

    const feeHandler=()=>{
        if(fee.button==='danger')
        {
            setFee(feeStatus.paid)
        }else
        {
            setFee(feeStatus.notPaid)
        }
    }

    useEffect(()=>{
        if(location.search){
            dispatch(studentList(location.pathname+location.search))
        }
        else{
            dispatch(studentList(location.pathname))
        }
        if(students)
        {

        }



    },[location,dispatch,success])
    const handleSearch= (value,event)=>{
        setCurrentPage(1)
        setSearch(value)
        if(value!=='')
            history.push(`/admin/data/studentlist?search=${value}`)
        else{
            history.push(`/admin/data/studentlist`)
        }
    }

    const pageChangeHandler=(page)=>{
        setCurrentPage(page);
        if(search==='')
        {
            history.push(`/admin/data/studentlist?page=${page}`)
        }
        else{
            history.push(`/admin/data/studentlist?search=${search}&page=${page}`)
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
                    // {


                        students===undefined? '' : students.students.map(student =>{
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
                                                <Tooltip id="tooltip-829164576">Remove</Tooltip>
                                            }
                                        >
                                        <Button onClick={()=>{handleDelete(student._id)}}  size='sm' className='btn-fill btn-padding btn-margin' variant="danger"><i className=" far fa-trash-alt fa-2x "> </i></Button>
                                        </OverlayTrigger>

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
                    students===undefined? '' : (<Pagination
                        current={students.page}
                        total={students.pages}
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

export default StudentList;
