import { FETCH_MEMBERS_DATA, LOAD_MEMBERS_DATA } from '../actions/members';
import _ from 'lodash';

const initialState = {
    memberSignUps: {},
};

const memebrs = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MEMBERS_DATA:
            return state;
        case LOAD_MEMBERS_DATA:
            return {...state, memberSignUps: _.merge(state.memberSignUps, action.payload)};
        default: return state;
    }
};

export default memebrs;