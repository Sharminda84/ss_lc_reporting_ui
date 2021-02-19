import { call, put } from 'redux-saga/effects';
import {
    loadDailyOrdersData, loadTodaysOrdersData, loadWeeklyOrdersData, loadMonthlyOrdersData,
    loadOrdersData, loadTopCards }
from '../actions/orders';
import _ from 'lodash';
import { sendGetRequest, sendPostRequest } from '../networkUtils';
import * as ReportingServerURLs from "./ReportingServerURLs";

export function* fetchDailyOrders(action) {
    try {
        const fetchMembersURL = ReportingServerURLs.FETCH_DAILY_ORDERS;
        const payload = {
            date: action.payload,
        }
        const orders = yield call(sendPostRequest, fetchMembersURL, payload);
        const sortedOrders = _.orderBy(orders, order => order.transactionTime, 'desc');
        yield put(loadDailyOrdersData(action.payload, sortedOrders));
    } catch (error) {
        console.log(error);
    }
}

export function* fetchTodaysOrders() {
    try {
        const fetchMembersURL = ReportingServerURLs.FETCH_TODAYS_ORDERS;
        const orders = yield call(sendGetRequest, fetchMembersURL);
        const sortedOrders = _.orderBy(orders, order => order.transactionTime, 'desc');
        yield put(loadTodaysOrdersData(sortedOrders));
    } catch (error) {
        console.log(error);
    }
}

export function* fetchWeeklyOrders(action) {
    try {
        const fetchMembersURL = ReportingServerURLs.FETCH_WEEKLY_ORDERS + `?fromDate=${action.payload.fromDate}`;
        const orders = yield call(sendGetRequest, fetchMembersURL);
        const sortedOrders = _.orderBy(orders, order => order.transactionTime, 'desc');
        yield put(loadWeeklyOrdersData(sortedOrders));
    } catch (error) {
        console.log(error);
    }
}

export function* fetchMonthlyOrders(action) {
    try {
        const fetchMembersURL = ReportingServerURLs.FETCH_MONTHLY_ORDERS + `?fromDate=${action.payload.fromDate}`;
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

export function* fetchTopCards() {
    try {
        const fetchTopCardsURL = ReportingServerURLs.FETCH_TOP_CARDS;
        const topCards = yield call(sendGetRequest, fetchTopCardsURL);
        yield put(loadTopCards(topCards));
    } catch (error) {
        console.log(error);
    }
}
