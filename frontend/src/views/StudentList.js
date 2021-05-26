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
} from "react-bootstrap";

import  '../assets/css/studentList.css'
import Pagination from 'react-responsive-pagination';
import 'font-awesome/css/font-awesome.min.css';
import {studentList} from '../actions/studentActions'
import SimpleLoader from '../components/Loaders/SimpleLoader'

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
    const{loading,error,students}=listStudent


    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);

    const [fee, setFee] = useState(feeStatus.paid)
    const[search, setSearch]=useState('')




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



    },[location,dispatch])
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
        return(
            <Container fluid>
                <SearchField
                    placeholder="Search Name"
                    classNames="search"
                    onEnter={handleSearch}
                />
                {

                    students===undefined? '' : students.students.map(student =>{
                        return(

                            <div key={student._id}  className='table-entry'>
                                <Row className='justify-content-center flex-row align-items-center' >

                                    <Col  xs={12} md={1}>
                                        <img className='img-thumbnail' width={70} height={70} src={
                                            require("assets/img/faces/face-1.jpg")
                                                .default
                                        }/>
                                    </Col>
                                    <Col xs={6} md={7}>
                                        <p>
                                            <span>{student.firstName} { student.lastName}</span><br/>
                                            <span>{student.regNo}</span>
                                        </p>

                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Button data-toggle="tooltip" data-placement="top" title="Delete student" size='sm' className='btn-fill btn-padding btn-margin' variant="danger"><i className=" far fa-trash-alt fa-2x "> </i></Button>
                                        <Button onClick={feeHandler} data-toggle="tooltip" data-placement="top" title={fee.text} size='sm'  className='btn-fill btn-padding btn-margin' variant={fee.button}><i className={`icon-margin ${fee.icon} fa-2x`}> </i></Button>
                                        <Button data-toggle="tooltip" data-placement="top" title="Profile" size='sm'  className='btn-fill btn-padding' variant="primary"><i className=" icon-margin far fa-id-card fa-2x "> </i></Button>

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
};

export default StudentList;
