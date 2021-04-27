import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = (state) => {
    return updateObject(state, {purchased: false});
};

const purchaseStart = (state) => {
    return updateObject(state, {loading: true});
};

const purchaseSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.id
    };

    const updatedState = {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    };

    return updateObject(state, updatedState);
};

const purchaseFail = (state) => {
    return updateObject(state, {loading: false});
};

const fetchOrderStart = (state) => {
    return updateObject(state, {loading: true});
};

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {loading: false, orders: action.orders});
};

const fetchOrderFail = (state) => {
    return updateObject(state, {loading: false});
};

const reducer = (state = initialState, action)  => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state); 
        case actionTypes.PURCHASE_BURGER_START: return purchaseStart(state);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseSuccess(state, action); 
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseFail(state);
        case actionTypes.FETCH_ORDERS_START: return fetchOrderStart(state);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrderFail(state);
        default: return state;
    }
}

export default reducer;
