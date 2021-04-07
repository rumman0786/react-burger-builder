import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    componentDidUpdate() {
        console.log("[Order Summary Update Triggered]");
    }

    render() {
        const ingridientSummary = Object.keys(this.props.ingridients)
                              .map(igKey => {
                                    return <li key={igKey}>
                                                <span className={{textTransformat: 'capitalize'}}>{igKey}</span>
                                                : {this.props.ingridients[igKey]}
                                            </li>
                              });
                              
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A Delicious Burger is Prepeared with following ingridiens:</p>
                <ul>
                    {ingridientSummary}
                </ul>
                <p>Total Price: <strong>{this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout</p>
                <Button buttonType='Danger' clicked={this.props.cancelled}>Cancel</Button>
                <Button buttonType='Success' clicked={this.props.continued}>Continue</Button>
            </Aux>
        );
    }
}

export default OrderSummary;
