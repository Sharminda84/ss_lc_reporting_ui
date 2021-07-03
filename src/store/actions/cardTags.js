export const FETCH_TAGS = 'cardTags/FETCH_TAGS';
export const LOAD_TAGS = 'orders/LOAD_TAGS';
export const CREATE_TAG = 'cardTags/CREATE_TAG';
export const UPDATE_TAG = 'cardTags/UPDATE_TAG'
export const DELETE_TAG = 'cardTags/DELETE_TAG'

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

export const updateTag = (tag) => ({
    type: UPDATE_TAG,
    payload: {
        tag
    }
});

export const deleteTag = (tagText) => ({
    type: DELETE_TAG,
    payload: {
        tagText
    }
});
