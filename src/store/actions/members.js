export const FETCH_MEMBERS_DATA = 'members/FETCH_MEMBERS_DATA';
export const LOAD_MEMBERS_DATA = 'members/LOAD_MEMBERS_DATA';

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