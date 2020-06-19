import { put } from 'redux-saga/effects';
import { loginSuccess, loginError } from '../actions/security';

export function* loginUser(action) {
    const loginStatus = action.payload.user === 'test' && action.payload.password === 'test';

    if (loginStatus) {
        yield put(loginSuccess());
    } else {
        yield put(loginError());
    }
}
