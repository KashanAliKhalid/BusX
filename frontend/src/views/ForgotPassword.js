import React, {useState} from 'react';
import '../assets/css/forgotPassword.css'
import {Alert, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import YellowButton from "../components/Buttons/YellowButton";
import {forgotPassword} from '../actions/userActions'
import {useDispatch, useSelector} from "react-redux";

const ForgotPassword = ({history}) => {
    const dispatch= useDispatch()
    const [email,setEmail]=useState('')
    const {loading,error,status}=useSelector(state=>state.forgotPassword)

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(forgotPassword(email))
    }


    return (
        <div className="password-main">
            <div className="row">
                <div className="col-md-4 col-md-offset-4 password-panel ">
                    <div className="panel panel-default ">
                        <div className="panel-body password-panel-border ">
                            <div className="text-center ">
                                <Alert className='password-error mt-5' style={{opacity:`${error? '1' :'0'}`, display:`${error? 'block' :'none'}`}} variant="danger">
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

                                <Alert className='password-error alert-yellow' style={{opacity:`${status? '1' :'0'}`, display:`${status? 'block' :'none'}`}} variant="success">
                                    <button
                                        aria-hidden={true}
                                        className="close login-error-close"
                                        data-dismiss="alert"
                                        type="button"
                                    >
                                        {/*<i className="nc-icon nc-simple-remove"></i>*/}
                                    </button>
                                    <span>
                    Please check your Email
                  </span>
                                </Alert>
                                <h3><i className="fa fa-lock fa-4x password-lock"></i></h3>
                                <h2 className="text-center">Forgot Password?</h2>
                                <p>You can reset your password here or <span onClick={()=>{history.push('/login')}} className="password-login" >Login</span></p>
                                <div className="panel-body">

                                    <form onSubmit={submitHandler} id="register-form"  autoComplete="off" className="form px-5 mx-1">

                                        <Form.Group className="yellow-form-group mt-4 mb-5">
                                            <Form.Control
                                                className="yellow-form-field pb-3"
                                                required='true'
                                                placeholder="Email"
                                                type="email"
                                                value={email}
                                                onChange={e=>{setEmail(e.target.value)}}
                                            >
                                            </Form.Control>
                                            <FontAwesomeIcon className="login-field-icon padding-util" icon={faEnvelope} />
                                        </Form.Group>
                                            <YellowButton  type="submit" className="mb-5 " width={275} content="Login"/>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
};

export default ForgotPassword;
