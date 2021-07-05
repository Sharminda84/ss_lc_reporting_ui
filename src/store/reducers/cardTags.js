import {
    LOAD_TAGS, POST_CREATE_TAG, POST_UPDATE_TAG, POST_DELETE_TAG,
    SET_MESSAGE, CLEAR_MESSAGE, SET_CURRENT_TAG,
} from '../actions/cardTags';

const initialState = {
    cardTags: [],
    currentTag: null,
    message: '',
};

const cardTags = ( state = initialState, action ) => {
    switch ( action.type ) {
        case SET_CURRENT_TAG:
            return { ...state, currentTag: action.payload.tag };

        case LOAD_TAGS:
            return { ...state, cardTags: action.payload.tags };

        case POST_CREATE_TAG:
            const updatedTagsPostCreate = state.cardTags.slice(0);
            updatedTagsPostCreate.push(action.payload.newTag);
            return {...state, cardTags: updatedTagsPostCreate, currentTag: action.payload.newTag };

        case POST_UPDATE_TAG:
            const updatedTag = action.payload.tag;
            const updatedTagsPostUpdate = state.cardTags.filter(tag => tag.id !== updatedTag.id);
            updatedTagsPostUpdate.push(updatedTag);
            return {...state, cardTags: updatedTagsPostUpdate, currentTag: action.payload.newTag };

        case POST_DELETE_TAG:
            const cardTags = state.cardTags.filter(tag => tag.tag !== action.payload.tagText);
            return { ...state, cardTags: cardTags, currentTag: null }

        case SET_MESSAGE:
            return { ...state, message: action.payload.message };

        case CLEAR_MESSAGE:
            return { ...state, message: '' };

        default: return state;
    }
};

export default cardTags;
