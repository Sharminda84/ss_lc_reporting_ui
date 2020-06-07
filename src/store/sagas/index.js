import { takeEvery } from 'redux-saga/effects';
import { takeFirst } from './effects';
import { FETCH_REVENUE_DATA } from '../actions/revenue';
import { FETCH_MEMBERS_DATA } from '../actions/members';
import { fetchRevenueDataSaga } from './revenue';
import { fetchMemberSignups } from './members';


export function* watchRevenueActions() {
    yield takeEvery(FETCH_REVENUE_DATA, fetchRevenueDataSaga);
}

export function* watchMembersActions() {
    yield takeEvery(FETCH_MEMBERS_DATA, fetchMemberSignups)
}