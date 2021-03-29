import {LOAD_CARD_DESIGN_COUNTS, LOAD_CARD_INFO} from '../actions/refData';

const initialState = {
    cardInfo: new Map(),
    cardDesignCounts: new Map(),
};

const refData = ( state = initialState, action ) => {
    switch ( action.type ) {
        case LOAD_CARD_INFO:
            return { ...state, cardInfo: action.payload.cardInfo };
        case LOAD_CARD_DESIGN_COUNTS:
            return { ...state, cardDesignCounts: action.payload.cardDesignCounts };
        default: return state;
    }
};

export default refData;