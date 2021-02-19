import _ from 'lodash';
import {
    LOAD_ORDERS_DATA,
    LOAD_DAILY_ORDERS_DATA,
    LOAD_TODAYS_ORDERS_DATA,
    LOAD_WEEKLY_ORDERS_DATA,
    LOAD_MONTHLY_ORDERS_DATA,
    LOAD_TOP_CARDS,
} from '../actions/orders';

const initialState = {
    orders: [],
    dailyOrders: new Map(),
    todaysOrders: [],
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
    ordersSummaryTableConfig: [
        {
            Header: 'Card Type',
            accessor: 'cardType',
        },
        {
            Header: 'eCard Sales',
            accessor: 'eCardSales',
        },
        {
            Header: 'eCard Revenue',
            accessor: 'eCardRevenue',
        },
        {
            Header: 'Printed Sales',
            accessor: 'printedSales',
        },
        {
            Header: 'Printed Revenue',
            accessor: 'printedRevenue',
        },
        {
            Header: 'Total Sales',
            accessor: 'totalSales',
        },
        {
            Header: 'Total Revenue',
            accessor: 'totalRevenue',
        },
    ],
    topCards: [],
};

const orders = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ORDERS_DATA:
            return {...state, orders: action.payload};
        case LOAD_DAILY_ORDERS_DATA:
            const date = new Date(action.payload.date).toISOString().split('T')[0];
            const dailyOrdersClone = _.cloneDeep(state.dailyOrders);
            dailyOrdersClone.set(date, action.payload.ordersData);
            return {...state, dailyOrders: dailyOrdersClone};
        case LOAD_TODAYS_ORDERS_DATA:
            return {...state, todaysOrders: action.payload};
        case LOAD_WEEKLY_ORDERS_DATA:
            return {...state, weeklyOrders: action.payload};
        case LOAD_MONTHLY_ORDERS_DATA:
            return {...state, monthlyOrders: action.payload};
        case LOAD_TOP_CARDS:
            return {...state, topCards: action.payload};
        default: return state;
    }
};

export default orders;