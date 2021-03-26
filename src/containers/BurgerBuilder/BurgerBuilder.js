import React, {Component} from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';

import Aux from '../../hoc/aux';
const INGRIDIENT_PRICES = {
    salad: 50,
    bacon: 90,
    cheese: 70,
    meat: 200
}
class BurgerBuilder extends Component {
    
    state  = {
        ingridients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4.0
    }

    addIngridientHandler = (type) => {
        const oldIngridientsCount = this.state.ingridients[type];
        const newIngridientsCount = oldIngridientsCount + 1;
        const newIngridients = {
            ...this.state.ingridients
        }
        newIngridients[type] = newIngridientsCount;

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGRIDIENT_PRICES[type];

        this.setState({ingridients: newIngridients, totalPrice: newPrice });
    }

    removeIngridientHandler = (type) => {
        const oldIngridientsCount = this.state.ingridients[type];
        if(oldIngridientsCount > 0) {
            const newIngridientsCount = oldIngridientsCount - 1;
            const newIngridients = {
                ...this.state.ingridients
            }
            newIngridients[type] = newIngridientsCount;
    
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - INGRIDIENT_PRICES[type];
    
            this.setState({ingridients: newIngridients, totalPrice: newPrice });
        }
        
    }
    
    render() {
        const disabledInfo = {
            ...this.state.ingridients
        }

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Burger ingridients={this.state.ingridients}/>
                <BuildControls 
                    addHandler={this.addIngridientHandler}
                    removeHandler={this.removeIngridientHandler}
                    disabledHandler={disabledInfo}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;