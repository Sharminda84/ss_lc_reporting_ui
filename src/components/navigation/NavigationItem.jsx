import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function NavigationItem(props) {
    return (
      <div className='navigationItem'>
        <div className='collapsableNavigationItem'>
          {props.name}
        </div>
        <div className='navigationItem navigationSubItem'>
        {
          props.structure.map((subItem, index) => <Link key={index} to={subItem.subItemPath}>{subItem.subItemName}</Link>)
        }
        </div>
      </div>
    );
}

export default NavigationItem;