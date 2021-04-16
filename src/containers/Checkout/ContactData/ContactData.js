import React, { Component } from 'react';

import axiosOrder from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import styles from './ContactData.module.css';

class ContactData extends Component {
    
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});

        const orderData = {
            ingridients: this.props.ingridients,
            price: this.props.totalPrice,
            customer: {
                name: 'Rumman Bin Ashraf',
                address: {
                    street: 'Iqbal Road',
                    zip: 1212,
                    country: 'Bangladesh'
                },
                email: 'rumman.ashraf@gmail.com'
            },
            paymentMethod: 'Cash on Delivery',
            deliveryType: 'Regular'
        }

        axiosOrder.post('/orders.json', orderData)
                  .then(response => {
                    this.setState({loading: false});
                    this.props.history.push('/')
                  })
                  .catch(error => {
                    this.setState({loading: false});
                  });

        console.log(this.props.ingridients);
    }
    
    render() {
        let form = (
            <form>
                <input className={styles.Input} type='text' name='name' placeholder='name'/>
                <input className={styles.Input} type='text' name='email' placeholder='email'/>
                <input className={styles.Input} type='text' name='street' placeholder='street'/>
                <input className={styles.Input} type='text' name='zipCode' placeholder='zipCode'/>
                <Button buttonType='Success'
                        clicked={this.orderHandler}>Order Now</Button>
            </form>
        );

        if(this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={styles.ContactData}>
                <h1>Confirm Your Order</h1>
                {form}
            </div>
        );
    }
}

export default ContactData;