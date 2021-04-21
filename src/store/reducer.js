import * as actionType from './actions';

const initialState = {
    ingridients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4.0
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionType.ADD_INGRIDIENT:
            return {
                ...state,
                ingridients : {
                    ...state.ingridients,
                    [action.ingridientName]: state.ingridients[action.ingridientName] + 1
                }
            };

        case actionType.REMOVE_INGRIDIENT:
            return {
                ...state,
                ingridients : {
                    ...state.ingridients,
                    [action.ingridientName]: state.ingridients[action.ingridientName] - 1
                }
            };

        default:
            return state;
    }

    return state;
}

export default reducer;
