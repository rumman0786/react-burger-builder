import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../../components/UI/Button/Button';

import styles from './CheckoutSummary.module.css';

const checkoutSummary = (props) => (
    <div className={styles.CheckoutSummary}>
        <h1>We hope you enjoy the Burger!</h1>
        <div style={{width:'100%', margin:'auto'}}>
            <Burger ingridients={props.ingridients}/>
        </div>
        <Button
            buttonType="Danger"
            clicked={props.checkoutCancel}>Cancel
        </Button>

        <Button
            buttonType="Success"
            clicked={props.checkoutConfirm}>Continue
        </Button>
    </div>        
);

export default checkoutSummary;