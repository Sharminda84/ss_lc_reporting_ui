import { call, put } from 'redux-saga/effects';
import { loadTags } from '../actions/cardTags';
import { sendGetRequest } from '../networkUtils';
import * as ReportingServerURLs from './ReportingServerURLs';

export function* fetchTags() {
    try {
        const fetchTagsURL = encodeURI(ReportingServerURLs.FETCH_CARD_TAGS);
        const tags = yield call(sendGetRequest, fetchTagsURL);
        yield put(loadTags(tags));
    } catch (error) {
        console.log(`Error fetching card tags [${error}}]`);
    }
}
