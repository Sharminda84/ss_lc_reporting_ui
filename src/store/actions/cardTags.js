import _get from 'lodash.get';
import { store } from '../../index';

export const FETCH_TAGS = 'cardTags/FETCH_TAGS';
export const LOAD_TAGS = 'orders/LOAD_TAGS';
export const CREATE_TAG = 'cardTags/CREATE_TAG';
export const POST_CREATE_TAG = 'cardTags/POST_CREATE_TAG';
export const UPDATE_TAG = 'cardTags/UPDATE_TAG'
export const POST_UPDATE_TAG = 'cardTags/POST_UPDATE_TAG'
export const DELETE_TAG = 'cardTags/DELETE_TAG'
export const POST_DELETE_TAG = 'cardTags/POST_DELETE_TAG';
export const SET_MESSAGE = 'cardTags/SET_ERROR';
export const CLEAR_MESSAGE = 'cardTags/CLEAR_ERROR';
export const SET_CURRENT_TAG = 'cardTags/SET_CURRENT_TAG';

export const fetchTags = () => ({
    type: FETCH_TAGS,
});

export const loadTags = (tags) => ({
    type: LOAD_TAGS,
    payload: {
        tags
    },
});

export const createTag = (tagText) => ({
    type: CREATE_TAG,
    payload: {
        tagText
    }
});

export const postCreateTag = (newTag) => ({
    type: POST_CREATE_TAG,
    payload: {
        newTag
    }
});

export const updateTag = (tagId, newTagText, newTagDescription, newTagLinks) => ({
    type: UPDATE_TAG,
    payload: {
        id: tagId,
        tag: newTagText,
        description: newTagDescription,
        tagLinks: newTagLinks
    }
});

export const postUpdateTag = (tag) => ({
    type: POST_UPDATE_TAG,
    payload: {
        tag
    }
});

export const deleteTag = () => ({
    type: DELETE_TAG,
    payload: {
        tagText: _get(store.getState(), 'cardTags.currentTag.tag')
    }
});

export const postDeleteTag = (tagText) => ({
    type: POST_DELETE_TAG,
    payload: {
        tagText
    }
});

export const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: {
        message
    }
});

export const clearMessage = () => ({
    type: CLEAR_MESSAGE,
});

export const setCurrentTag = (tag) => ({
    type: SET_CURRENT_TAG,
    payload: {
        tag
    }
});
