import React from 'react';
import {Button} from "react-bootstrap";
import '../../assets/css/LoginButton.css'

const LoginButton = ({width,content,className,onClick, disabled,type}) => {
    return (
        <Button type={type} disabled={disabled || false} onClick={onClick}  style={{width:`${width}px`}} className={`${className} login-button` }>
            {content}
        </Button>
    );
};

export default LoginButton;
