import React, {Component} from 'react';
import { connect } from 'react-redux';
import axiosOrder from '../../axios-orders';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner';
import * as Actions from '../../store/actions/index';

import Aux from '../../hoc/Aux/aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
    
    state  = {
        purchasing: false,
    }

    componentDidMount = () => {
        this.props.onInitIngridients();
    } 

    getPurchasable = (ingridients) => {

        const sum = Object.keys(ingridients)
                           .map(ingridientKey => ingridients[ingridientKey])
                           .reduce((sum, ingridentAmount) => sum + ingridentAmount, 0);

        return sum > 0;
    }

    puchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.setAuthOnRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelled = () => {
        this.setState({purchasing: false});
    }

    purchaseContinued = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
    
    render() {
        const disabledInfo = {
            ...this.props.ingrdnts
        }

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? 'Ingridients cannot be loaded please try again later.' : <Spinner />;

        if(this.props.ingrdnts) {
            burger = <Aux>
                <Burger ingridients={this.props.ingrdnts}/>
                <BuildControls 
                    addHandler={this.props.onAddIngridient}
                    removeHandler={this.props.onRemoveIngridient}
                    disabledHandler={disabledInfo}
                    currentPrice={this.props.price}
                    isAuth={this.props.isAuthenticated}
                    purchasable={this.getPurchasable(this.props.ingrdnts)}
                    ordered={this.puchaseHandler}
                />
            </Aux>;

            orderSummary = <OrderSummary
                            ingridients={this.props.ingrdnts}
                            price={this.props.price}
                            continued={this.purchaseContinued}
                            cancelled={this.purchaseCancelled}
                            />;
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

const mapStateToProps = state => {
    return {
        ingrdnts: state.burgerBuilder.ingridients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapActionToProps = dispatch => {
    return {
        onAddIngridient: (ingrName) => dispatch(Actions.addIngridient(ingrName)),
        onRemoveIngridient: (ingrName) => dispatch(Actions.removeIngridient(ingrName)),
        onInitIngridients: () => dispatch(Actions.initIngridients()),
        onfetchIngridientsFailedHandler: () => dispatch(Actions.fetchIngridientsFailedHandler()),
        onInitPurchase: () => dispatch(Actions.purchaseInitHandler()),
        setAuthOnRedirectPath: (path) => dispatch(Actions.setAuthRedirect(path))
    };
};

export default connect(mapStateToProps, mapActionToProps)(withErrorHandler(BurgerBuilder, axiosOrder));
