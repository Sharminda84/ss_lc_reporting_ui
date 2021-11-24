import { LOAD_AD_METRICS } from "../actions/adAnalytics";

export const initialState = {
    adMetrics: [],
};

const adAnalytics = ( state = initialState, action ) => {
    switch ( action.type ) {
        case LOAD_AD_METRICS:
            return { ...state, adMetrics: action.payload.adMetrics };

        default: return state;
    }
};

export default adAnalytics;
