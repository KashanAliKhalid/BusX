import React, {useState} from 'react';
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import YellowButton from "../../components/Buttons/YellowButton";
import {useDispatch, useSelector} from "react-redux";
import {addLicense} from "../../actions/licenseActions";
import SimpleLoader from "../../components/Loaders/SimpleLoader";

const AddLicense = () => {

    const dispatch= useDispatch()
    const {loading,license,error} =useSelector(state=>state.addedLicense)

    const [type,setType]=useState('')
    const [licenseDate,setLicenseDate]=useState('')
    const [address,setAddress]=useState('')
    const [institute,setInstitute]=useState('')
    const [paymentDate,setPaymentDate]=useState('')



    const onSubmitHandler = (e) => {
        e.preventDefault();
        const data={
            type,licenseDate,institute,address,paymentDate
        }
        dispatch(addLicense(data))
    }

    const displayForm=()=>{
        return(
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Add License</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={(e)=>{onSubmitHandler(e)}}>
                                    <Row>
                                        <Col className="pr-1" md="5">
                                            <Form.Group>
                                                <label>Institute Name</label>
                                                <Form.Control
                                                    required='true'
                                                    onChange={(e)=>{setInstitute(e.target.value)}}
                                                    value={institute}
                                                    placeholder="ABC institute of technology"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="px-1" md="3">
                                            <Form.Group>
                                                <label>License Type</label>
                                                <Form.Control
                                                    as="select"
                                                    value={type}
                                                    required={true}
                                                    onChange={e=>{
                                                        setType(e.target.value)
                                                    }}
                                                >
                                                    <option value=""></option>
                                                    <option value="1 year">1 year</option>
                                                    <option value="2 years">2 years</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="4">
                                            <Form.Group>
                                                <label>
                                                    Address
                                                </label>
                                                <Form.Control
                                                    required='true'
                                                    placeholder="xyz street sector y islamabad"
                                                    type="text"
                                                    onChange={(e)=>setAddress(e.target.value)}
                                                    value={address}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col className="pl-3" md="4">
                                            <Form.Group>
                                                <label>
                                                    License Start Date
                                                </label>
                                                <Form.Control
                                                    required='true'
                                                    type="date"
                                                    onChange={(e)=>setLicenseDate(e.target.value)}
                                                    value={licenseDate}
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
                                        content="Add License"
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

export default AddLicense;
