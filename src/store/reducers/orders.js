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
    adCampaignsData: [],

    dailyOrders: new Map(),
    dailyAdCampaignsData: new Map(),

    todaysOrders: [],
    todaysAdCampaignsData: [],

    weeklyOrders: [],
    weeklyAdCampaignsData: [],

    monthlyOrders: [],
    monthlyAdCampaignsData: [],

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
            Header: 'Cards Count ',
            accessor: 'cardCount',
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
            Header: 'A4 Sales',
            accessor: 'a4Sales',
        },
        {
            Header: 'A4 Revenue',
            accessor: 'a4Revenue',
        },
        {
            Header: 'A5 Sales',
            accessor: 'a5Sales',
        },
        {
            Header: 'A5 Revenue',
            accessor: 'a5Revenue',
        },
        {
            Header: 'Total Sales',
            accessor: 'totalSales',
        },
        {
            Header: 'Total Revenue',
            accessor: 'totalRevenue',
        },
        {
            Header: 'Prime Group Costs',
            accessor: 'primeGroupCosts',
        },
        {
            Header: 'Ad Spend',
            accessor: 'adSpend',
        },
        {
            Header: 'Commission',
            accessor: 'designerCommission',
        },
        {
            Header: 'Stripe Fee',
            accessor: 'stripeFee',
        },
        {
            Header: 'P&L',
            accessor: 'profit',
        },
    ],
    topCards: [],

    // Ad campaigns and card type aggregation mappings
    campaignToCardTypeMappings: {
        'FT Search - Thank You Card - BMM': 'Thank You Cards',
        'FT Search - Thank You Card - Exact': 'Thank You Cards',

        'FT Search - Maternity Cards - BMM': 'Maternity Leave Cards',
        'FT Search - Maternity Cards - Exact': 'Maternity Leave Cards',

        'FT Search - Retirement Card - Exact': 'Retirement Cards',

        'FT Search - Birthday Card - Exact': 'Birthday Cards',

        'FT Search - Cards Types - DSA': '',

        'FT Search - Leaving Card - Exact': 'Leaving Cards',
        'FT Search - Leaving Card - BMM': 'Leaving Cards',

        'FT Search - Good Luck Card - BMM': 'Good Luck Cards',
        'FT Search - Good Luck Card - Exact': 'Good Luck Cards',

        'FT Search - Get Well Soon Card - Exact': 'Get Well Soon Cards',
        'FT Search - Get Well Soon Card - BMM': 'Get Well Soon Cards',

        'FT Search - Congratulations Card - BMM': 'Congratulations Cards',
        'FT Search - Congratulations Card - Exact': 'Congratulations Cards',

        'FT Search - New Baby Cards - BMM': 'New Baby Cards',
        'FT Search - New Baby Cards - Exact': 'New Baby Cards',

        'FT Search - New Daddy Cards - BMM': 'New Daddy Cards',
        'FT Search - New Daddy Cards - Exact': 'New Daddy Cards',
    },
};

const orders = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ORDERS_DATA:
            return {...state, orders: action.payload.ordersData, adCampaignsData: action.payload.adCampaignsData};

        case LOAD_DAILY_ORDERS_DATA:
            const date = new Date(action.payload.date).toISOString().split('T')[0];

            const dailyOrdersClone = _.cloneDeep(state.dailyOrders);
            dailyOrdersClone.set(date, action.payload.ordersData);

            const dailyAdCampaignsDataClone = _.cloneDeep(state.dailyAdCampaignsData);
            dailyAdCampaignsDataClone.set(date, action.payload.dailyAdCampaignsData);

            return {...state, dailyOrders: dailyOrdersClone, dailyAdCampaignsData: dailyAdCampaignsDataClone};

        case LOAD_TODAYS_ORDERS_DATA:
            return {...state, todaysOrders: action.payload.ordersData, todaysAdCampaignsData: action.payload.adCampaignsData};

        case LOAD_WEEKLY_ORDERS_DATA:
            return {...state, weeklyOrders: action.payload.ordersData, weeklyAdCampaignsData: action.payload.adCampaignsData};

        case LOAD_MONTHLY_ORDERS_DATA:
            return {...state, monthlyOrders: action.payload.ordersData, monthlyAdCampaignsData: action.payload.adCampaignsData};

        case LOAD_TOP_CARDS:
            return {...state, topCards: action.payload};

        default: return state;
    }
};

export default orders;