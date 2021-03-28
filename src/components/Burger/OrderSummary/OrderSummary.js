import React from 'react';

import Aux from '../../../hoc/aux'
import Button from '../../UI/Button/Button'

function orderSummary(props) {
    const ingridientSummary = Object.keys(props.ingridients)
                              .map(igKey => {
                                    return <li key={igKey}><span className={{textTransformat: 'capitalize'}}>
                                            {igKey}
                                        </span>: {props.ingridients[igKey]}</li>
                              });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A Delicious Burger is Prepeared with following ingridiens:</p>
            <ul>
                {ingridientSummary}
            </ul>
            <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout</p>
            <Button buttonType='Danger' clicked={props.cancelled}>Cancel</Button>
            <Button buttonType='Success' clicked={props.continued}>Continue</Button>
        </Aux>
    );
}

export default orderSummary;