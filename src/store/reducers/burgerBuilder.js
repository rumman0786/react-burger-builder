import * as actionType from '../actions/actionTypes';

const initialState = {
    ingridients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4.0
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
            return {
                ...state,
                ingridients : {
                    ...state.ingridients,
                    [action.ingridientName]: state.ingridients[action.ingridientName] + 1
                },
                totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingridientName]
            };

        case actionType.REMOVE_INGRIDIENT:
            return {
                ...state,
                ingridients : {
                    ...state.ingridients,
                    [action.ingridientName]: state.ingridients[action.ingridientName] - 1
                },
                totalPrice: state.totalPrice - INGRIDIENT_PRICES[action.ingridientName]
            };

        default:
            return state;
    }

    return state;
}

export default reducer;
