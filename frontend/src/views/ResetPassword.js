import React, {useState,useEffect} from 'react';
import '../assets/css/forgotPassword.css'
import {Alert, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import YellowButton from "../components/Buttons/YellowButton";
import {resetPassword} from '../actions/userActions'
import {useDispatch, useSelector} from "react-redux";

const ResetPassword = ({history,match}) => {
    const dispatch= useDispatch()
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const {loading,error,status}=useSelector(state=>state.resetPassword)

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(resetPassword(password,match.params.token))
    }

     useEffect(()=>{
        console.log(match.params.token)

    },[])


    return (
        <div className="password-main">
            <div className="row">
                <div className="col-md-4 col-md-offset-4 password-panel ">
                    <div className="panel panel-default ">
                        <div className="panel-body password-panel-border ">
                            <div className="text-center ">
                                <Alert className='password-error mt-5' style={{opacity:`${(password!==confirmPassword)? '1' :'0'}`, display:`${(password!==confirmPassword)? 'block' :'none'}`}} variant="danger">
                                    <button
                                        aria-hidden={true}
                                        className="close login-error-close"
                                        data-dismiss="alert"
                                        type="button"
                                    >
                                        {/*<i className="nc-icon nc-simple-remove"></i>*/}
                                    </button>
                                    <span>
                    Passwords do not match!
                  </span>
                                </Alert>

                                <h3><i className="fa fa-lock fa-4x password-lock"></i></h3>
                                <div className="panel-body">

                                    <form onSubmit={submitHandler} id="register-form"  autoComplete="off" className="form px-5 mx-1">

                                        <Form.Group className="yellow-form-group mt-4 mb-5">
                                            <Form.Control
                                                className="yellow-form-field pb-3"
                                                required='true'
                                                placeholder="Password"
                                                type="password"
                                                value={password}
                                                onChange={e=>{setPassword(e.target.value)}}
                                            >
                                            </Form.Control>
                                            <FontAwesomeIcon className="login-field-icon padding-util" icon={faEnvelope} />
                                        </Form.Group>

                                       <Form.Group className="yellow-form-group mt-4 mb-5">
                                        <Form.Control
                                            className="yellow-form-field pb-3"
                                            required='true'
                                            placeholder="Confirm Password"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={e=>{setConfirmPassword(e.target.value)}}
                                        >
                                        </Form.Control>
                                        <FontAwesomeIcon className="login-field-icon padding-util" icon={faEnvelope} />
                                    </Form.Group>
                                        <YellowButton disabled={password!==confirmPassword}  type="submit" className="mb-5 " width={275} content="Reset Password"/>

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

export default ResetPassword;
