import {
    LOAD_TAGS, POST_CREATE_TAG, POST_DELETE_TAG, SET_ERROR, CLEAR_ERROR
} from '../actions/cardTags';

const initialState = {
    cardTags: [],
    error: '',
};

const cardTags = ( state = initialState, action ) => {
    switch ( action.type ) {
        case LOAD_TAGS:
            return { ...state, cardTags: action.payload.tags };

        case POST_CREATE_TAG:
            const updatedTags = state.cardTags.slice(0);
            updatedTags.push(action.payload.newTag);
            return {...state, cardTags: updatedTags};

        case POST_DELETE_TAG:
            const cardTags = state.cardTags.filter(tag => tag.tag !== action.payload.tagText);
            return { ...state, cardTags: cardTags }

        case SET_ERROR:
            return { ...state, error: action.payload.error };

        case CLEAR_ERROR:
            return { ...state, error: '' };

        default: return state;
    }
};

export default cardTags;
