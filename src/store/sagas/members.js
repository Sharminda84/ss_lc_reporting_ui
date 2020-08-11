import { call, put } from 'redux-saga/effects';
import { loadMembersData, loadCardsForMembers } from '../actions/members';
import { sendGetRequest } from '../networkUtils';
import * as ReportingServerURLs from './ReportingServerURLs';

export function* fetchMemberSignups(action) {
    try {
        // The time stamps have the time component to current time.
        // For start time, set time to 00:00:00:000
        let startDate = new Date(action.payload.startDate);
        startDate.setHours(0, 0, 0, 0);
        startDate = startDate.getTime();

        // For end time, set time to 23:59:59:999
        let endDate = new Date(action.payload.endDate);
        endDate.setHours(23, 59, 59, 999);
        endDate = endDate.getTime();

        const fetchMembersURL = encodeURI(`${ReportingServerURLs.FETCH_ALL_MEMBERS_URL}?from=${startDate}&to=${endDate}`);
        const members = yield call(sendGetRequest, fetchMembersURL);
        yield put(loadMembersData(members));
    } catch (error) {
        console.log('ERROR.....');
    }
}

export function* fetchCardsForMembers() {
    try {
        const fetchCardsForMembersURL = encodeURI(`${ReportingServerURLs.FETCH_CARDS_FOR_MEMBERS_URL}`);
        const cards = yield call(sendGetRequest, fetchCardsForMembersURL);
        yield put(loadCardsForMembers(cards));
    } catch (error) {
        console.log(`Error while fetching cards for members: ${error}`);
    }
}