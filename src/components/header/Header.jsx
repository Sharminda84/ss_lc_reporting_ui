import React from 'react';
import './Header.css';
import logo from './Logo.png';

const header = ( props ) => {
    return (
        <div className='header'>
            <div className='header--logo'>
                <img className='header--logo--image' alt="Logo" src={logo} />
            </div>
            <div className='header--text'>
                Leaving Card and Together Cards - Reporting
            </div>
        </div>
    )
};

export default header;