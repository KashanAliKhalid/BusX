import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import YellowButton from "../../components/Buttons/YellowButton";
import {useDispatch, useSelector} from "react-redux";
import {licenseList} from "../../actions/licenseActions";
import {getPayment, updatePayment} from "../../actions/paymentActions";
import SimpleLoader from "../../components/Loaders/SimpleLoader";
import UpdateLoader from "../../components/Loaders/UpdateLoader";
import ProfileLoader from "../../components/Loaders/ProfileLoader";

const AddPayment = ({match}) => {

    const dispatch= useDispatch()
    const {loading,payment,error} =useSelector(state=>state.paymentDetails)
    const {updateLoading} =useSelector(state=>state.updatedPayment)

    const [details,setDetails]=useState(null)

    useEffect(()=>{
        dispatch(licenseList())
        dispatch(getPayment(match.params.id))
    },[])

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const data={
            details
        }
        dispatch(updatePayment(match.params.id,data))
    }

    const displayForm=()=> {
        if (payment !== undefined) {
            if (updateLoading === true)
                return <UpdateLoader/>
            else
                return (
                    <Container fluid>
                        <Row>
                            <Col md="12">
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h4">Add Payment</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form onSubmit={(e) => {
                                            onSubmitHandler(e)
                                        }}>
                                            <Row>
                                                <Col className="pr-1" md="5">
                                                    <Form.Group>
                                                        <label>Payment Type</label>
                                                        <Form.Control
                                                            type="text"
                                                            disabled
                                                            value={payment.paymentType}
                                                            required={true}
                                                        >

                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="px-1" md="3">
                                                    <Form.Group>
                                                        <label>Institute Name</label>
                                                        <Form.Control
                                                            type="text"
                                                            value={payment.institute.institute}
                                                            required={true}
                                                            disabled
                                                        >
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
                                                            disabled
                                                            onChange={(e) => setAmount(e.target.value)}
                                                            value={payment.amount}
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
                                                            onChange={(e) => setDetails(e.target.value)}
                                                            value={details === null ? payment.details : details}
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
                                                            disabled
                                                            onChange={(e) => setPaymentDate(e.target.value)}
                                                            value={payment.paymentDate}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>


                                            <YellowButton
                                                className="pull-right"
                                                type="submit"
                                                width={180}
                                                content="Update Details"
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
    }

    return (
        <>
            {
                loading===true? <ProfileLoader/> :displayForm()
            }
        </>

    );
};

export default AddPayment;
