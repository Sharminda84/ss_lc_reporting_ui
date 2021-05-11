import { LOAD_MEMBERS_DATA, LAOD_CARDS_FOR_MEMBERS } from '../actions/members';

import { getStartOfTodayInMillis } from '../../utils';

const initialState = {
    memberSignUps: [],
    memberCards:  new Map(),
    currentDate: getStartOfTodayInMillis(),
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
            accessor: 'memberCreateUpdateTime',
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
            const memberCardsToUpdate = state.memberCards;
            memberCardsToUpdate.set(action.payload.date, action.payload.cardsForMembers);
            return {...state, currentDate: action.payload.date, memberCards: memberCardsToUpdate};
        default: return state;
    }
};

export default members;