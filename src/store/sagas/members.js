import { call, put } from 'redux-saga/effects';
import { loadMembersData } from '../actions/members';
import { sendGetRequest } from '../networkUtils';
import * as ReportingServerURLs from './ReportingServerURLs';

export function* fetchMemberSignups(action) {
    try {
        const fetchMembersURL = `${ReportingServerURLs.FETCH_ALL_MEMBERS_URL}`;
        const members = yield call(sendGetRequest, fetchMembersURL);
        yield put(loadMembersData(members));
    } catch (error) {
        console.log('ERROR.....');
    }
}