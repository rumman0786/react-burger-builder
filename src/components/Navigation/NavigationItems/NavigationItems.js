import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem'

import styles from './NavigationItems.module.css'

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem url={'/'} active={true}>
            Burger Builder
        </NavigationItem>

        <NavigationItem url={'/'}>
            Checkout
        </NavigationItem>
        
        
    </ul>            
);

export default navigationItems;
