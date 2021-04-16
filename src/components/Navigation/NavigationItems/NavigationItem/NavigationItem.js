import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './NavigationItem.module.css';

const navigationItem = (props) => (
    <l1 className={styles.NavigationItem}>
        <NavLink
            exact={props.exact}
            to={props.url}
            activeClassName={styles.active}>
            {props.children}
        </NavLink>
    </l1>
);

export default navigationItem;
