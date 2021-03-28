import React from 'react';

import Logo from '../../UI/Logo/Logo';

import styles from './Toolbar.module.css';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <div>Menu</div>
        <Logo />
        <div>Navigation
            ...
        </div>
    </header>
);

export default toolbar;