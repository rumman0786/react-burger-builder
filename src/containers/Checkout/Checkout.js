import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';

class Checkout extends Component {
    
    state = {
        ingridients : null,
        price: 0
    }

    componentWillMount() {
        const queryParams = new URLSearchParams(this.props.location.search);
        let ingridientsFromParam = {};
        let price = 0;

        console.log(queryParams);
        for(let i of queryParams.entries()) {
            if(i[0] === 'price') {
                price = i[1];
            } else {
                ingridientsFromParam[i[0]] = parseInt(i[1]);
            }
        }

        this.setState({ingridients: ingridientsFromParam, price: price});
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutConfirmHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    render() {
        return (
            <div>
                <CheckoutSummary
                    checkoutCancel={this.checkoutCancelHandler}
                    checkoutConfirm={this.checkoutConfirmHandler}
                    ingridients={this.state.ingridients} />
                <Route path={this.props.match.path + '/contact-data'}
                       render={(props) => <ContactData
                                        totalPrice={this.state.price}
                                        ingridients={this.state.ingridients}
                                        {...props}/>
                        }/>
            </div>
        );
    }
}

export default Checkout;