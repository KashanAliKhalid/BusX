import React from 'react';
import '../assets/css/403.css'
import expired from '../assets/img/expired.gif'
import {userLogout} from "../actions/userActions";
import {useDispatch} from "react-redux";



const LicenseExpired = ({history}) => {
    const dispatch= useDispatch()
    const logoutHandler=()=>{
        dispatch(userLogout())
        history.push('/login')
    }
    return (
        <div className='expired-body'>
            <use>
                <img className="expired-image" src={expired} alt=""/>
            </use>
            <h1 className='h1-forbidden'>403</h1>
            <h2 className='h2-forbidden'>Not this time, license expired!</h2>
            <h2 className='h2-forbidden'>Contact Support <a href='' onClick={logoutHandler}>Logout</a></h2>
        </div>
    );
};

export default LicenseExpired ;
