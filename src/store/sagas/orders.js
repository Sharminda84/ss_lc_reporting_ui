import { call, put } from 'redux-saga/effects';
import {
    loadDailyOrdersData, loadTodaysOrdersData, loadWeeklyOrdersData, loadMonthlyOrdersData,
    loadOrdersData, loadTopCards, loadCardDesignsSalesInDateRange, loadSalesReport, loadSalesFunnels,
} from '../actions/orders';
import _ from 'lodash';
import { sendGetRequest, sendPostRequest } from '../networkUtils';
import * as ReportingServerURLs from './ReportingServerURLs';
import * as globalActions from "../actions/global";
import {NOTIFICATION_INFO} from "../../ReportingUIConstants";

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
        yield put(globalActions.setNotification(NOTIFICATION_INFO, 'Loading Orders...'));

        const fetchMembersURL = ReportingServerURLs.FETCH_DAILY_ORDERS;
        const payload = {
            date: action.payload,
        }
        const orders = yield call(sendPostRequest, fetchMembersURL, payload);
        const sortedOrders = _.orderBy(orders, order => order.tranTime, 'desc');

        const startOfDay = calculateStartOfDay(action.payload);
        const fetchAdsCampaignDataURL = ReportingServerURLs.FETCH_AD_CAMPAIGNS_DATA + `?fromDate=${startOfDay}&toDate=${action.payload}`;
        const adCampaignsData = yield call(sendGetRequest, fetchAdsCampaignDataURL);

        yield put(loadDailyOrdersData(action.payload, sortedOrders, adCampaignsData));

        yield put(globalActions.clearNotification());
    } catch (error) {
        console.log(error);
    }
}

export function* fetchTodaysOrders() {
    try {
        yield put(globalActions.setNotification(NOTIFICATION_INFO, 'Loading Orders...'));

        const fetchMembersURL = ReportingServerURLs.FETCH_TODAYS_ORDERS;
        const orders = yield call(sendGetRequest, fetchMembersURL);
        const sortedOrders = _.orderBy(orders, order => order.tranTime, 'desc');

        const currentTime = new Date().getTime();
        const startOfDay = calculateStartOfDay(currentTime);
        const fetchAdsCampaignDataURL = ReportingServerURLs.FETCH_AD_CAMPAIGNS_DATA + `?fromDate=${startOfDay}&toDate=${currentTime}`;
        const adCampaignsData = yield call(sendGetRequest, fetchAdsCampaignDataURL);

        yield put(loadTodaysOrdersData(sortedOrders, adCampaignsData));

        yield put(globalActions.clearNotification());
    } catch (error) {
        console.log(error);
    }
}

export function* fetchWeeklyOrders(action) {
    try {
        yield put(globalActions.setNotification(NOTIFICATION_INFO, 'Loading Orders...'));

        const fetchMembersURL = ReportingServerURLs.FETCH_WEEKLY_ORDERS + `?fromDate=${action.payload.fromDate}`;
        const orders = yield call(sendGetRequest, fetchMembersURL);
        const sortedOrders = _.orderBy(orders, order => order.tranTime, 'desc');

        const start = calculateStartOfDay(action.payload.fromDate) - 7 * 24 * 60 * 60 * 1000;
        const fetchAdsCampaignDataURL = ReportingServerURLs.FETCH_AD_CAMPAIGNS_DATA + `?fromDate=${start}&toDate=${action.payload.fromDate}`;
        const adCampaignsData = yield call(sendGetRequest, fetchAdsCampaignDataURL);

        yield put(loadWeeklyOrdersData(sortedOrders, adCampaignsData));

        yield put(globalActions.clearNotification());
    } catch (error) {
        console.log(error);
    }
}

