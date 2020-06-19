import { takeEvery } from 'redux-saga/effects';
import { FETCH_REVENUE_DATA } from '../actions/revenue';
import { FETCH_MEMBERS_DATA } from '../actions/members';
import { FETCH_DAILY_ORDERS_DATA, FETCH_WEEKLY_ORDERS_DATA, FETCH_MONTHLY_ORDERS_DATA, FETCH_ORDERS_DATA } from '../actions/orders';
import { TRIGGER_LOGIN } from '../actions/security';
import { fetchRevenueDataSaga } from './revenue';
import { fetchMemberSignups } from './members';
import { fetchDailyOrders, fetchWeeklyOrders, fetchMonthlyOrders, fetchAllOrders } from './orders';
import { loginUser } from './security';

export function* watchRevenueActions() {
    yield takeEvery(FETCH_REVENUE_DATA, fetchRevenueDataSaga);
}

export function* watchMembersActions() {
    yield takeEvery(FETCH_MEMBERS_DATA, fetchMemberSignups);
}

export function* watchDailyOrdersAction() {
    yield takeEvery(FETCH_DAILY_ORDERS_DATA, fetchDailyOrders);
}

export function* watchWeeklyOrdersAction() {
    yield takeEvery(FETCH_WEEKLY_ORDERS_DATA, fetchWeeklyOrders);
}

export function* watchMonthlyOrdersAction() {
    yield takeEvery(FETCH_MONTHLY_ORDERS_DATA, fetchMonthlyOrders);
}

export function* watchOrdersAction() {
    yield takeEvery(FETCH_ORDERS_DATA, fetchAllOrders);
}

export function* watchLoginAction() {
    yield takeEvery(TRIGGER_LOGIN, loginUser)
}