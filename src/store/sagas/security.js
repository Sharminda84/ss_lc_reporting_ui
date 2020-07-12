import { put, call } from 'redux-saga/effects';
import { loginSuccess, loginError } from '../actions/security';
import { fetchCardInfo } from '../actions/refData';
import { fetchTopCards} from '../actions/orders';
import axios from 'axios';
import * as ReportingServerURLs from './ReportingServerURLs';

export function* loginUser(action) {
    const user = action.payload.user;
    const password = action.payload.password;
    try {
        yield call(sendLogInRequest, user, password);
        yield put(loginSuccess(user, password));
        yield put(fetchCardInfo());
        yield put(fetchTopCards());
    } catch (error) {
        yield put(loginError());
    }
}

const sendLogInRequest = (user, password) => {
    const config = {
        auth: {
            username: user,
            password: password,
        },
    };

    return axios
        .get(ReportingServerURLs.PING_URL, config)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Login not successfull');
            }
            return 'Login Success';
        });
};
