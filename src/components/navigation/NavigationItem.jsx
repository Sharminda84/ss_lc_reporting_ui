import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function NavigationItem(props) {
    const menuItemSelected = (itemName) => props.navigationItemClicked(itemName);

    return (
      <div className='navigationItem'>
        <div className='collapsableNavigationItem'>
          {props.name}
        </div>
        <div className='navigationItem navigationSubItem'>
        {
          props.structure.map((subItem, index) =>
                  <Link
                      className={subItem.selected ? 'navigationItemSelected' : ''}
                      key={index}
                      to={subItem.subItemPath}
                      onClick={() => menuItemSelected(subItem.subItemName)}
                  >
                      {subItem.subItemName}
                  </Link>
          )
        }
        </div>
      </div>
    );
}

export default NavigationItem;