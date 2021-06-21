import { put, call } from 'redux-saga/effects';
import { loginSuccess, loginError } from '../actions/security';
import { fetchCardInfo, fetchCardDesignCounts } from '../actions/refData';
import { fetchSalesReport, fetchTopCards } from '../actions/orders';
import { fetchCardsForMembers } from '../actions/members';
import axios from 'axios';
import * as ReportingServerURLs from './ReportingServerURLs';
import { getStartOfTodayInMillis } from '../../utils';
import * as globalActions from "../actions/global";
import {NOTIFICATION_INFO} from "../../ReportingUIConstants";

export function* loginUser(action) {
    const user = action.payload.user;
    const password = action.payload.password;
    try {
        const loginResponse = yield call(sendLogInRequest, user, password);
        yield put(loginSuccess(loginResponse.jwt, loginResponse.userRoles));
        yield put(globalActions.setNotification(NOTIFICATION_INFO, 'Loading Application Data...'));
        if (loginResponse.userRoles.length === 1 && loginResponse.userRoles[0] === 'ROLE_ADMIN') {
            yield put(fetchCardInfo());
            yield put(fetchTopCards());
            yield put(fetchCardsForMembers(getStartOfTodayInMillis()));
            yield put(fetchCardDesignCounts());
            yield put(fetchSalesReport());
        } else if (loginResponse.userRoles.length === 1 && loginResponse.userRoles[0] === 'ROLE_INVESTOR') {
            yield put(fetchSalesReport());
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
                //userRoles: response.data.roles,
                userRoles: ["ROLE_INVESTOR"],
            };
        });
};
