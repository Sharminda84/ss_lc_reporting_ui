export const FETCH_ORDERS_DATA = 'orders/FETCH_ORDERS_DATA';
export const LOAD_ORDERS_DATA = 'orders/LOAD_ORDERS_DATA';

export const FETCH_DAILY_ORDERS_DATA = 'orders/FETCH_DAILY_ORDERS_DATA';
export const LOAD_DAILY_ORDERS_DATA = 'orders/LOAD_DAILY_ORDERS_DATA';

export const FETCH_WEEKLY_ORDERS_DATA = 'orders/FETCH_WEEKLY_ORDERS_DATA';
export const LOAD_WEEKLY_ORDERS_DATA = 'orders/LOAD_WEEKLY_ORDERS_DATA';

export const FETCH_MONTHLY_ORDERS_DATA = 'orders/FETCH_MONTHLY_ORDERS_DATA';
export const LOAD_MONTHLY_ORDERS_DATA = 'orders/LOAD_MONTHLY_ORDERS_DATA';

export const fetchOrdersData = (startDate, endDate) => ({
    type: FETCH_ORDERS_DATA,
    payload: {
        startDate,
        endDate,
    }
});

export const loadOrdersData = (ordersData) => ({
    type: LOAD_ORDERS_DATA,
    payload: ordersData,
});

export const fetchDailyOrdersData = () => ({
    type: FETCH_DAILY_ORDERS_DATA,
});

export const loadDailyOrdersData = (ordersData) => ({
    type: LOAD_DAILY_ORDERS_DATA,
    payload: ordersData,
});

export const fetchWeeklyOrdersData = () => ({
    type: FETCH_WEEKLY_ORDERS_DATA,
});

export const loadWeeklyOrdersData = (ordersData) => ({
    type: LOAD_WEEKLY_ORDERS_DATA,
    payload: ordersData,
});

export const fetchMonthlyOrdersData = () => ({
    type: FETCH_MONTHLY_ORDERS_DATA,
});

export const loadMonthlyOrdersData = (ordersData) => ({
    type: LOAD_MONTHLY_ORDERS_DATA,
    payload: ordersData,
});