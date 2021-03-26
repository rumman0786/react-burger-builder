import React from 'react';

import Aux from '../../../hoc/aux'

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
            <p>Continue to Checkout</p>
        </Aux>
    );
}

export default orderSummary;