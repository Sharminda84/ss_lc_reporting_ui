import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation(props) {

    return (
        <div className='navigation'>
            <div className='navigationItem'>
                <Link to={"/members"}>Member Sign-ups</Link>
            </div>
            <div className='navigationItem'>
                <Link to={"/orders"}>Orders</Link>
            </div>
            <div className='navigationItem navigationItemBottom'>...</div>
        </div>
    );
}

export default Navigation;