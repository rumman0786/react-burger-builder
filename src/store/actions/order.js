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
                    console.log(response.data);
                    dispatch(purchaseBurgerSuccessHandler(response.data, orderData))
                  })
                  .catch(error => {
                    dispatch(purchaseBurgerFailureHandler(error))
                  });
    }
};
