import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingridients: null,
    totalPrice: 4.0,
    error: false,
    building: false
}

const INGRIDIENT_PRICES = {
    salad: 50.55,
    bacon: 90.35,
    cheese: 70.167,
    meat: 200.199
}

const addIngridient = (state, action) => {
    const aUpdatedIngridientProp = {[action.ingridientName]: state.ingridients[action.ingridientName] + 1};
    const aUpdatedIngridients = updateObject(state.ingridients, aUpdatedIngridientProp);
    const aUpdatedState = {
        ingridients: aUpdatedIngridients,
        totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingridientName],
        building: true
    };

    return updateObject(state, aUpdatedState);
}

const removeIngridient = (state, action) => {
    const rUpdatedIngridientProp = {[action.ingridientName]: state.ingridients[action.ingridientName] + 1};
    const rUpdatedIngridients = updateObject(state.ingridients, rUpdatedIngridientProp);
    const rUpdatedState = {
        ingridients: rUpdatedIngridients,
        totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingridientName],
        building: true
    };

    return updateObject(state, rUpdatedState);
}


const initIngridient = (state, action) => {
    const initUpdatedState = {
        ingridients: action.ingridents,
        totalPrice: 4.0,
        error: false,
        building: false
    };

    return updateObject(state, initUpdatedState);
}

const fetchIngridientFailed = (state) => {
    return updateObject(state, { error: true })
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionType.ADD_INGRIDIENT: return addIngridient(state, action);
        case actionType.REMOVE_INGRIDIENT: return removeIngridient(state, action);
        case actionType.INIT_INGRIDIENTS: return initIngridient(state, action);
        case actionType.FETCH_INGRIDIENTS_FAILED: return fetchIngridientFailed(state);
        default: return state;
    }
}

export default reducer;
