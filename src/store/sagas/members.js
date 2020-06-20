import { call, put, select } from 'redux-saga/effects';
import { loadMembersData } from '../actions/members';
import _ from 'lodash';
import { sendGetRequest } from '../networkUtils';
import * as ReportingServerURLs from './ReportingServerURLs';

export function* fetchMemberSignups(action) {
    try {
        const fetchMembersURL = `${ReportingServerURLs.FETCH_ALL_MEMBERS_URL}`;
        const members = yield call(sendGetRequest, fetchMembersURL);
        const membersSorted = _.orderBy(members, member => member.joined, 'asc');
        yield put(loadMembersData(membersSorted));
    } catch (error) {
        console.log('ERROR.....');
    }
}