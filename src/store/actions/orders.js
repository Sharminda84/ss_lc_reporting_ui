export const FETCH_ORDERS_DATA = 'orders/FETCH_ORDERS_DATA';
export const LOAD_ORDERS_DATA = 'orders/LOAD_ORDERS_DATA';

export const FETCH_DAILY_ORDERS_DATA = 'orders/FETCH_DAILY_ORDERS_DATA';
export const LOAD_DAILY_ORDERS_DATA = 'orders/LOAD_DAILY_ORDERS_DATA';

export const FETCH_TODAYS_ORDERS_DATA = 'orders/FETCH_TODAYS_ORDERS_DATA';
export const LOAD_TODAYS_ORDERS_DATA = 'orders/LOAD_TODAYS_ORDERS_DATA';

export const FETCH_WEEKLY_ORDERS_DATA = 'orders/FETCH_WEEKLY_ORDERS_DATA';
export const LOAD_WEEKLY_ORDERS_DATA = 'orders/LOAD_WEEKLY_ORDERS_DATA';

export const FETCH_MONTHLY_ORDERS_DATA = 'orders/FETCH_MONTHLY_ORDERS_DATA';
export const LOAD_MONTHLY_ORDERS_DATA = 'orders/LOAD_MONTHLY_ORDERS_DATA';

export const FETCH_TOP_CARDS = 'orders/FETCH_TOP_CARDS';
export const LOAD_TOP_CARDS = 'orders/LOAD_TOP_CARDS';

export const fetchOrdersData = (startDate, endDate) => ({
    type: FETCH_ORDERS_DATA,
    payload: {
        startDate,
        endDate,
    }
});

export const loadOrdersData = (ordersData, adCampaignsData) => ({
    type: LOAD_ORDERS_DATA,
    payload: {
        ordersData,
        adCampaignsData
    },
});

export const fetchDailyOrdersData = (date) => ({
    type: FETCH_DAILY_ORDERS_DATA,
    payload: date,
});

export const loadDailyOrdersData = (date, ordersData, adCampaignsData) => ({
    type: LOAD_DAILY_ORDERS_DATA,
    payload: {
        date,
        ordersData,
        adCampaignsData,
    },
});

export const fetchTodaysOrdersData = () => ({
    type: FETCH_TODAYS_ORDERS_DATA,
});

export const loadTodaysOrdersData = (ordersData, adCampaignsData) => ({
    type: LOAD_TODAYS_ORDERS_DATA,
    payload: {
        ordersData,
        adCampaignsData
    },
});

export const fetchWeeklyOrdersData = (fromDate) => ({
    type: FETCH_WEEKLY_ORDERS_DATA,
    payload: {
        fromDate
    }
});

export const loadWeeklyOrdersData = (ordersData, adCampaignsData) => ({
    type: LOAD_WEEKLY_ORDERS_DATA,
    payload: {
        ordersData,
        adCampaignsData
    },
});

export const fetchMonthlyOrdersData = (fromDate) => ({
    type: FETCH_MONTHLY_ORDERS_DATA,
    payload: {
        fromDate
    }
});

export const loadMonthlyOrdersData = (ordersData, adCampaignsData) => ({
    type: LOAD_MONTHLY_ORDERS_DATA,
    payload: {
        ordersData,
        adCampaignsData
    },
});

export const fetchTopCards = () => ({
    type: FETCH_TOP_CARDS,
});

export const loadTopCards = (topCards) => ({
    type: LOAD_TOP_CARDS,
    payload: topCards,
});
