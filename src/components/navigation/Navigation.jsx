import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import NavigationItem from './NavigationItem';

function Navigation(props) {

    const homeCSS = props.initialState ? 'navigationItem navigationItemSelected' : 'navigationItem';

    return (
        <div className='navigation'>
            <div className={homeCSS}>
                <Link to={"/home"}>Home</Link>
            </div>
            {
                props.navigationItems.map((navigationItem, index) =>
                    <NavigationItem key={index}
                                    name={navigationItem.name}
                                    structure={navigationItem.navigationSubItems}
                                    navigationItemClicked={props.navigationItemClicked}
                    />)
            }
            <div className='navigationItem'>...</div>
        </div>
    );
}

export default Navigation;