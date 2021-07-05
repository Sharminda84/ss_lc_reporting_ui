import { call, put } from 'redux-saga/effects';
import {loadTags, postCreateTag, postDeleteTag, postUpdateTag, setMessage} from '../actions/cardTags';
import {sendGetRequest, sendPostRequest} from '../networkUtils';
import * as ReportingServerURLs from './ReportingServerURLs';

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
        yield put(setMessage('Tag [' + action.payload.tagText + '] created.'));
    } catch (error) {
        console.log(`Error deleting card tag [${error}}]`);
        yield put(setMessage('Tag with name [' + action.payload.tagText + '] already exists.'));

    }
}

export function* updateTag(action) {
    let tagLinks = action.payload.tagLinks.split('\n')
        .map(tagLink => tagLink.trim())
        .filter(tagLink => tagLink !== '')
        .reduce((aggregate, current) => aggregate + current + ',', '');
    tagLinks = tagLinks.substring(0, tagLinks.length - 1);

    try {
        const updateRequest = {
            tagId: action.payload.id,
            tag: action.payload.tag,
            description: action.payload.description,
            tagLinks
        };
        const updatedTag = yield call(sendPostRequest, ReportingServerURLs.UPDATE_TAG, updateRequest);
        yield put(postUpdateTag(updatedTag));
        yield put(setMessage('Tag [' + action.payload.tag + '] updated.'));
    } catch (error) {
        console.log(`Error deleting card tag [${error}}]`);
        yield put(setMessage('Error updating tag.'));
    }
}

export function* deleteTag(action) {
    try {
        const deleteTagURL = encodeURI(`${ReportingServerURLs.DELETE_TAG}?tag=${action.payload.tagText}`);
        yield call(sendGetRequest, deleteTagURL);
        yield put(postDeleteTag(action.payload.tagText));
    } catch (error) {
        console.log(`Error deleting card tag [${error}}]`);
        yield put(setMessage('Error deleting tag.'));
    }
}
