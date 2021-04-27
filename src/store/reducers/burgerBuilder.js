import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingridients: null,
    totalPrice: 4.0,
    error: false
}

const INGRIDIENT_PRICES = {
    salad: 50.55,
    bacon: 90.35,
    cheese: 70.167,
    meat: 200.199
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionType.ADD_INGRIDIENT:
            const aUpdatedIngridientProp = {[action.ingridientName]: state.ingridients[action.ingridientName] + 1};
            const aUpdatedIngridients = updateObject(state.ingridients, aUpdatedIngridientProp);
            const aUpdatedState = {
                ingridients: aUpdatedIngridients,
                totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingridientName] 
            };

            return updateObject(state, aUpdatedState);

        case actionType.REMOVE_INGRIDIENT:
            const rUpdatedIngridientProp = {[action.ingridientName]: state.ingridients[action.ingridientName] + 1};
            const rUpdatedIngridients = updateObject(state.ingridients, rUpdatedIngridientProp);
            const rUpdatedState = {
                ingridients: rUpdatedIngridients,
                totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingridientName] 
            };

            return updateObject(state, rUpdatedState);

        case actionType.INIT_INGRIDIENTS:
            const initUpdatedState = {
                ingridients: action.ingridents,
                totalPrice: 4.0,
                error: false
            };

            return updateObject(state, initUpdatedState);
    
        case actionType.FETCH_INGRIDIENTS_FAILED:
            return updateObject(state, { error: true });

        default:
            return state;
    }
}

export default reducer;
