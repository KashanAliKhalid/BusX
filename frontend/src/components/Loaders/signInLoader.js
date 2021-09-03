import React from 'react';
import '../../assets/css/signInLoader.css'

const SignInLoader = () => {
    return (
        <div className='signin-loader--body'>
        <section id="global">

            <div id="top" className="mask">
                <div className="plane"></div>
            </div>
            <div id="middle" className="mask">
                <div className="plane"></div>
            </div>

            <div id="bottom" className="mask">
                <div className="plane"></div>
            </div>

            <p className="signin-loader--text"><i>Signing In..</i></p>

        </section>
        </div>
    );
};

export default SignInLoader;
