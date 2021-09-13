import React from 'react';
import '../../assets/css/MapsLoader.css'
import loader from '../../assets/img/map_spinner.gif'

const MapsLoader = () => {
    return (
        <div className="maps-loader--body d-flex justify-content-center align-items-center">
            <img src={loader} alt=""/>
        </div>
    );
};

export default MapsLoader;
