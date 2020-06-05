import { FETCH_REVENUE_DATA, LOAD_REVENUE_DATA } from '../actions/revenue';

const initialState = {
  revenueData: [],
};

const revenue = ( state = initialState, action ) => {
    switch ( action.type ) {
        case FETCH_REVENUE_DATA:
            return state;
        case LOAD_REVENUE_DATA:
            return {...state, revenueData: action.payload.revenueData };
        default: return state;
    }
};

export default revenue;