import React from 'react';

import styles from './Logo.module.css';
import BurgerLogo from '../../../assets/images/burger-logo.png';

const logo = (props) => (
    <div className={styles.Logo}>
        <img src={BurgerLogo} alt='Burger BD'></img>
    </div>        
);

export default logo;