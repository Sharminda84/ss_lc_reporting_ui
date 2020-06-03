import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import NavigationItem from "./NavigationItem";

function Navigation(props) {

    const memberNavigation = props.memberNavigation;
    const ordersNavigation = props.ordersNavigation;

    return (
        <div className='navigation'>
            <div className='navigationItem'>
                <Link to={"/home"}>Home</Link>
            </div>
            <NavigationItem
                name="Members"
                structure={memberNavigation}
            />
            <NavigationItem
                name="Orders"
                structure={ordersNavigation}
            />
            <div className='navigationItem'>...</div>
        </div>
    );
}

export default Navigation;