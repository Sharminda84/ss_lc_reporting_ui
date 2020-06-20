import { FETCH_MEMBERS_DATA, LOAD_MEMBERS_DATA } from '../actions/members';
import SelectColumnFilter from '../../components/table/DataTable';

const initialState = {
    memberSignUps: [],
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
        case FETCH_MEMBERS_DATA:
            return state;
        case LOAD_MEMBERS_DATA:
            return {...state, memberSignUps: action.payload};
        default: return state;
    }
};

export default members;