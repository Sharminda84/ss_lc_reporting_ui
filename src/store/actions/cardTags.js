export const FETCH_TAGS = 'cardTags/FETCH_TAGS';
export const LOAD_TAGS = 'orders/LOAD_TAGS';
export const CREATE_TAG = 'cardTags/CREATE_TAG';
export const POST_CREATE_TAG = 'cardTags/POST_CREATE_TAG';
export const UPDATE_TAG = 'cardTags/UPDATE_TAG'
export const DELETE_TAG = 'cardTags/DELETE_TAG'
export const POST_DELETE_TAG = 'cardTags/POST_DELETE_TAG';
export const SET_ERROR = 'cardTags/SET_ERROR';
export const CLEAR_ERROR = 'cardTags/CLEAR_ERROR';

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

export const updateTag = (tagId, newTagText, newTagLinks) => ({
    type: UPDATE_TAG,
    payload: {
        tagId,
        newTagText,
        newTagLinks
    }
});

export const deleteTag = (tagText) => ({
    type: DELETE_TAG,
    payload: {
        tagText
    }
});

export const postDeleteTag = (tagText) => ({
    type: POST_DELETE_TAG,
    payload: {
        tagText
    }
});

export const setError = (error) => ({
    type: SET_ERROR,
    payload: {
        error
    }
});

export const clearError = () => ({
    type: CLEAR_ERROR,
});
