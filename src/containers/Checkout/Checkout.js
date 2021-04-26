import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';

class Checkout extends Component {
    
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutConfirmHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    render() {
        console.log(this.props.ingrdnts);
        let summary = (<Redirect to='/' />);
        if (this.props.ingrdnts) {
            summary = (
                <div>
                    <CheckoutSummary
                        checkoutCancel={this.checkoutCancelHandler}
                        checkoutConfirm={this.checkoutConfirmHandler}
                        ingridients={this.props.ingrdnts} />
    
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                </div>
            ); 
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingrdnts: state.burgerBuilder.ingridients,
        price: state.burgerBuilder.totalPrice
    };
};

export default connect(mapStateToProps, null)(Checkout);