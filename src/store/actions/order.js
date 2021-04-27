import * as actionTypes from './actionTypes';
import axiosOrder from './../../axios-orders';

export const purchaseBurgerSuccessHandler = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData
    };
};

export const purchaseBurgerFailureHandler = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStartHandler = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurgerHandler = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStartHandler());
        axiosOrder.post('/orders.json', orderData)
                  .then(response => {
                    dispatch(purchaseBurgerSuccessHandler(response.data.name, orderData))
                  })
                  .catch(error => {
                    dispatch(purchaseBurgerFailureHandler(error))
                  });
    }
};

export const purchaseInitHandler = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};


export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};


export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());

        let dbOrders = [];
        axiosOrder.get('/orders.json')
                    .then(res => {
                        for(let key in res.data) {
                            dbOrders.push({
                                ...res.data[key],
                                id: key
                            });
                        }

                        dispatch(fetchOrdersSuccess(dbOrders));
                    })
                    .catch(error => {
                        dispatch(fetchOrdersFail(error));
                    });
    };
}