import React from 'react';

import styles from './DrawerToggler.module.css'

const drawerToggler = (props) => (
    <div className={styles.DrawerToggle} onClick={props.toggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggler;
