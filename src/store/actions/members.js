export const FETCH_MEMBERS_DATA = 'revenue/FETCH_MEMBERS_DATA';
export const LOAD_MEMBERS_DATA = 'revenue/LOAD_MEMBERS_DATA';

export const fetchMembersData = (startDate, endDate) => ({
    type: FETCH_MEMBERS_DATA,
    payload: {
        startDate,
        endDate
    }
});

export const loadMembersData = (membersData) => ({
    type: LOAD_MEMBERS_DATA,
    payload: membersData,
});