export function* fetchMonthlyOrders(action) {
    try {
        yield put(globalActions.setNotification(NOTIFICATION_INFO, 'Loading Orders...'));

        const fetchMembersURL = ReportingServerURLs.FETCH_MONTHLY_ORDERS + `?fromDate=${action.payload.fromDate}`;
        const orders = yield call(sendGetRequest, fetchMembersURL);
        const sortedOrders = _.orderBy(orders, order => order.tranTime, 'desc');

        const start = calculateStartOfDay(action.payload.fromDate) - 30 * 24 * 60 * 60 * 1000;
        const fetchAdsCampaignDataURL = ReportingServerURLs.FETCH_AD_CAMPAIGNS_DATA + `?fromDate=${start}&toDate=${action.payload.fromDate}`;
        const adCampaignsData = yield call(sendGetRequest, fetchAdsCampaignDataURL);

        yield put(loadMonthlyOrdersData(sortedOrders, adCampaignsData));

        yield put(globalActions.clearNotification());
    } catch (error) {
        console.log(error);
    }
}

export function* fetchAllOrders() {
    try {
        yield put(globalActions.setNotification(NOTIFICATION_INFO, 'Loading Orders...'));

        const fetchMembersURL = ReportingServerURLs.FETCH_ALL_ORDERS;
        const orders = yield call(sendGetRequest, fetchMembersURL);
        const sortedOrders = _.orderBy(orders, order => order.tranTime, 'desc');

        const start = 1514764800000;
        const fetchAdsCampaignDataURL = ReportingServerURLs.FETCH_AD_CAMPAIGNS_DATA + `?fromDate=${start}&toDate=${new Date().getTime()}`;
        const adCampaignsData = yield call(sendGetRequest, fetchAdsCampaignDataURL);

        yield put(loadOrdersData(sortedOrders, adCampaignsData));

        yield put(globalActions.clearNotification());
    } catch (error) {
        console.log(error);
    }
}

export function* fetchTopCards() {
    try {
        const toDate = new Date().getTime();
        const fromDate = toDate - 7 * 24 * 60 * 60 * 1000;
        const fetchCardSalesURL = ReportingServerURLs.FETCH_CARD_DESIGNS_SALES_IN_DATE_RANGE + `?fromDate=${fromDate}&toDate=${toDate}`;
        const topCards = yield call(sendGetRequest, fetchCardSalesURL);
        yield put(loadTopCards(topCards));
    } catch (error) {
        console.log(error);
    }
}

export function* fetchCardSalesInDateRange(action) {
    try {
        yield put(globalActions.setNotification(NOTIFICATION_INFO, 'Loading Top Cards...'));

        const fetchCardSalesURL = ReportingServerURLs.FETCH_CARD_DESIGNS_SALES_IN_DATE_RANGE + `?fromDate=${action.payload.fromDate}&toDate=${action.payload.toDate}`;
        const cardSales = yield call(sendGetRequest, fetchCardSalesURL);
        const fetchCardViewsURL = ReportingServerURLs.FETCH_CARD_VIEWS_IN_DATE_RANGE + `?fromDate=${action.payload.fromDate}&toDate=${action.payload.toDate}`;
        const cardViews = yield call(sendGetRequest, fetchCardViewsURL);
        yield put(loadCardDesignsSalesInDateRange(cardSales, cardViews));

        yield put(globalActions.clearNotification());
    } catch (error) {
        console.log(error);
    }
}

export function* fetchSalesReport() {
    try {
        const salesReport = yield call(sendGetRequest, ReportingServerURLs.FETCH_SALES_REPORT);
        yield put(loadSalesReport(salesReport));
    } catch (error) {
        console.log(error);
    }
}

export function* fetchSalesFunnels(action) {
    try {
        yield put(globalActions.setNotification(NOTIFICATION_INFO, 'Loading Sales Funnels...'));

        const from = calculateStartOfDay(action.payload.fromDate);
        const to = calculateStartOfDay(action.payload.toDate);
        const salesReport = yield call(sendGetRequest, ReportingServerURLs.FETCH_SALES_FUNNELS +`?fromDate=${from}&toDate=${to}`);
        yield put(loadSalesFunnels(salesReport));

        yield put(globalActions.clearNotification());
    } catch (error) {
        console.log(error);
    }
}
