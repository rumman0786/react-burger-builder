import React from 'react';

import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggler from '../SideDrawer/DrawerToggler/DrawerToggler'

import styles from './Toolbar.module.css';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        
        <DrawerToggler toggle={props.toggleSideDrawer}/>

        <div className={styles.Logo}>
            <Logo />
        </div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
    </header>
);

export default toolbar;
