import React, {Component} from 'react';
import axiosOrder from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner';

import Aux from '../../hoc/Aux/aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGRIDIENT_PRICES = {
    salad: 50.55,
    bacon: 90.35,
    cheese: 70.167,
    meat: 200.199
}
class BurgerBuilder extends Component {
    
    state  = {
        ingridients: null,
        totalPrice: 4.0,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount = () => {
        axiosOrder.get("/ingridients.json")
        .then(response => this.setState({ingridients: response.data}))
        .catch(error => {
            this.setState({error: true})
        });
    } 

    updatePurchasableHandler = (ingridients) => {

        const sum = Object.keys(ingridients)
                           .map(ingridientKey => ingridients[ingridientKey])
                           .reduce((sum, ingridentAmount) => sum + ingridentAmount, 0);

        this.setState({purchasable: sum > 0});
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

    puchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelled = () => {
        this.setState({purchasing: false});
    }

    purchaseContinued = () => {

        this.setState({loading: true});

        const orderData = {
            ingridients: this.state.ingridients,
            price: this.state.totalPrice,
            customer: {
                name: 'Rumman Bin Ashraf',
                address: {
                    street: 'Iqbal Road',
                    zip: 1212,
                    country: 'Bangladesh'
                },
                email: 'rumman.ashraf@gmail.com'
            },
            paymentMethod: 'Cash on Delivery',
            deliveryType: 'Regular'
        }

        axiosOrder.post('/orders.json', orderData)
                  .then(response => {
                    this.setState({loading: false, purchasing: false});
                  })
                  .catch(error => {
                    this.setState({loading: false, purchasing: false});
                  });
    }
    
    render() {
        const disabledInfo = {
            ...this.state.ingridients
        }

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? 'Ingridients cannot be loaded please try again later.' : <Spinner />;

        if(this.state.ingridients) {
            burger = <Aux>
                <Burger ingridients={this.state.ingridients}/>
                <BuildControls 
                    addHandler={this.addIngridientHandler}
                    removeHandler={this.removeIngridientHandler}
                    disabledHandler={disabledInfo}
                    currentPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.puchaseHandler}
                />
            </Aux>;

            orderSummary = <OrderSummary
                            ingridients={this.state.ingridients}
                            price={this.state.totalPrice}
                            continued={this.purchaseContinued}
                            cancelled={this.purchaseCancelled}
                            />;
        }

        if(this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal showSummary={this.state.purchasing} backdropHandler={this.purchaseCancelled}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axiosOrder);
