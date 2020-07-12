import { LOAD_CARD_INFO } from '../actions/refData';

const initialState = {
    cardInfo: new Map(),
};

const refData = ( state = initialState, action ) => {
    switch ( action.type ) {
        case LOAD_CARD_INFO:
            return { ...state, cardInfo: action.payload.cardInfo };
        default: return state;
    }
};

export default refData;