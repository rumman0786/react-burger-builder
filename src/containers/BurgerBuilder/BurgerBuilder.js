import React, {Component} from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal'

import Aux from '../../hoc/aux';
const INGRIDIENT_PRICES = {
    salad: 50.55,
    bacon: 90.35,
    cheese: 70.167,
    meat: 200.199
}
class BurgerBuilder extends Component {
    
    state  = {
        ingridients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4.0,
        pruchasable: false
    }

    updatePurchasableHandler = (ingridients) => {

        const sum = Object.keys(ingridients)
                           .map(ingridientKey => ingridients[ingridientKey])
                           .reduce((sum, ingridentAmount) => sum + ingridentAmount, 0);

        this.setState({pruchasable: sum > 0});
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

        this.updatePurchasableHandler(newIngridients);
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

            this.updatePurchasableHandler(newIngridients);
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
                <Modal>
                    <OrderSummary ingridients={this.state.ingridients}></OrderSummary>
                </Modal>
                <Burger ingridients={this.state.ingridients}/>
                <BuildControls 
                    addHandler={this.addIngridientHandler}
                    removeHandler={this.removeIngridientHandler}
                    disabledHandler={disabledInfo}
                    currentPrice={this.state.totalPrice}
                    pruchasable={this.state.pruchasable}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;