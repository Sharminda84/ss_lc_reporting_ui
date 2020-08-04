import { call, put } from 'redux-saga/effects';
import { loadMembersData, loadCardsForMembers } from '../actions/members';
import { sendGetRequest } from '../networkUtils';
import * as ReportingServerURLs from './ReportingServerURLs';

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

export function* fetchCardsForMembers() {
    try {
        const fetchCardsForMembersURL = encodeURI(`${ReportingServerURLs.FETCH_CARDS_FOR_MEMBERS_URL}`);
        const cards = yield call(sendGetRequest, fetchCardsForMembersURL);
        yield put(loadCardsForMembers(cards));
    } catch (error) {
        console.log(`Error while fetching cards for members: ${error}`);
    }
}