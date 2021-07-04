import { call, put } from 'redux-saga/effects';
import {loadTags, postCreateTag, postDeleteTag, setError} from '../actions/cardTags';
import { sendGetRequest } from '../networkUtils';
import * as ReportingServerURLs from './ReportingServerURLs';
import * as globalActions from "../actions/global";
import {NOTIFICATION_INFO} from "../../ReportingUIConstants";

export function* fetchTags() {
    try {
        const fetchTagsURL = ReportingServerURLs.FETCH_CARD_TAGS;
        const tags = yield call(sendGetRequest, fetchTagsURL);
        yield put(loadTags(tags));
    } catch (error) {
        console.log(`Error fetching card tags [${error}}]`);
    }
}

export function* createTag(action) {
    try {
        const createTagURL = encodeURI(`${ReportingServerURLs.CREATE_TAG}?tag=${action.payload.tagText}`);
        const newTag = yield call(sendGetRequest, createTagURL);
        yield put(postCreateTag(newTag));
    } catch (error) {
        console.log(`Error deleting card tag [${error}}]`);
        yield put(setError('Tag with name [' + action.payload.tagText + '] already exists.'));

    }
}

export function* updateTag(action) {
    console.log('GOING TO UPDATE TAG: ' + action.payload.tag);
    // TODO
    // 1. Send the request to the sever to update the tag
    // 2. Get the response from the server (updated tag) and replace the current tag
    //    in the state with the updated tag from the server
}

export function* deleteTag(action) {
    try {
        const deleteTagURL = encodeURI(`${ReportingServerURLs.DELETE_TAG}?tag=${action.payload.tagText}`);
        yield call(sendGetRequest, deleteTagURL);
        yield put(postDeleteTag(action.payload.tagText));
    } catch (error) {
        console.log(`Error deleting card tag [${error}}]`);
    }
}
