import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const authStart = (state, action) => {
    return updateObject(state, {loading: true, error: null})
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        loading: false,
        error: null
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.AUTH_ORDERS_START: return authStart(state, action);
        case actionType.AUTH_ORDERS_SUCCESS: return authSuccess(state, action);
        case actionType.AUTH_ORDERS_FAIL: return authFail(state, action);
        default: return state;
    }
}

export default reducer;
