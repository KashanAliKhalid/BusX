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

import  '../../assets/css/list.css'
import paymentImage from  '../../assets/img/payment.png'
import Pagination from 'react-responsive-pagination';
import 'font-awesome/css/font-awesome.min.css';
import {paymentList,deletePayment} from '../../actions/paymentActions'
import SimpleLoader from '../../components/Loaders/SimpleLoader'
import DeleteLoader from '../../components/Loaders/DeleteLoader'
import YellowButton from "../../components/Buttons/YellowButton";


const Payments=({history, location})=>{
    const dispatch= useDispatch()
    const {loading,error,payments} =useSelector(state=>state.paymentList)
    const {success,deleting}=useSelector(state=>state.paymentDelete)

    const [currentPage, setCurrentPage] = useState(1);




    const handleDelete=(id)=>{
        dispatch(deletePayment(id))
    }


    useEffect(()=>{
        if(location.search){
            dispatch(paymentList(location.pathname+location.search))
        }
        else{
            dispatch(paymentList(location.pathname))
        }



    },[location,dispatch,success])


    const pageChangeHandler=(page)=>{
        setCurrentPage(page);
            history.push(`/superadmin/payments?page=${page}`)
    }



    const list=()=>{
        if(deleting===true)
        {
            // setTimeout(function(){return; }, 2000);
            return <DeleteLoader/>
        }
        else
            return(

                <Container fluid>
                    <Row>
                        <Col xs={9} md={10}>
                        </Col>
                        <Col className="ml-xs-2" xs={3} md={2}>
                            <YellowButton onClick={()=>{history.push('/superadmin/addpayment')}} content=" Add Payment"/>
                        </Col>


                    </Row>
                    {
                        payments===undefined? '' : payments.payments.map(payment =>{
                            return(
                                <div key={payment._id}  className='table-entry'>
                                    <Row  className='justify-content-center flex-row align-items-center' >
                                        <Col xs={10} md={1}>
                                            <img style={{objectFit:'contain'}} className='img-thumbnail ' width={100} height={100}
                                                 src={paymentImage} />

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
                                                <span>{payment.institute.institute} </span><br/>
                                                <span>{payment.amount}</span>
                                            </p>

                                        </Col>
                                        <Col className=' d-flex justify-content-end' xs={6} md={4}>

                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip id="tooltip-829164576">Remove</Tooltip>
                                                }
                                            >
                                                <Button onClick={()=>{handleDelete(payment._id)}}  size='sm' className='btn-fill btn-padding btn-margin' variant="danger"><i className=" far fa-trash-alt fa-2x "> </i></Button>
                                            </OverlayTrigger>


                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip id="tooltip-829164576">Details</Tooltip>
                                                }
                                            >
                                                <Button onClick={()=>{history.push(`/superadmin/payment/${payment._id}`)}} size='sm'  className='btn-fill btn-padding' variant="primary"><i className=" icon-margin far fa-id-card fa-2x "> </i></Button>
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
                        payments===undefined? '' : (<Pagination
                            current={payments.page}
                            total={payments.pages}
                            onPageChange={pageChangeHandler}
                        />)
                    }

                </Container>
            )
    }

    return (
        <>
            {
                loading===true? <SimpleLoader/> : list()
            }
        </>
    );
}

export default Payments;
