import React from 'react';

import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col, Alert, Modal,
} from "react-bootstrap";

import profile from '../assets/img/farhan.jpg'
const BusDetails = () => {
    return (
        <>
            <Row>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <div className='d-flex flex-column align-items-center text-center'>
                        <img width={150} className='rounded-circle' src={profile} alt="profile"/>
                    </div>
                </Card.Body>
            </Card>
            </Row>
        </>
    );
};

export default BusDetails;
