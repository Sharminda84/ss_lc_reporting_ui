import { LOAD_TAGS } from '../actions/cardTags';

const initialState = {
    cardTags: []
};

const cardTags = ( state = initialState, action ) => {
    switch ( action.type ) {
        case LOAD_TAGS:
            return { ...state, cardTags: action.payload.tags };

        default: return state;
    }
};

export default cardTags;
