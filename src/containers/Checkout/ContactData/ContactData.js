import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

import styles from './ContactData.module.css';

class ContactData extends Component {
    
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: ''
        }
    };
    
    render() {
        return (
            <div className={styles.ContactData}>
                <h1>Confirm Your Order</h1>
                <form>
                    <input className={styles.Input} type='text' name='name' placeholder='name'/>
                    <input className={styles.Input} type='text' name='email' placeholder='email'/>
                    <input className={styles.Input} type='text' name='street' placeholder='street'/>
                    <input className={styles.Input} type='text' name='zipCode' placeholder='zipCode'/>
                    <Button buttonType='Success'>Order Now</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;