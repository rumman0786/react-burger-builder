import React, { Component } from 'react';
import { connect } from 'react-redux';
import axiosInstance from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Order from '../../components/Order/Order';
import * as Action from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        let orders = <Spinner />;
        if(!this.props.loading) {
            orders = (
                this.props.orders.map(order => {
                    return (
                        <Order key={order.id}
                               ingridients={order.ingridients}
                               price={order.price}/>
                    );
                })
            );
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders : state.order.orders,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(Action.fetchOrders())
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosInstance));
