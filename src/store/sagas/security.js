import { put, call } from 'redux-saga/effects';
import { loginSuccess, loginError } from '../actions/security';
import { fetchCardInfo, fetchCardDesignCounts } from '../actions/refData';
import { fetchTopCards} from '../actions/orders';
import { fetchCardsForMembers } from '../actions/members';
import axios from 'axios';
import * as ReportingServerURLs from './ReportingServerURLs';
import { getStartOfTodayInMillis } from '../../utils';

export function* loginUser(action) {
    const user = action.payload.user;
    const password = action.payload.password;
    try {
        const loginResponse = yield call(sendLogInRequest, user, password);
        yield put(loginSuccess(loginResponse.jwt, loginResponse.userRoles));
        yield put(fetchCardInfo());
        yield put(fetchTopCards());
        yield put(fetchCardsForMembers(getStartOfTodayInMillis()));
        yield put(fetchCardDesignCounts());
    } catch (error) {
        yield put(loginError());
    }
}

const sendLogInRequest = (user, password) => {
    const payload = {
        username: user,
        password: password,
    };

    return axios
        .post(ReportingServerURLs.LOGIN_URL, payload)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Login not successfull');
            }
            return {
                jwt: response.data.token,
                userRoles: response.data.roles,
            };
        });
};
