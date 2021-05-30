import React from 'react';
import '../../assets/css/simpleLoader.css'

const UpdateLoader = () => {
    return (
        <div className='loader'>
            <div className="wrapper-loader">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <span>Updating</span>
            </div>
        </div>
    );
};

export default UpdateLoader;
