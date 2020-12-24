import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import NavigationItem from './NavigationItem';

function Navigation(props) {

    const homeCSS = props.initialState ? 'navigationItem navigationItemSelected' : 'navigationItem';
    const { userRoles, navigationItems, navigationItemClicked } = props;

    const containsCommonElements = (array1, array2) => {
        const intersection = array1.filter(x => array2.includes(x));
        return intersection && intersection.length > 0;
    };

    return (
        <div className='navigation'>
            <div className={homeCSS}>
                <Link to={"/home"}>Home</Link>
            </div>
            {
                navigationItems
                    .filter(navigationItem => containsCommonElements(navigationItem.allowedRoles, userRoles))
                    .map((navigationItem, index) =>
                        <NavigationItem key={index}
                                    name={navigationItem.name}
                                    structure={navigationItem.navigationSubItems}
                                    navigationItemClicked={navigationItemClicked}
                        />
                    )
            }
            <div className='navigationItem'>...</div>
        </div>
    );
}

export default Navigation;