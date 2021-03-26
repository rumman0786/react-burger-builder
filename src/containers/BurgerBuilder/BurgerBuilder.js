import React, {Component} from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';

import Aux from '../../hoc/aux';

class BurgerBuilder extends Component {
    
    state  = {
        ingridients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }
    
    render() {
        return (
            <Aux>
                <Burger ingridients={this.state.ingridients}/>
                <BuildControls />
            </Aux>
        );
    }
}

export default BurgerBuilder;