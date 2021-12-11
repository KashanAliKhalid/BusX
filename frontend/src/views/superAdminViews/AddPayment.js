import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import YellowButton from "../../components/Buttons/YellowButton";
import {useDispatch, useSelector} from "react-redux";
import {licenseList} from "../../actions/licenseActions";
import {addPayment} from "../../actions/paymentActions";
import SimpleLoader from "../../components/Loaders/SimpleLoader";

const AddPayment = () => {

    const dispatch= useDispatch()
    const {licenses} =useSelector(state=>state.licenseList)
    const {loading,payment,error} =useSelector(state=>state.addedPayment)

    const [paymentType,setPaymentType]=useState('')
    const [details,setDetails]=useState('')
    const [amount,setAmount]=useState('')
    const [institute,setInstitute]=useState('')
    const [paymentDate,setPaymentDate]=useState('')
    const [instituteName,setInstituteName]=useState('')

    useEffect(()=>{
        dispatch(licenseList())
    },[])

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const data={
            paymentType,details,amount,institute,paymentDate
        }
        dispatch(addPayment(data))
    }

    const displayForm=()=>{
        return(
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Add Payment</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={(e)=>{onSubmitHandler(e)}}>
                                    <Row>
                                        <Col className="pr-1" md="5">
                                            <Form.Group>
                                                <label>Payment Type</label>
                                                <Form.Control
                                                    as="select"
                                                    value={paymentType}
                                                    required={true}
                                                    onChange={e=>{
                                                        setPaymentType(e.target.value)
                                                    }}
                                                >
                                                    <option value="jazzcash">jazzcash</option>
                                                    <option value="Easypaisa">Easypaisa</option>
                                                    <option value="Bank Account">Bank Account</option>
                                                    <option value="Credit Card">Credit Card</option>


                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="px-1" md="3">
                                            <Form.Group>
                                                <label>Institute Name</label>
                                                <Form.Control
                                                    as="select"
                                                    value={instituteName}
                                                    required={true}
                                                    onChange={e=>{
                                                        setInstitute(e.target.selectedOptions[0].getAttribute('license-id'))
                                                        setInstituteName(e.target.value)
                                                    }}
                                                >
                                                    <option value=""></option>

                                                    {
                                                        licenses?licenses.licenses.map(license=>{
                                                            return(
                                                                <option license-id={license._id} value={license.institute}>{license.institute}</option>
                                                            )
                                                        }):''
                                                    }
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="4">
                                            <Form.Group>
                                                <label>
                                                   Amount
                                                </label>
                                                <Form.Control
                                                    required='true'
                                                    type="number"
                                                    onChange={(e)=>setAmount(e.target.value)}
                                                    value={amount}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col className="pl-3" md="4">
                                            <Form.Group>
                                                <label>
                                                    Payment Details
                                                </label>
                                                <Form.Control
                                                    required='true'
                                                    as="textarea"
                                                    placeholder="Instrument number, transaction ID, Bank name etc"
                                                    onChange={(e)=>setDetails(e.target.value)}
                                                    value={details}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col className="pl-1" md="4">
                                            <Form.Group>
                                                <label>
                                                    Payment Date
                                                </label>
                                                <Form.Control
                                                    required='true'
                                                    type="date"
                                                    onChange={(e)=>setPaymentDate(e.target.value)}
                                                    value={paymentDate}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>



                                    <YellowButton
                                        className="pull-right"
                                        type="submit"
                                        width={180}
                                        content="Add Payment"
                                    />

                                    <div className="clearfix"></div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>
        )
    }

    return (
        <>
            {
                loading===true? <SimpleLoader/> :displayForm()
            }
        </>

    );
};

export default AddPayment;
