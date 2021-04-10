import { call, put } from 'redux-saga/effects';
import {
    loadDailyOrdersData, loadTodaysOrdersData, loadWeeklyOrdersData, loadMonthlyOrdersData,
    loadOrdersData, loadTopCards, loadCardDesignsSalesInDateRange
}
    from '../actions/orders';
import _ from 'lodash';
import { sendGetRequest, sendPostRequest } from '../networkUtils';
import * as ReportingServerURLs from "./ReportingServerURLs";

const calculateStartOfDay = timestamp => {
    const startOfDayDate = new Date(timestamp);
    startOfDayDate.setHours(1);
    startOfDayDate.setMinutes(0);
    startOfDayDate.setSeconds(0);
    startOfDayDate.setMilliseconds(0);
    return startOfDayDate.getTime();
}

export function* fetchDailyOrders(action) {
    try {
        const fetchMembersURL = ReportingServerURLs.FETCH_DAILY_ORDERS;
        const payload = {
            date: action.payload,
        }
        const orders = yield call(sendPostRequest, fetchMembersURL, payload);
        const sortedOrders = _.orderBy(orders, order => order.transactionTime, 'desc');

        const startOfDay = calculateStartOfDay(action.payload);
        const fetchAdsCampaignDataURL = ReportingServerURLs.FETCH_AD_CAMPAIGNS_DATA + `?fromDate=${startOfDay}&toDate=${action.payload}`;
        const adCampaignsData = yield call(sendGetRequest, fetchAdsCampaignDataURL);

        yield put(loadDailyOrdersData(action.payload, sortedOrders, adCampaignsData));

    } catch (error) {
        console.log(error);
    }
}

export function* fetchTodaysOrders() {
    try {
        const fetchMembersURL = ReportingServerURLs.FETCH_TODAYS_ORDERS;
        const orders = yield call(sendGetRequest, fetchMembersURL);
        const sortedOrders = _.orderBy(orders, order => order.transactionTime, 'desc');

        const currentTime = new Date().getTime();
        const startOfDay = calculateStartOfDay(currentTime);
        const fetchAdsCampaignDataURL = ReportingServerURLs.FETCH_AD_CAMPAIGNS_DATA + `?fromDate=${startOfDay}&toDate=${currentTime}`;
        const adCampaignsData = yield call(sendGetRequest, fetchAdsCampaignDataURL);

        yield put(loadTodaysOrdersData(sortedOrders, adCampaignsData));
    } catch (error) {
        console.log(error);
    }
}

export function* fetchWeeklyOrders(action) {
    try {
        const fetchMembersURL = ReportingServerURLs.FETCH_WEEKLY_ORDERS + `?fromDate=${action.payload.fromDate}`;
        const orders = yield call(sendGetRequest, fetchMembersURL);
        const sortedOrders = _.orderBy(orders, order => order.transactionTime, 'desc');

        const start = calculateStartOfDay(action.payload.fromDate) - 7 * 24 * 60 * 60 * 1000;
        const fetchAdsCampaignDataURL = ReportingServerURLs.FETCH_AD_CAMPAIGNS_DATA + `?fromDate=${start}&toDate=${action.payload.fromDate}`;
        const adCampaignsData = yield call(sendGetRequest, fetchAdsCampaignDataURL);

        yield put(loadWeeklyOrdersData(sortedOrders, adCampaignsData));
    } catch (error) {
        console.log(error);
    }
}

export function* fetchMonthlyOrders(action) {
    try {
        const fetchMembersURL = ReportingServerURLs.FETCH_MONTHLY_ORDERS + `?fromDate=${action.payload.fromDate}`;
        const orders = yield call(sendGetRequest, fetchMembersURL);
        const sortedOrders = _.orderBy(orders, order => order.transactionTime, 'desc');

        const start = calculateStartOfDay(action.payload.fromDate) - 30 * 24 * 60 * 60 * 1000;
        const fetchAdsCampaignDataURL = ReportingServerURLs.FETCH_AD_CAMPAIGNS_DATA + `?fromDate=${start}&toDate=${action.payload.fromDate}`;
        const adCampaignsData = yield call(sendGetRequest, fetchAdsCampaignDataURL);

        yield put(loadMonthlyOrdersData(sortedOrders, adCampaignsData));
    } catch (error) {
        console.log(error);
    }
}

export function* fetchAllOrders() {
    try {
        const fetchMembersURL = ReportingServerURLs.FETCH_ALL_ORDERS;
        const orders = yield call(sendGetRequest, fetchMembersURL);
        const sortedOrders = _.orderBy(orders, order => order.transactionTime, 'desc');

        const start = 1514764800000;
        const fetchAdsCampaignDataURL = ReportingServerURLs.FETCH_AD_CAMPAIGNS_DATA + `?fromDate=${start}&toDate=${new Date().getTime()}`;
        const adCampaignsData = yield call(sendGetRequest, fetchAdsCampaignDataURL);

        yield put(loadOrdersData(sortedOrders, adCampaignsData));
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

export function* fetchTopCardsInDateRange(action) {
    try {
        const fetchTopCardsURL = ReportingServerURLs.FETCH_CARD_DESIGNS_SALES_IN_DATE_RANGE + `?fromDate=${action.payload.fromDate}&toDate=${action.payload.toDate}`;
        const topCards = yield call(sendGetRequest, fetchTopCardsURL);
        yield put(loadCardDesignsSalesInDateRange(topCards));
    } catch (error) {
        console.log(error);
    }
}
