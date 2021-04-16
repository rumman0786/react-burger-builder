import React, { Component } from 'react';

import axiosInstance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';

class Orders extends Component {
    state = {
        orders : [],
        loading: false
    };

    componentDidMount() {
        this.setState({loading: true});
        let dbOrders = [];
        axiosInstance.get('/orders.json')
                    .then(res => {
                        for(let key in res.data) {
                            dbOrders.push({
                                ...res.data[key],
                                id: key
                            });
                        }

                        this.setState({loading: true, orders: dbOrders});
                    })
                    .catch(error => {
                        this.setState({loading: true});
                    });
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => {
                    return (
                        <Order key={order.id}
                               ingridients={order.ingridients}
                               price={order.price}/>
                    );
                })}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axiosInstance);
