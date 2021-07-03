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

export function* createTag(action) {
    console.log('GOING TO CREATE TAG: ' + action.payload.tagText);
    // TODO
    // 1. Send the request to the server to create the tag
    // 2. Get the response from the server (new tag) and add it back to the state
}

export function* updateTag(action) {
    console.log('GOING TO UPDATE TAG: ' + action.payload.tag);
    // TODO
    // 1. Send the request to the sever to update the tag
    // 2. Get the response from the server (updated tag) and replace the current tag
    //    in the state with the updated tag from the server
}

export function* deleteTag(action) {
    console.log('GOING TO DELETE TAG: ' + action.payload.tagText);
    // TODO
    // 1. Send the request to the server to delete the tag
    // 2. Get the response from the server and remove the tag from the local state
}
