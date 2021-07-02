export const FETCH_TAGS = 'cardTags/FETCH_TAGS';
export const LOAD_TAGS = 'orders/LOAD_TAGS';

export const fetchTags = () => ({
    type: FETCH_TAGS,
});

export const loadTags = (tags) => ({
    type: LOAD_TAGS,
    payload: {
        tags
    },
});
