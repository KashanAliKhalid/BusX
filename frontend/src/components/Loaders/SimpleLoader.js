import React from 'react';
import '../../assets/css/simpleLoader.css'

const SimpleLoader = () => {
    return (
        <div className='loader'>
        <div className="wrapper-loader">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <span>Loading</span>
        </div>
        </div>
    );
};

export default SimpleLoader;
