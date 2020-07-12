export const FETCH_CARD_INFO = 'redData/FETCH_CARD_INFO';
export const LOAD_CARD_INFO = 'redData/LOAD_CARD_INFO';

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
