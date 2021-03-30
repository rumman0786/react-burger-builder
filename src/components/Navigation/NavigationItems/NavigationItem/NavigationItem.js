import React from 'react';

import styles from './NavigationItem.module.css';

const navigationItem = (props) => (
    <l1 className={styles.NavigationItem}>
        <a href={props.url} className={props.active ? styles.active : null}>
            {props.children}
        </a>
    </l1>
);

export default navigationItem;
