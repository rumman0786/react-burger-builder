import React from 'react';

import styles from './DrawerToggler.module.css'

const drawerToggler = (props) => (
    <div onClick={props.toggle}>Menu</div>
);

export default drawerToggler;
