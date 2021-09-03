import React, {useState,useEffect} from 'react';
import '../assets/css/login.css'
import '../assets/css/login-stars.css'
import adminAvatar from '../assets/img/admin.jpg'
import superAdminAvatar from '../assets/img/super-admin.jpg'
import logo from '../assets/img/logo.png'
import checkSymbol from '../assets/img/check.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faEnvelope, } from '@fortawesome/free-solid-svg-icons'
import { SocialIcon } from 'react-social-icons';
import Switch from "react-switch";
import YellowButton from "../components/Buttons/YellowButton";
import {userLogin} from '../actions/userActions'
import {useDispatch,useSelector} from "react-redux";
import SignInLoader from "../components/Loaders/signInLoader";

import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col, Alert,
} from "react-bootstrap";

const Login = ({history}) => {
    const [selectedUser,setSelectedUser]=useState('Admin')
    const [checkbox, setCheckbox]=useState('none')
    const [checked,setChecked]=useState(false)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [remember,setRemember]=useState(false)

    const dispatch=useDispatch()

    const userLogindata=useSelector(state=>state.userLogin)
    const {loading,error,userInfo}=userLogindata

    useEffect(()=>{
        if(userInfo!==null && userInfo!==undefined)
        {
            if(userInfo.type==="Admin")
            {
                history.push('/admin/dashboard')
            }
        }
    },[userInfo])


    window.addEventListener('load',()=>{
        consoleText(['Stop Looking.','Start Tracking.'], 'login-trackingtext',['#fdda00','#303236']);

    })

     const handleSwitchChange=()=> {
        //false==admin
         //true=superadmin
         if(checked===true)
         {
             setChecked(false)
             setSelectedUser('Admin')
         }else{
             setChecked(true)
             setSelectedUser('Super Admin')

         }
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(userLogin(email,password,selectedUser,remember))
    }


    const checkboxHandler=()=>{
        if(checkbox==='none') {
            setCheckbox('block');
            setRemember(true);
        }
        else {
            setCheckbox('none')
            setRemember(false)
        }

    }

    function consoleText(words, id, colors) {

        if (colors === undefined) colors = ['#fff'];
        var visible = true;
        var con = document.getElementById('console');
        var letterCount = 1;
        var x = 1;
        var waiting = false;
        var target = document.getElementById(id)
        if(target!==null)
        {

            target.setAttribute('style', 'color:' + colors[0])
            window.setInterval(function() {

                if (letterCount === 0 && waiting === false) {
                    waiting = true;
                    target.innerHTML = words[0].substring(0, letterCount)
                    window.setTimeout(function() {
                        var usedColor = colors.shift();
                        colors.push(usedColor);
                        var usedWord = words.shift();
                        words.push(usedWord);
                        x = 1;
                        target.setAttribute('style', 'color:' + colors[0])
                        letterCount += x;
                        waiting = false;
                    }, 1000)
                } else if (letterCount === words[0].length + 1 && waiting === false) {
                    waiting = true;
                    window.setTimeout(function() {
                        x = -1;
                        letterCount += x;
                        waiting = false;
                    }, 1000)
                } else if (waiting === false) {
                    target.innerHTML = words[0].substring(0, letterCount)
                    letterCount += x;
                }
            }, 120)
            window.setInterval(function() {
                if (visible === true) {
                    con.className = 'console-underscore hidden'
                    visible = false;

                } else {
                    con.className = 'console-underscore'

                    visible = true;
                }
            }, 400)

        }

    }
    return (
            <div className='login'>
                {loading==true? <SignInLoader/> : ''}
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
            <div className="row login-container container no-gutters mt-3 pr-2 pt-2">
                <div className="col-12 col-md-6 login-left no-gutters text-center d-flex flex-column">

                    <Row>
                        <img height="70" width="70" className="login-logo ml-4 mt-2" src={logo} alt="logo"/>
                        <p className="text-left login-phone mt-3 ml-3">Ph. +92.320.1234.567</p>
                    </Row>
                    <h2 className="mt-4 pt-4">Login to you account!</h2>
                    <Container>
                        <Alert className='login-error' style={{opacity:`${error? '1' :'0'}`, visibility:`${error? 'visible' :'hidden'}`}} variant="danger">
                            <button
                                aria-hidden={true}
                                className="close login-error-close"
                                data-dismiss="alert"
                                type="button"
                            >
                                {/*<i className="nc-icon nc-simple-remove"></i>*/}
                            </button>
                            <span>
                    Wrong Email or Password
                  </span>
                        </Alert>

                    <Form onSubmit={e=>{submitHandler(e)}}>
                        <Row className="justify-content-center">
                            <Col className="mt-3" md="10">
                                <Form.Group className="yellow-form-group mt-4">
                                    <label className="yellow-form-label px-2">Email</label>
                                    <Form.Control
                                        className="yellow-form-field"
                                        required='true'
                                        placeholder="Email"
                                        type="email"
                                        value={email}
                                        onChange={e=>{setEmail(e.target.value)}}
                                    >
                                    </Form.Control>
                                    <FontAwesomeIcon className="login-field-icon" icon={faEnvelope} />

                                </Form.Group>

                                <Form.Group className="yellow-form-group mt-4">
                                    <label className="yellow-form-label px-2">Password</label>
                                    <Form.Control
                                        className="yellow-form-field"
                                        required='true'
                                        placeholder="Password"
                                        type="password"
                                        value={password}
                                        onChange={e=>setPassword(e.target.value)}
                                    >
                                    </Form.Control>
                                    <FontAwesomeIcon className="login-field-icon" icon={faKey} />
                                </Form.Group>

                                <Form.Group onClick={checkboxHandler} className="yellow-form-group mt-4">
                                    <label className=" px-2 login-form-checkbox--label"  >Remember Me</label>
                                    <img style={{display:`${checkbox}`}} className="login-form-checkbox--img"  width={23} height={23} src={checkSymbol} alt=""/>
                                    <div className="login-form-checkbox">
                                    </div>

                                    <h5 className="login-forgot ml-5">Forgot password?</h5>
                                </Form.Group>
                                <YellowButton type="submit" className="mt-2 float-left" width={200} content="Login"/>
                                <Row className="d-flex flex-column align-items-center justify-content-center d-md-none">
                                    <Switch
                                        className="mt-2 ml-5"
                                        offColor='#fdda00'
                                        onColor='#000000'
                                        onChange={handleSwitchChange}
                                        checked={checked}
                                        checkedIcon={null}
                                        uncheckedIcon={null}
                                    />
                                    <p className="ml-5 login-mobile-user">{checked===false? 'Admin' : 'Super Admin'}</p>

                                </Row>

                            </Col>

                        </Row>


                    </Form>
                    </Container>
                    <div className="mt-auto mb-3">
                        <Row  className=" no-gutters d-flex flex-row justify-content-start align-items-start">
                            <Col  xs={1}>
                                <SocialIcon bgColor="#6001d2" className="login-social" url="https://yahoo.com/" />
                            </Col>
                            <Col xs={1}>
                                <SocialIcon  className="login-social" url="https://facebook.com/" />
                            </Col>
                            <Col xs={1}>
                                <SocialIcon  className="login-social" url="https://linkedin.com/jaketrent" />
                            </Col>

                        </Row>
                    </div>
                </div>


                <div className=" d-sm-none d-md-flex d-flex flex-column col-6 login-right no-gutters text-center">
                    <h3 className="login-account">Select Account Type</h3>
                    <div className="row d-flex justify-content-around mt-4">
                        <div onClick={()=>{setSelectedUser('Admin')}} className="login-avatar-container text-center pt-4">
                            <img width={150} height={150} src={adminAvatar} alt=""/>
                            {selectedUser==='Admin' ? <img className="checkSymbol" width={30} height={30} src={checkSymbol} alt=""/>
                             : ''}
                            <h5>Admin</h5>
                        </div>
                        <div onClick={()=>{setSelectedUser('Super Admin')}} className="login-avatar-container text-center pt-4">
                            <img width={150} height={150} src={superAdminAvatar} alt=""/>
                            {selectedUser==='Super Admin' ? <img className="checkSymbol" width={30} height={30} src={checkSymbol} alt=""/>
                                : ''}
                            <h5>Super Admin</h5>
                        </div>
                    </div>
                    <h5 className="login-hellotext mt-5">Hello {selectedUser}! Please fill in the form to get started</h5>
                    <div className='console-container'><span className='text-left' id='login-trackingtext'></span>
                        <div className='underscore' id='console'>&#95;</div>
                    </div>
                    <img src="https://www.animatedimages.org/data/media/425/animated-bus-image-0007.gif" alt=""/>


                    <div style={{ marginBottom:'-10px'}} className="mt-auto">
                        <p className="text-right login-copyright">&copy; 2020. All Rights Reserved </p>

                    </div>

                </div>

            </div>
        </div>

    );
};

export default Login;
