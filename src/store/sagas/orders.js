import { call, put, select } from 'redux-saga/effects';
import { loadDailyOrdersData, loadWeeklyOrdersData, loadMonthlyOrdersData, loadOrdersData } from '../actions/orders';
import _ from 'lodash';
import allOrders from './static-data/orders.json';

function fetchOrdersStaticFile(startDate, endDate) {
    return _.orderBy(allOrders, order => order.transactionTime, 'desc');
}

export function* fetchDailyOrders() {
    const startDate = new Date();
    const endDate = new Date(new Date().getTime() + 24*60*60*1000);
    const orders = fetchOrdersStaticFile(startDate, endDate);
    yield put(loadDailyOrdersData(orders));
}

export function* fetchWeeklyOrders() {
    const startDate = new Date(new Date().getTime() - 7*24*60*60*1000);
    const endDate = new Date();
    const orders = fetchOrdersStaticFile(startDate, endDate);
    yield put(loadWeeklyOrdersData(orders));
}

export function* fetchMonthlyOrders() {
    const startDate = new Date(new Date().getTime() - 31*24*60*60*1000);
    const endDate = new Date();
    const orders = fetchOrdersStaticFile(startDate, endDate);
    yield put(loadMonthlyOrdersData(orders));
}

export function* fetchAllOrders(action) {
    const orders = fetchOrdersStaticFile(null, null);
    yield put(loadOrdersData(orders));
}
