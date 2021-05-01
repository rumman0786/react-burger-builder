import React from 'react';

import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/aux';

import styles from './SideDrawer.module.css';

const sideDrawer = (props) => {
    let attachedClasses = [styles.SideDrawer];

    attachedClasses.push(props.open ? styles.Open : styles.Close);

    return (
        <Aux>
            <Backdrop 
                show={props.open}
                closed={props.closed}/>

            <div className={attachedClasses.join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;
