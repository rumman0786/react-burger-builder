import React, {Component} from 'react';
import axiosOrder from '../../axios-orders';
import { connect } from 'react-redux';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionType from '../../store/actions';

import Aux from '../../hoc/Aux/aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
    
    state  = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount = () => {
        // axiosOrder.get("/ingridients.json")
        // .then(response => this.setState({ingridients: response.data}))
        // .catch(error => {
        //     this.setState({error: true})
        // });
    } 

    getPurchasable = (ingridients) => {

        const sum = Object.keys(ingridients)
                           .map(ingridientKey => ingridients[ingridientKey])
                           .reduce((sum, ingridentAmount) => sum + ingridentAmount, 0);

        return sum > 0;
    }

    puchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelled = () => {
        this.setState({purchasing: false});
    }

    purchaseContinued = () => {
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
        let burger = this.state.error ? 'Ingridients cannot be loaded please try again later.' : <Spinner />;

        if(this.props.ingrdnts) {
            burger = <Aux>
                <Burger ingridients={this.props.ingrdnts}/>
                <BuildControls 
                    addHandler={this.props.onAddIngridient}
                    removeHandler={this.props.onRemoveIngridient}
                    disabledHandler={disabledInfo}
                    currentPrice={this.props.price}
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

const mapStateToProps = state => {
    return {
        ingrdnts: state.ingridients,
        price: state.totalPrice
    };
};

const mapActionToProps = dispatch => {
    return {
        onAddIngridient: (ingrName) => dispatch({type:actionType.ADD_INGRIDIENT, ingridientName: ingrName}),
        onRemoveIngridient: (ingrName) => dispatch({type:actionType.REMOVE_INGRIDIENT, ingridientName: ingrName})
    };
};

export default connect(mapStateToProps, mapActionToProps)(withErrorHandler(BurgerBuilder, axiosOrder));
