import * as ActionType from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: ActionType.AUTH_ORDERS_START
    };
}

export const authSuccess = (token, userId) => {
    return {
        type: ActionType.AUTH_ORDERS_SUCCESS,
        idToken: token,
        userId: userId
    };
}

export const authFail = (error) => {
    return {
        type: ActionType.AUTH_ORDERS_FAIL,
        error: error
    };
}

export const logout = () => {
    return {
        type: ActionType.AUTH_ORDERS_LOGOUT,
    };
}

export const checkAuth = (expireTime) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout());
        }, expireTime * 1000)
    };
}

export const authenticate = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD1s7srmeAr57Qb-XxhuAtKeRhQo3psSEI';
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD1s7srmeAr57Qb-XxhuAtKeRhQo3psSEI'
        }

        axios.post(url, authData)
        .then(response => {
            console.log(response.data);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuth(response.data.expiresIn));
        })
        .catch(error => {
            console.log(error.response.data.error);
            dispatch(authFail(error.response.data.error));
        });
    }
}
