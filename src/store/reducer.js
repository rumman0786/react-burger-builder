import * as actionType from './actions';

const initialState = {
    ingridients: null,
    totalPrice: 4.0
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionType.ADD_INGRIDIENT:
            return {

            };

        case actionType.REMOVE_INGRIDIENT:
            return {

            };

        default:
            return state;
    }
    
    return state;
}

export default reducer;