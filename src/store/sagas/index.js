import { takeEvery } from 'redux-saga/effects';
import { takeFirst } from './effects';
import { FETCH_REVENUE_DATA } from '../actions/revenue';
import { fetchRevenueDataSaga } from './revenue';

export function* watchRevenueActions() {
    yield takeEvery(FETCH_REVENUE_DATA, fetchRevenueDataSaga);
}
