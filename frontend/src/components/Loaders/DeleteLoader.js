import React from 'react';
import '../../assets/css/deleteLoader.css'



const DeleteLoader = () => {
    return (
        <div className='delete-body'>
        <div className="cont">
            <div className="paper"></div>
            <button className='buttondelete'>
                <div className='loader-delete'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                Deleting
            </button>
            <div className="g-cont">
                <div className="garbage"></div>
                <div className="garbage"></div>
                <div className="garbage"></div>
                <div className="garbage"></div>
                <div className="garbage"></div>
                <div className="garbage"></div>
                <div className="garbage"></div>
                <div className="garbage"></div>
            </div>
        </div>
        </div>
    );
};

export default DeleteLoader;
