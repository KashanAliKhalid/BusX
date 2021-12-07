import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import YellowButton from "../../components/Buttons/YellowButton";
import {useDispatch, useSelector} from "react-redux";
import {getLicense,updateLicense} from "../../actions/licenseActions";
import ProfileLoader from "../../components/Loaders/ProfileLoader";
import UpdateLoader from "../../components/Loaders/UpdateLoader";

const LicenseDetails = ({match,history}) => {

    const dispatch= useDispatch()
    const {loading,license,error} =useSelector(state=>state.licenseDetails)
    const {updateLoading,updatedLicense} =useSelector(state=>state.updatedLicense)

    const [type,setType]=useState(null)
    const [licenseDate,setLicenseDate]=useState(null)
    const [address,setAddress]=useState(null)
    const [institute,setInstitute]=useState(null)
    const [paymentDate,setPaymentDate]=useState(null)
    const[status,setStatus]=useState(null)

    const revokeButtonHandler=()=>{
        setStatus(status===null?!license.status:!status)
    }
    console.log(status)

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const data={
            type,licenseDate:licenseDate===null?license.licenseDate:licenseDate,institute,address,paymentDate:paymentDate===null?license.paymentDate:paymentDate,status
        }
        dispatch(updateLicense(license._id,data))
    }

    useEffect(()=>{
        dispatch(getLicense(match.params.id))

    },[updatedLicense,dispatch])

    const displayForm=()=> {
        if (license !== undefined) {
            if (updateLoading === true)
                return <UpdateLoader/>
            else
                return (
                    <Container fluid>
                        <Row>
                            <Col md="12">
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h4">Add License</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form onSubmit={(e) => {
                                            onSubmitHandler(e)
                                        }}>
                                            <Row>
                                                <Col className="pr-1" md="5">
                                                    <Form.Group>
                                                        <label>Institute Name</label>
                                                        <Form.Control
                                                            required='true'
                                                            onChange={(e) => {
                                                                setInstitute(e.target.value)
                                                            }}
                                                            value={institute===null?license.institute:institute}
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
                                                            value={type===null?license.type:type}
                                                            required={true}
                                                            onChange={e => {
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
                                                            onChange={(e) => setAddress(e.target.value)}
                                                            value={address===null?license.address:address}
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
                                                            onChange={(e) => setLicenseDate(e.target.value)}
                                                            value={licenseDate===null?license.licenseDate:licenseDate}
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
                                                            onChange={(e) => setPaymentDate(e.target.value)}
                                                            value={paymentDate===null?license.paymentDate:paymentDate}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>


                                            <YellowButton
                                                className="pull-right"
                                                type="submit"
                                                width={180}
                                                content="Update License"
                                            />
                                            <YellowButton
                                                className="pull-right revoke-button mr-3"
                                                width={180}
                                                content={status===null? license.status===true? 'Revoke License' :'Allow license':status===true?'Revoke License':'Allow license'}
                                                onclick={revokeButtonHandler}

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

export default LicenseDetails;
