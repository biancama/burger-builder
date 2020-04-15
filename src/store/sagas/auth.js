import axios from 'axios'

import { put, delay, call } from 'redux-saga/effects';
import * as actions from '../actions';

export function* logOutSaga() {
    yield call ([localStorage, 'removeItem'], 'token')
    yield call ([localStorage, 'removeItem'], 'expirationDate')
    yield call ([localStorage, 'removeItem'], 'userID')
    yield put (actions.logOutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logOut()); //
} 

export function* authUserSaga(action) {
    yield put (actions.authStart())
    const authData= {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAcCxK7Pa_PoKqEIKHN7pXuazhSzHR-K7U '
    if (!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAcCxK7Pa_PoKqEIKHN7pXuazhSzHR-K7U '
    }
    try {
        const response = yield axios.post(url, authData)
    
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken)
        yield localStorage.setItem('expirationDate', expirationDate)
        yield localStorage.setItem('userID', response.data.localId)
        yield put(actions.authSuccess(response.data.idToken, response.data.localId))
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
    } catch (error) {
        yield put (actions.authFail(error.response.data.error))
    }
}


export function* authCheckStateSaga() {
    const token = yield localStorage.getItem('token')
    if (!token) {
        yield put(actions.logOut())
    } else {        
        const expirationTime = yield new Date(localStorage.getItem('expirationDate'))
        if (expirationTime <= new Date()) {
            yield put(actions.logOut())
        } else {
            const userID = yield localStorage.getItem('userID')
            yield put(actions.authSuccess(token, userID))
            yield put(actions.checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000 ))	
        }
    }
}