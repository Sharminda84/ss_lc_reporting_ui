import { call, put } from 'redux-saga/effects';
import { loadDailyOrdersData, loadWeeklyOrdersData, loadMonthlyOrdersData, loadOrdersData } from '../actions/orders';
import _ from 'lodash';
import { sendGetRequest } from '../networkUtils';
import * as ReportingServerURLs from "./ReportingServerURLs";

export function* fetchDailyOrders() {
    try {
        const fetchMembersURL = ReportingServerURLs.FETCH_TODAYS_ORDERS;
        const orders = yield call(sendGetRequest, fetchMembersURL);
        const sortedOrders = _.orderBy(orders, order => order.transactionTime, 'desc');
        yield put(loadDailyOrdersData(sortedOrders));
    } catch (error) {
        console.log(error);
    }
}

export function* fetchWeeklyOrders() {
    try {
        const fetchMembersURL = ReportingServerURLs.FETCH_WEEKLY_ORDERS;
        const orders = yield call(sendGetRequest, fetchMembersURL);
        const sortedOrders = _.orderBy(orders, order => order.transactionTime, 'desc');
        yield put(loadWeeklyOrdersData(sortedOrders));
    } catch (error) {
        console.log(error);
    }
}

export function* fetchMonthlyOrders() {
    try {
        const fetchMembersURL = ReportingServerURLs.FETCH_MONTHLY_ORDERS;
        const orders = yield call(sendGetRequest, fetchMembersURL);
        const sortedOrders = _.orderBy(orders, order => order.transactionTime, 'desc');
        yield put(loadMonthlyOrdersData(sortedOrders));
    } catch (error) {
        console.log(error);
    }
}

export function* fetchAllOrders() {
    try {
        const fetchMembersURL = ReportingServerURLs.FETCH_ALL_ORDERS;
        const orders = yield call(sendGetRequest, fetchMembersURL);
        const sortedOrders = _.orderBy(orders, order => order.transactionTime, 'desc');
        yield put(loadOrdersData(sortedOrders));
    } catch (error) {
        console.log(error);
    }
}
