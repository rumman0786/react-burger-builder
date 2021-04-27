import * as actionTypes from './actionTypes';
import axiosOrder from '../../axios-orders';

export const addIngridient = (name) => {
    return {
        type: actionTypes.ADD_INGRIDIENT,
        ingridientName: name
    };
}

export const removeIngridient = (name) => {
    return {
        type: actionTypes.REMOVE_INGRIDIENT,
        ingridientName: name
    };
}

const setIngridient = (ingridents) => {
    return {
        type: actionTypes.INIT_INGRIDIENTS,
        ingridents: ingridents
    };
};

export const fetchIngridientsFailedHandler = () => {
    return {
        type: actionTypes.FETCH_INGRIDIENTS_FAILED
    };
};

export const initIngridients = () => {
    return dispatch => {
        axiosOrder.get("/ingridients.json")
        .then(response => dispatch(setIngridient(response.data)))
        .catch(error => {
            dispatch(fetchIngridientsFailedHandler())
        });
        
    };
}
