export const FETCH_REVENUE_DATA = 'revenue/FETCH_REVENUE_DATA';
export const LOAD_REVENUE_DATA = 'revenue/LOAD_REVENUE_DATA';

export const fetchRevenueData = () => ({
    type: FETCH_REVENUE_DATA,
    payload: {}
});

export const loadRevenueData = (revenueData) => ({
    type: LOAD_REVENUE_DATA,
    payload: {
        revenueData
    }
});