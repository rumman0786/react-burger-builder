import * as ActionType from './actionTypes';

export const authStart = () => {
    return {
        type: ActionType.AUTH_ORDERS_START
    };
}

export const authSuccess = (authData) => {
    return {
        type: ActionType.AUTH_ORDERS_SUCCESS,
        authData: authData
    };
}

export const authFail = (error) => {
    return {
        type: ActionType.AUTH_ORDERS_FAIL,
        error: error
    };
}

export const authenticate = () => {
    return dispatch => {
        dispatch(authStart());
    }
}