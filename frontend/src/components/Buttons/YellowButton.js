import React from 'react';
import {Button} from "react-bootstrap";
import '../../assets/css/LoginButton.css'

const YellowButton = ({width,content,className,onclick, disabled,type}) => {
    return (
        <Button type={type} disabled={disabled || false} onClick={onclick}  style={{width:`${width}px`}} className={`${className} login-button` }>
            {content}
        </Button>
    );
};

export default YellowButton;
