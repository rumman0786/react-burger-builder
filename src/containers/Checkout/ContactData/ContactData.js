import React, { Component } from 'react';

import axiosOrder from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import styles from './ContactData.module.css';

class ContactData extends Component {
    
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig : {
                    type: 'text',
                    placeholder: 'Firstname Lastname'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig : {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zip: {
                elementType: 'input',
                elementConfig : {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig : {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig : {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: ''
            },
            paymentMethod: {
                elementType: 'input',
                elementConfig : {
                    type: 'text',
                    placeholder: 'Payment Method'
                },
                value: ''
            },
            deliveryType: {
                elementType: 'select',
                elementConfig : {
                    options: [
                        {value: 'fastest', label:'Fastest'},
                        {value: 'cheapest', label:'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});

        const orderData = {
            ingridients: this.props.ingridients,
            price: this.props.totalPrice,
        }

        axiosOrder.post('/orders.json', orderData)
                  .then(response => {
                    this.setState({loading: false});
                    this.props.history.push('/')
                  })
                  .catch(error => {
                    this.setState({loading: false});
                  });
    }

    inputChangedHandler = (event, elementId) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormValue = {
            ...updatedOrderForm[elementId]
        };

        updatedFormValue.value = event.target.value;
        updatedOrderForm[elementId] = updatedFormValue;
        
        this.setState({orderForm: updatedOrderForm});
    }
    
    render() {
        let orderForm = [];
        for(let key in this.state.orderForm) {
            orderForm.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form>
                {orderForm.map(input => {
                    return <Input
                                key={input.id}
                                elementType={input.config.elementType}
                                elementConfig={input.config.elementConfig}
                                value={input.config.value}
                                changed={(event) => this.inputChangedHandler(event, input.id)}/>
                })}

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