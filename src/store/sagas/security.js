import { put, call } from 'redux-saga/effects';
import { loginSuccess, loginError } from '../actions/security';
import { fetchCardInfo, fetchCardDesignCounts } from '../actions/refData';
import { fetchSalesReport, fetchTopCards } from '../actions/orders';
import { fetchCardsForMembers } from '../actions/members';
import { fetchTags } from '../actions/cardTags';
import { fetchAdMetrics } from '../actions/adAnalytics';
import * as globalActions from "../actions/global";
import { getStartOfTodayInMillis } from '../../utils';
import { NOTIFICATION_INFO, ROLE_ADMIN, ROLE_TAG_MANAGER } from '../../ReportingUIConstants';
import * as ReportingServerURLs from './ReportingServerURLs';
import axios from 'axios';

export function* loginUser(action) {
    const user = action.payload.user;
    const password = action.payload.password;
    try {
        const loginResponse = yield call(sendLogInRequest, user, password);
        yield put(loginSuccess(loginResponse.jwt, loginResponse.userRoles));

        yield put(globalActions.setNotification(NOTIFICATION_INFO, 'Loading Application Data...'));

        yield put(fetchCardDesignCounts());
        yield put(fetchSalesReport());

        if (loginResponse.userRoles.includes(ROLE_ADMIN)) {
            yield put(fetchCardInfo());
            yield put(fetchTopCards());
            yield put(fetchCardsForMembers(getStartOfTodayInMillis()));
            yield put(fetchCardDesignCounts());
            yield put(fetchSalesReport());
            yield put(fetchAdMetrics());
        }

        if (loginResponse.userRoles.includes(ROLE_TAG_MANAGER)) {
            yield put(fetchTags());
        }

        yield put(globalActions.clearNotification());
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
