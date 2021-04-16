import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';

class Checkout extends Component {
    
    state = {
        ingridients : {
            salad: 1,
            cheese: 1,
            meat: 1,
            bacon: 1
        }
    }

    componentDidMount() {
        const queryParams = new URLSearchParams(this.props.location.search);
        let ingridientsFromParam = {};

        console.log(queryParams);
        for(let i of queryParams.entries()) {
            ingridientsFromParam[i[0]] = parseInt(i[1]);
        }

        this.setState({ingridients: ingridientsFromParam});
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
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
            </div>
        );
    }
}

export default Checkout;