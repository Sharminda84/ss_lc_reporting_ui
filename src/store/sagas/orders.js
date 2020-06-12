import { call, put, select } from 'redux-saga/effects';
import { loadDailyOrdersData, loadWeeklyOrdersData, loadMonthlyOrdersData, loadOrdersData } from '../actions/orders';
import _ from 'lodash';
import allOrders from './static-data/orders.json';

const currentDate = new Date('2020-05-13');

function fetchOrdersStaticFile(startDate, endDate) {
    let filteredOrders = allOrders;
    if (startDate != null && endDate!= null) {
        filteredOrders = filteredOrders
            .filter(order => {
                const tranTime = new Date(order.transactionTime);
                return tranTime >= startDate && tranTime <= endDate;
            });
    }
    return _.orderBy(filteredOrders, order => order.transactionTime, 'desc');
}

export function* fetchDailyOrders() {
    const startDate = currentDate;
    const endDate = new Date(currentDate.getTime() + 24*60*60*1000);
    const orders = fetchOrdersStaticFile(startDate, endDate);
    yield put(loadDailyOrdersData(orders));
}

export function* fetchWeeklyOrders() {
    const startDate = new Date(currentDate.getTime() - 7*24*60*60*1000);
    const endDate = currentDate;
    const orders = fetchOrdersStaticFile(startDate, endDate);
    yield put(loadWeeklyOrdersData(orders));
}

export function* fetchMonthlyOrders() {
    const startDate = new Date(currentDate.getTime() - 31*24*60*60*1000);
    const endDate = currentDate;
    const orders = fetchOrdersStaticFile(startDate, endDate);
    yield put(loadMonthlyOrdersData(orders));
}

export function* fetchAllOrders(action) {
    const orders = fetchOrdersStaticFile(null, null);
    yield put(loadOrdersData(orders));
}
