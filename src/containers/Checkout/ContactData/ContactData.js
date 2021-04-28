import React, { Component } from 'react';
import { connect } from 'react-redux';

import axiosOrder from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

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
                value: '',
                isValid: false,
                touched: false,
                errorMessage: 'Please enter a valid name',
                validation: {
                    required: true
                }
            },
            street: {
                elementType: 'input',
                elementConfig : {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                isValid: false,
                touched: false,
                errorMessage: 'Please enter a valid street',
                validation: {
                    required: true
                }
            },
            zip: {
                elementType: 'input',
                elementConfig : {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                isValid: false,
                touched: false,
                errorMessage: 'Please enter a valid zip',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                }
            },
            country: {
                elementType: 'input',
                elementConfig : {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                isValid: false,
                touched: false,
                errorMessage: 'Please enter a valid country',
                validation: {
                    required: true
                }
            },
            email: {
                elementType: 'input',
                elementConfig : {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                isValid: false,
                touched: false,
                errorMessage: 'Please enter a valid email',
                validation: {
                    required: true
                }
            },
            paymentMethod: {
                elementType: 'input',
                elementConfig : {
                    type: 'text',
                    placeholder: 'Payment Method'
                },
                value: '',
                isValid: false,
                touched: false,
                errorMessage: 'Please enter a valid paymentMethod',
                validation: {
                    required: true
                }
            },
            deliveryType: {
                elementType: 'select',
                elementConfig : {
                    options: [
                        {value: 'fastest', label:'Fastest'},
                        {value: 'cheapest', label:'Cheapest'}
                    ]
                },
                value: 'fastest',
                isValid: true,
                validation: {}
            }
        },
        formIsValid: false
    };

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for(let formId in this.state.orderForm) {
            formData[formId] = this.state.orderForm[formId].value;
        }

        const orderData = {
            ingridients: this.props.ingrdnts,
            price: this.props.price,
            orderData: formData
        }

        this.props.onOrderBurger(orderData);
    }

    isValid(value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, elementId) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormValue = {
            ...updatedOrderForm[elementId]
        };

        updatedFormValue.value = event.target.value;

        updatedFormValue.isValid = this.isValid(updatedFormValue.value, updatedFormValue.validation);
        updatedFormValue.touched = true;

        updatedOrderForm[elementId] = updatedFormValue;

        let _formIsValid = true;
        for(let key in updatedOrderForm) {
            _formIsValid = _formIsValid && updatedOrderForm[key].isValid;
        } 
        
        this.setState({orderForm: updatedOrderForm, formIsValid: _formIsValid});
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
            <form onSubmit={this.orderHandler}>
                {orderForm.map(input => {
                    return <Input
                                key={input.id}
                                elementType={input.config.elementType}
                                elementConfig={input.config.elementConfig}
                                value={input.config.value}
                                invalid={!input.config.isValid}
                                shouldValidate={input.config.validation}
                                errorMessage={input.config.errorMessage}
                                touched={input.config.touched}
                                changed={(event) => this.inputChangedHandler(event, input.id)}/>
                })}

                <Button buttonType='Success' disabled={!this.state.formIsValid}>Order Now</Button>
            </form>
        );

        if(this.props.loading) {
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

const mapStateToProps = state => {
    return {
        ingrdnts: state.burgerBuilder.ingridients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    };
};


const mapActionToProps = dispatch => {
    return  {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurgerHandler(orderData))
    };
};

export default connect(mapStateToProps, mapActionToProps)(withErrorHandler(ContactData, axiosOrder));
