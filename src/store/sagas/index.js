import { takeEvery } from 'redux-saga/effects';
import { FETCH_MEMBERS_DATA, FETCH_CARDS_FOR_MEMBERS } from '../actions/members';
import {
    FETCH_TODAYS_ORDERS_DATA, FETCH_DAILY_ORDERS_DATA, FETCH_WEEKLY_ORDERS_DATA, FETCH_MONTHLY_ORDERS_DATA,
    FETCH_ORDERS_DATA, FETCH_TOP_CARDS, FETCH_CARD_DESIGNS_SALES_IN_DATE_RANGE, FETCH_SALES_REPORT
} from '../actions/orders';
import { TRIGGER_LOGIN } from '../actions/security';
import { FETCH_CARD_INFO, FETCH_CARD_DESIGN_COUNTS } from '../actions/refData';
import { fetchMemberSignups, fetchCardsForMembers } from './members';
import {
    fetchDailyOrders, fetchTodaysOrders, fetchWeeklyOrders, fetchMonthlyOrders, fetchAllOrders,
    fetchTopCards, fetchTopCardsInDateRange, fetchSalesReport,
} from './orders';
import { loginUser } from './security';
import { fetchCardInfo, fetchCardDesignCounts } from './refData';

export function* watchMembersActions() {
    yield takeEvery(FETCH_MEMBERS_DATA, fetchMemberSignups);
}

export function* watchCardsForMemberActions() {
    yield takeEvery(FETCH_CARDS_FOR_MEMBERS, fetchCardsForMembers);
}

export function* watchTodaysOrdersAction() {
    yield takeEvery(FETCH_TODAYS_ORDERS_DATA, fetchTodaysOrders);
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

export function* watchFetchCardInfoAction() {
    yield takeEvery(FETCH_CARD_INFO, fetchCardInfo);
}

export function* watchFetchTopCardsAction() {
    yield takeEvery(FETCH_TOP_CARDS, fetchTopCards);
}

export function* watchFetchTopCardsInDateRangeAction() {
    yield takeEvery(FETCH_CARD_DESIGNS_SALES_IN_DATE_RANGE, fetchTopCardsInDateRange);
}

export function* watchFetchCardDesignCountsAction() {
    yield takeEvery(FETCH_CARD_DESIGN_COUNTS, fetchCardDesignCounts);
}

export function* watchFetchSalesReportAction() {
    yield takeEvery(FETCH_SALES_REPORT, fetchSalesReport);
}
