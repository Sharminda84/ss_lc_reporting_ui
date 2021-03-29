export const FETCH_CARD_INFO = 'refData/FETCH_CARD_INFO';
export const LOAD_CARD_INFO = 'refData/LOAD_CARD_INFO';
export const FETCH_CARD_DESIGN_COUNTS = 'refData/FETCH_CARD_DESIGN_COUNTS';
export const LOAD_CARD_DESIGN_COUNTS = 'refData/LOAD_CARD_DESIGN_COUNTS';

export const fetchCardInfo = () => ({
    type: FETCH_CARD_INFO,
    payload: {}
});

export const loadCardInfo = (cardInfo) => ({
    type: LOAD_CARD_INFO,
    payload: {
        cardInfo
    }
});

export const fetchCardDesignCounts = () => ({
    type: FETCH_CARD_DESIGN_COUNTS,
    payload: {}
});


export const laodCardDesignCounts = (cardDesignCounts) => ({
    type: LOAD_CARD_DESIGN_COUNTS,
    payload: {
        cardDesignCounts
    }
});
