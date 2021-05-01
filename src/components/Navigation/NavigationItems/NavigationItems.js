import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem'

import styles from './NavigationItems.module.css'

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem url={'/'} exact>
            Burger Builder
        </NavigationItem>

        <NavigationItem url={'/orders'}>
            Orders
        </NavigationItem>
        
        {!props.isAuthenticated 
            ? <NavigationItem url={'/auth'}>Authenticate</NavigationItem>
            : <NavigationItem url={'/logout'}>Logout</NavigationItem>
        }
    </ul>            
);

export default navigationItems;
