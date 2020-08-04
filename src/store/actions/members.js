export const FETCH_MEMBERS_DATA = 'members/FETCH_MEMBERS_DATA';
export const LOAD_MEMBERS_DATA = 'members/LOAD_MEMBERS_DATA';
export const FETCH_CARDS_FOR_MEMBERS = 'members/FETCH_CARDS_FOR_MEMBERS';
export const LAOD_CARDS_FOR_MEMBERS = 'members/LOAD_CARDS_FOR_MEMBERS';

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

export const fetchCardsForMembers = () => ({
    type: FETCH_CARDS_FOR_MEMBERS,
});

export const loadCardsForMembers = (cardsForMembers) => ({
    type: LAOD_CARDS_FOR_MEMBERS,
    payload: cardsForMembers,
});

