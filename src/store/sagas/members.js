import { call, put } from 'redux-saga/effects';
import { loadMembersData } from '../actions/members';
import { sendGetRequest } from '../networkUtils';
import * as ReportingServerURLs from './ReportingServerURLs';
import { dateToString } from '../../utils';

export function* fetchMemberSignups(action) {
    try {
        const startDate = action.payload.startDate;
        const endDate = action.payload.endDate;
        const fetchMembersURL = encodeURI(`${ReportingServerURLs.FETCH_ALL_MEMBERS_URL}?from=${startDate}&to=${endDate}`);
        const members = yield call(sendGetRequest, fetchMembersURL);
        yield put(loadMembersData(members));
    } catch (error) {
        console.log('ERROR.....');
    }
}