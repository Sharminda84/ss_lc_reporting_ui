import {
    FETCH_ORDERS_DATA, LOAD_ORDERS_DATA,
    FETCH_DAILY_ORDERS_DATA, LOAD_DAILY_ORDERS_DATA,
    FETCH_WEEKLY_ORDERS_DATA, LOAD_WEEKLY_ORDERS_DATA,
    FETCH_MONTHLY_ORDERS_DATA, LOAD_MONTHLY_ORDERS_DATA
} from '../actions/orders';
import SelectColumnFilter from '../../components/table/DataTable';

const initialState = {
    orders: [],
    dailyOrders: [],
    weeklyOrders: [],
    monthlyOrders: [],
    ordersTableConfig: [
        {
            Header: 'Order Date',
            accessor: 'transactionTime',
            filter: 'fuzzyText',
        },
        {
            Header: 'Customer',
            accessor: 'customerName',
            filter: 'fuzzyText',
        },
        {
            Header: 'Customer\'s Email',
            accessor: 'customerEmail',
            filter: 'fuzzyText',
        },
        {
            Header: 'Order Amount',
            accessor: 'transactionAmount',
            filter: 'fuzzyText',
        },
        {
            Header: 'Order Status',
            accessor: 'orderStatus',
            filter: 'fuzzyText',
        },
        {
            Header: 'Order Type',
            accessor: 'orderType',
            filter: 'fuzzyText',
        },
    ],
};

const orders = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDERS_DATA:
            return state;
        case FETCH_DAILY_ORDERS_DATA:
            return state;
        case FETCH_WEEKLY_ORDERS_DATA:
            return state;
        case FETCH_MONTHLY_ORDERS_DATA:
            return state;
        case LOAD_ORDERS_DATA:
            return {...state, orders: action.payload};
        case LOAD_DAILY_ORDERS_DATA:
            return {...state, dailyOrders: action.payload};
        case LOAD_WEEKLY_ORDERS_DATA:
            return {...state, weeklyOrders: action.payload};
        case LOAD_MONTHLY_ORDERS_DATA:
            return {...state, monthlyOrders: action.payload};

        default: return state;
    }
};

export default orders;