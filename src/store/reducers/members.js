import { LOAD_MEMBERS_DATA, LAOD_CARDS_FOR_MEMBERS } from '../actions/members';

const initialState = {
    memberSignUps: [],
    memberCards: [],
    membersTableConfig: [
        {
            Header: 'First Name',
            accessor: 'firstName',
            filter: 'fuzzyText',

        },
        {
            Header: 'Last Name',
            accessor: 'lastName',
            filter: 'fuzzyText',
        },
        {
            Header: 'Email Address',
            accessor: 'emailAddress',
            filter: 'fuzzyText',
        },
        {
            Header: 'Date Joined',
            accessor: 'joined',
            filter: 'fuzzyText',
        },
        {
            Header: 'Email Validated',
            accessor: 'emailValidated',
            filter: 'fuzzyText',
        },
    ],
};

const members = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_MEMBERS_DATA:
            return {...state, memberSignUps: action.payload};
        case LAOD_CARDS_FOR_MEMBERS:
            return {...state, memberCards: action.payload};
        default: return state;
    }
};

export default members;