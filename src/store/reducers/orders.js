import _ from 'lodash';
import {
    LOAD_ORDERS_DATA,
    LOAD_DAILY_ORDERS_DATA,
    LOAD_TODAYS_ORDERS_DATA,
    LOAD_WEEKLY_ORDERS_DATA,
    LOAD_MONTHLY_ORDERS_DATA,
    LOAD_TOP_CARDS,
    LOAD_CARD_DESIGNS_SALES_IN_DATE_RANGE,
    LAOD_SALES_REPORT,
    LAOD_SALES_FUNNELS,
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

    salesReport: null,

    salesFunnels: new Map(),

    ordersTableConfig: [
        {
            Header: 'Customer\'s Email',
            accessor: 'customerEmail',
            filter: 'fuzzyText',
        },
        {
            Header: 'Order Amount',
            accessor: 'tranAmount',
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
    statsTableConfig: [
        {
            Header: 'Card Type',
            accessor: 'cardType',
        },
        {
            Header: 'Total Revenue',
            accessor: 'totalRevenue',
        },
        {
            Header: 'Revenue/Ad Spend',
            accessor: 'revenueAdSpendRatio',
        },
        {
            Header: 'E-cards Share',
            accessor: 'eCardShare',
        },
        {
            Header: 'A4-cards Share',
            accessor: 'a4SalesShare',
        },
        {
            Header: 'A5-cards Share',
            accessor: 'a5SalesShare',
        },
        {
            Header: 'P&L',
            accessor: 'percentageProfit',
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
            Header: 'VAT',
            accessor: 'vat',
        },
        {
            Header: 'P&L',
            accessor: 'profit',
        },
    ],
    dailyOrdersSummaryTableConfig: [
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
    ],

    topCards: [],

    cardDesignSalesInDateRange: [],
    cardDesignViewCounts: [],
    cardDesignSalesInDateRangeTableConfig: [
        {
            Header: 'Card',
            accessor: 'cardImage',
        },
        {
            Header: 'Card Sales',
            accessor: 'cardSales',
        },
        {
            Header: 'Card Sequence',
            accessor: 'cardSequence',
        },
        {
            Header: 'Card Views',
            accessor: 'cardViews',
        },
    ],

    // Ad campaigns and card type aggregation mappings
    campaignToCardTypeMappings: {

        // Leaving Cards
        'FT Search - Leaving Card - BMM': 'Leaving Cards',
        'FT Search - Leaving Card - Exact' : 'Leaving Cards',
        'FT US Search - Leaving Card - BMM' : 'Leaving Cards',
        'FT IND Search - Leaving Card - BMM' : 'Leaving Cards',
        'FT US Search - Farewell Card - Exact' : 'Leaving Cards',
        'FT IND Search - Leaving Card - Exact' : 'Leaving Cards',
        'FT US Search - Farewell Card - BMM' : 'Leaving Cards',
        'FT IND Search - Farewell Card - BMM' : 'Leaving Cards',
        'FT US Search - Leaving Card - Exact' : 'Leaving Cards',
        'FT IND Search - Farewell Card - Exact' : 'Leaving Cards',
        'Leaving cards - United States Campaign' : 'Leaving Cards',
        'Leaving cards - UK Campaign' : 'Leaving Cards',

        // Birthday
        'FT Search - Birthday Card - Exact': 'Birthday Cards',
        'FT Search - Birthday Card - BMM': 'Birthday Cards',
        'FT US Search - Birthday Card - BMM': 'Birthday Cards',
        'FT US Search - Birthday Card - Exact': 'Birthday Cards',
        'FT IND Search - Birthday Card - BMM': 'Birthday Cards',
        'FT Search - Birthday Card Generic - Exact': 'Birthday Cards',
        'FT IND Search - Birthday Card - Exact': 'Birthday Cards',

        // Maternity cards
        'FT Search - Maternity Cards - Exact': 'Maternity Leave Cards',
        'FT Search - Maternity Cards - BMM': 'Maternity Leave Cards',

        // New baby
        'FT Search - New Baby Cards - BMM': 'New Baby Cards',
        'FT Search - New Baby Cards - Exact': 'New Baby Cards',
        'FT US Search - New Born Card - Exact': 'New Baby Cards',
        'FT IND Search - New Born Card - BMM': 'New Baby Cards',
        'FT US Search - New Born Card - BMM': 'New Baby Cards',
        'FT IND Search - New Born Card - Exact': 'New Baby Cards',

        // New daddy
        'FT Search - New Daddy Cards - BMM': 'New Daddy Cards',
        'FT Search - New Daddy Cards - Exact': 'New Daddy Cards',

        // Retirement
        'FT Search - Retirement Card - Exact': 'Retirement Cards',
        'FT Search - Retirement Card - BMM': 'Retirement Cards',
        'FT US Search - Retirement Card - Exact': 'Retirement Cards',
        'FT IND Search - Retirement Card - BMM': 'Retirement Cards',
        'FT IND Search - Retirement Card - Exact': 'Retirement Cards',
        'FT US Search - Retirement Card - BMM': 'Retirement Cards',
        'Retirement Cards - UK Campaign': 'Retirement Cards',

        // Get well
        'FT IND Search - Get Well Soon Card - BMM': 'Get Well Soon Cards',
        'FT Search - Get Well Soon Card - BMM': 'Get Well Soon Cards',
        'FT Search - Get Well Soon Card Generic - Exact': 'Get Well Soon Cards',
        'FT US Search - Get Well Soon Card - BMM': 'Get Well Soon Cards',
        'FT IND Search - Get Well Soon Card - Exact': 'Get Well Soon Cards',
        'FT US Search - Get Well Soon Card - Exact': 'Get Well Soon Cards',
        'FT Search - Get Well Soon Card - Exact': 'Get Well Soon Cards',

        // Congratulations
        'FT Search - Congratulations Card - BMM': 'Congratulations Cards',
        'FT Search - Congratulations Card - Exact': 'Congratulations Cards',
        'FT Search - Congratulations Card Generic - Exact': 'Congratulations Cards',
        'FT US Search - Congratulations Card - Exact': 'Congratulations Cards',
        'FT IND Search - Congratulations Card - Exact': 'Congratulations Cards',
        'FT IND Search - Congratulations Card - BMM': 'Congratulations Cards',
        'FT US Search - Congratulations Card - BMM': 'Congratulations Cards',

        // Good luck
        'FT Search - Good Luck Card - BMM': 'Good Luck Cards',
        'FT Search - Good Luck Card - Exact': 'Good Luck Cards',
        'FT IND Search - Good Luck Card - BMM': 'Good Luck Cards',
        'FT US Search - Good Luck Card - BMM': 'Good Luck Cards',
        'FT US Search - Good Luck Card - Exact': 'Good Luck Cards',
        'FT IND Search - Good Luck Card - Exact': 'Good Luck Cards',

        // Thank you
        'FT Search - Thank You Card - BMM': 'Thank You Cards',
        'FT Search - Thank You Card - Exact': 'Thank You Cards',
        'FT IND Search - Thank You Card - BMM': 'Thank You Cards',
        'FT IND Search - Thank You Card - Exact': 'Thank You Cards',
        'FT US Search - Thank You Card - BMM': 'Thank You Cards',
        'FT US Search - Thank You Card - Exact': 'Thank You Cards',
        'FT Search - Thank You Card Generic - Exact': 'Thank You Cards',

        // Random
        'FT Search - Cards Types - DSA': 'Misc',
        'Together Cards - UK - New': 'Misc',
        'Together Cards - UK': 'Misc',
        'FT US Search - Competitors - Exact': 'Misc',

        // Thank you teacher
        'FT Search - Thank You Teacher Card - Exact': 'Thank You Teacher Cards',
        'FT Search - Thank You Teacher Card - BMM': 'Thank You Teacher Cards',
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

        case LOAD_CARD_DESIGNS_SALES_IN_DATE_RANGE:
            return {
                ...state,
                cardDesignSalesInDateRange: action.payload.cardSales,
                cardDesignViewCounts: action.payload.cardViews
            };

        case LAOD_SALES_REPORT:
            return {
                ...state,
                salesReport: action.payload.salesReport,
            };

        case LAOD_SALES_FUNNELS:
            const salesFunnelDataMap = new Map();
            for (const [cardType, salesFunnels] of Object.entries(action.payload.salesFunnels)) {
                salesFunnelDataMap.set(cardType, salesFunnels);
            }
            return {...state, salesFunnels: salesFunnelDataMap};

        default: return state;
    }
};

export default orders;